"use client";
import { useEffect, useRef } from "react";

export default function BreakTile() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 420;
    canvas.height = 420;

    const playerSize = 10;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    const moveSpeed = 2.5;

    let upPressed = false;
    let downPressed = false;
    let leftPressed = false;
    let rightPressed = false;

    const brickLineCount = 12;
    const brickSize = 30;
    const brickOffset = 30;
    const bricks = [];

    for (let c = 0; c < brickLineCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickLineCount; r++) {
        bricks[c][r] = { x: 0, y: 0 };
      }
    }

    function movePlayer() {
      if (upPressed && y > playerSize) {
        y -= moveSpeed;
      } else if (downPressed && y < canvas.height - playerSize) {
        y += moveSpeed;
      } else if (rightPressed && x < canvas.width - playerSize) {
        x += moveSpeed;
      } else if (leftPressed && x > playerSize) {
        x -= moveSpeed;
      }
    }

    function drawPlayer() {
      ctx.beginPath();
      ctx.arc(x, y, playerSize, 0, Math.PI * 2);
      ctx.fillStyle = "green";
      ctx.fill();
      ctx.closePath();
    }

    function drawBricks() {
      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          const brickX = c * brickSize + brickOffset;
          const brickY = r * brickSize + brickOffset;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;
          ctx.beginPath();
          ctx.strokeRect(brickX, brickY, brickSize, brickSize);
          ctx.fillStyle = "#eee";
          ctx.fill();
          ctx.closePath();
        }
      }
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      movePlayer();

      drawBricks();
      drawPlayer();

      requestAnimationFrame(draw);
    }

    function keyDownHandler(e) {
      if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
      } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
      } else if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
      }
    }

    function keyUpHandler(e) {
      if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = false;
      } else if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = false;
      } else if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = false;
      } else if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = false;
      }
    }

    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("keydown", keyDownHandler, false);

    draw();
  }, []);

  return <canvas ref={canvasRef} />;
}
