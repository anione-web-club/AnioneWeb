"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/games.module.css";

export default function BreakTile() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (window.innerWidth <= 768) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth;
    } else {
      canvas.width = 420;
      canvas.height = 420;
    }

    const playerSize = canvas.width / 50;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    const moveSpeed = playerSize / 2.5;

    let upPressed = false;
    let downPressed = false;
    let leftPressed = false;
    let rightPressed = false;

    const background = new Image();
    background.src = "/images/games/breaktile/background.png";

    const brickLineCount = 15;
    const brickSize = canvas.width / brickLineCount;
    const bricks = [];

    let warningTime = 3000;
    let meteorTime = 1500;

    let fixWarngingCount = 1;

    let warningTimeout;
    let meteorTimeout;
    let removeTimeout;

    for (let c = 0; c < brickLineCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickLineCount; r++) {
        bricks[c][r] = { x: 0, y: 0, warning: false, die: false };
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

    function drawBackground() {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    }

    function drawBrickOutline() {
      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          const brickX = c * brickSize;
          const brickY = r * brickSize;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          ctx.beginPath();
          ctx.strokeStyle = "#aaa";
          ctx.strokeRect(brickX, brickY, brickSize, brickSize);
          ctx.closePath();
        }
      }
    }

    function drawTiles() {
      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          const brickX = c * brickSize;
          const brickY = r * brickSize;
          bricks[c][r].x = brickX;
          bricks[c][r].y = brickY;

          if (bricks[c][r].warning) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
            ctx.fillRect(brickX, brickY, brickSize, brickSize);
            ctx.closePath();
          }

          if (bricks[c][r].die) {
            ctx.beginPath();
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
            ctx.fillRect(brickX, brickY, brickSize, brickSize);
            ctx.closePath();
          }
        }
      }
    }

    function drawPlayer() {
      ctx.beginPath();
      ctx.arc(x, y, playerSize, 0, Math.PI * 2);
      ctx.fillStyle = "yellow";
      ctx.fill();
      ctx.closePath();
    }

    function createWarning() {
      console.log("createWarning");
      console.log(warningTime);

      const warningCount = Math.floor(Math.random() * 10) + fixWarngingCount; // 1 ~ 10

      for (let i = 0; i < warningCount; i++) {
        const c = Math.floor(Math.random() * brickLineCount);
        const v = Math.floor(Math.random() * brickLineCount);

        bricks[c][v].warning = true;
      }

      if (warningTime > meteorTime + 300) warningTime -= 100;
      if (warningTime <= meteorTime + 300 && meteorTime > 500) meteorTime -= 100;

      fixWarngingCount += 1;

      warningTimeout = setTimeout(createWarning, warningTime);
      meteorTimeout = setTimeout(createMeteor, meteorTime);
    }

    function createMeteor() {
      console.log("createMeteor");

      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          if (bricks[c][r].warning) {
            bricks[c][r].warning = false;
            bricks[c][r].die = true;
          }
        }
      }

      removeTimeout = setTimeout(removeMeteor, 5000);
    }

    function removeMeteor() {
      console.log("removeMeteor");

      const removeCount = Math.floor(Math.random() * 10) + 1; // 1 ~ 10

      for (let i = 0; i < removeCount; i++) {
        const c = Math.floor(Math.random() * brickLineCount);
        const v = Math.floor(Math.random() * brickLineCount);

        if (bricks[c][v].die) {
          bricks[c][v].die = false;
        }
      }
    }

    function checkDie() {
      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          if (bricks[c][r].die) {
            if (
              x > bricks[c][r].x &&
              x < bricks[c][r].x + brickSize &&
              y > bricks[c][r].y &&
              y < bricks[c][r].y + brickSize
            ) {
              return true;
            }
          }
        }
      }
      return false;
    }

    function clearTimeouts() {
      clearTimeout(warningTimeout);
      clearTimeout(meteorTimeout);
      clearTimeout(removeTimeout);
    }

    function gameManager() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      movePlayer();

      drawBackground();
      //drawBrickOutline();
      drawTiles();
      drawPlayer();

      if (checkDie()) {
        console.log("Game Over");
        clearTimeouts();
        return;
      }

      requestAnimationFrame(gameManager);
    }

    setTimeout(createWarning, warningTime);

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

    gameManager();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.alignCenter} />
    </div>
  );
}
