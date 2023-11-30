"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/games.module.css";
//import { useInput } from "@/util/hooks";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [input, setInput] = useState("");
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; //배경
    const ctx = canvas.getContext("2d");

    if (window.innerWidth <= 768) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth;
    } else {
      canvas.width = 420;
      canvas.height = 420;
    }

    let sec = 0;
    let wordCnt = 7;
    let gametimeout;
    let randomWord;

    async function RandomWord() {
      if (wordCnt > 0) {
        if (start) {
          const res = await fetch("https://random-word-api.herokuapp.com/word");
          const data = await res.json();
          randomWord = data[0];
          console.log(randomWord);
        }
      }
    }

    function GameTime() {
      if (start) {
        if (wordCnt === 0) {
          console.log("win");
          setGameWin(true);
          setStart(false);
          GameEnd();
        } else if (sec < 300) {
          sec += 1;
          console.log(sec);
          gametimeout = setTimeout(GameTime, 1000);
        } else if (sec === 300) {
          console.log("end");
          setGameOver(true);
          setStart(false);
          clearTimeout(gametimeout);
        }
      }

      if (!gameOver) {
        ClearCanvas();
        ctx.textAlign = "center";
        ctx.font = "70px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(sec, canvas.width / 2, 100);
      } else if (gameOver) {
        ClearCanvas();
        ctx.textAlign = "center";
        ctx.font = "70px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(300, canvas.width / 2, 100);
        GameEnd();
      } else if (gameWin) {
        ClearCanvas();
        GameEnd();
      }
    }

    function CheckWord() {
      if (input != randomWord) {
        wordCnt -= 1;
        RandomWord();
      }
    }

    function EnterKey(e) {
      if (e.key === "Enter") {
        console.log({ input });
        CheckWord();
        setInput("");
        console.log("enter");
      }
    }

    function GameEnd() {
      if (gameOver) {
        ctx.textAlign = "center";
        ctx.font = "67px Arial";
        ctx.fillStyle = "#D1180B";
        ctx.fillText("GAME OVER", canvas.width / 2, 200);
      }

      if (gameWin) {
        ctx.textAlign = "center";
        ctx.font = "42px Arial";
        ctx.fillStyle = "#FCFAAC";
        ctx.fillText("Clear Time : ", canvas.width / 2.7, 200);
        ctx.fillText(sec, canvas.width / 1.3, 200);
      }
    }

    function ClearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FFC0CB";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (start) {
        ctx.textAlign = "center";
        ctx.font = "50px Arial";
        ctx.fillStyle = "#000000";
        ctx.fillText(randomWord, canvas.width / 2, 200);
      }
    }

    function Draw() {
      ClearCanvas();
      GameTime();
      RandomWord();
      GameEnd();
    }

    Draw();

    window.addEventListener("keydown", EnterKey);

    return () => {
      window.removeEventListener("keydown", EnterKey);
    };
  }, [start, gameOver, gameWin]);

  function StartButton() {
    setInput("");
    setStart(true);
  }

  useEffect(() => {
    console.log(input);
  }, [input]);

  return (
    <>
      <div>
        <canvas ref={canvasRef} className={styles.alignCenter} />
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className={styles.alignCenter}
        />
      </div>

      <button className={styles.alignCenter} onClick={StartButton}>
        시작
      </button>
    </>
  );
};

export default CanvasComponent;
