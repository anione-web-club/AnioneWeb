"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/games.module.css";
import { useInput } from "@/util/hooks";

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  const [input, setInput] = useInput("");
  const [wordCnt, setWordCnt] = useState(30);
  const [start, setStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; //배경
    const ctx = canvas.getContext("2d");

    canvas.width = 420;
    canvas.height = 690;

    let randomWord;
    let sec = 0;
    let gametimeout;

    function EnterKey(e) {
      if (e.key === "Enter") {
        scanWord();
      }
    }

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FFC0CB";
      ctx.fillRect(700, 0, 1200, 690);
    }

    function RandomWord() {
      if (start && wordCnt >= 0) {
        //랜덤 단어
        fetch("https://random-word-api.herokuapp.com/word")
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            randomWord = data[0];
            printWord();
            console.log("change");
          }, 1000);
      }
    }

    function printWord() {
      if (start) {
        //단어 표시
        clearCanvas();
        ctx.textAlign = "center";
        ctx.font = "64px Arial";
        ctx.fillStyle = "#FCFAAC";
        ctx.fillText(randomWord, canvas.width / 2, canvas.height / 2);
      }
    }

    function scanWord() {
      if (input === randomWord) {
        setWordCnt(wordCnt - 1);
        setInput({ target: { value: "" } });
        printWord();
      }
    }

    function GameTime() {
      //타이머
      if (start) {
        if (sec < 60) {
          sec += 1;
          console.log("timer");
          printWord();
          gametimeout = setTimeout(GameTime, 1000);
        } else if (sec == 60) {
          console.log("end");
          clearTimeout(gametimeout);
          setGameOver(true);
          setStart(false);
        }
      }

      if (!gameOver) {
        //시간 표시
        ctx.textAlign = "center";
        ctx.font = "70px Arial";
        ctx.fillStyle = "#FDDAFC";
        ctx.fillText(sec, canvas.width / 2, canvas.height / 3);
      } else if (gameOver) {
        ctx.textAlign = "center";
        ctx.font = "70px Arial";
        ctx.fillStyle = "#FDDAFC";
        ctx.fillText(60, canvas.width / 2, canvas.height / 3);
        GameOver();
      }
    }

    function GameOver() {
      //게임 오버
      if (gameOver) {
        ctx.textAlign = "center";
        ctx.font = "70px Arial";
        ctx.fillStyle = "#FCFAAC";
        ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      }
    }

    function Draw() {
      clearCanvas();
      RandomWord();
      GameTime();
    }

    Draw();
  }, [start, gameOver]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  function StartButton() {
    //게임 시작
    setInput({ target: { value: "" } });
    setStart(true);
  }

  return (
    <>
      <div>
        <canvas ref={canvasRef} className={styles.alignCenter} />
      </div>

      <div>
        <input
          type="text"
          value={input}
          onChange={setInput}
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
