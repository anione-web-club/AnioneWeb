"use client";
import { useEffect, useRef, useState } from "react";
import { useInput } from "@/util/hooks";

const CanvasComponent = () => {
  const canvasRef = useRef(null);

  const [input, setInput] = useInput("");
  const [wordCnt, setWordCnt] = useState(30);
  const [enterEvent, setEnterEvent] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current; //배경
    const ctx = canvas.getContext("2d");

    canvas.width = 420;
    canvas.height = 690;

    let randomWord;

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#FFC0CB";
      ctx.fillRect(700, 0, 1200, 690);
    }

    function RandomWord() {
      fetch("https://random-word-api.herokuapp.com/word?number=10").then(
        (res) => {
          const data = res.json();
          randomWord = data[0];
        }
      );
    }

    function printWord() {
      ctx.textAlign = "center";
      ctx.font = "67px Arial";
      ctx.fillStyle = "#FFFFFF";
      ctx.fillText(randomWord, canvas.width / 2, canvas.height / 2);
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
    }

    function GameOver() {
      //게임 오버
    }

    function Draw() {
      clearCanvas();
      RandomWord();
      printWord();
    }

    Draw();
  }, [enterEvent]);

  useEffect(() => {
    console.log(input);
  }, [input]);

  function Submit(event) {
    event.preventDefault();

    setEnterEvent(!enterEvent);
  }

  return (
    <>
      <div>
        <canvas ref={canvasRef}></canvas>
      </div>

      <form onSubmit={Submit}>
        <input type="text" value={input} />

        <button type="submit">시작</button>
      </form>
    </>
  );
};

export default CanvasComponent;
/*
    제한시간 1분, 1분안에 랜덤 단어 30개치기, 1분안에 단어 30개 못치면 기록은 무조건 1분 + 게임 끝
    단어 위에 시간 표시, 0 : 00 부터
    글자 한개 나오고 더 안나옴 => 엔터키 누르면 확인하고 맞으면 다음 글자 틀리면 그대로 => 반복
    */
