"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/games.module.css";

export default function BreakTile() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imagePath = "/images/games/breaktile/";

    if (window.innerWidth <= 768) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth;
    } else {
      canvas.width = 420;
      canvas.height = 420;
    }

    const background = new Image();
    background.src = imagePath + "background.png";

    const player = new Image();
    player.src = imagePath + "dino_left.png";

    const playerSize = canvas.width / 10;
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    const moveSpeed = playerSize / 10;

    let viewPoint = "Left";

    let upPressed = false;
    let downPressed = false;
    let leftPressed = false;
    let rightPressed = false;

    const brickLineCount = 10;
    const brickSize = canvas.width / brickLineCount;
    const bricks = [];

    const warning = new Image();
    warning.src = imagePath + "shadow.png";
    const meteor = new Image();
    meteor.src = imagePath + "meteor.png";

    let warningTime = 2000;
    let meteorTime = 1000;
    let removeTime = 1500;

    let warningID = null;
    let meteorID = null;
    let removeMeteorID = null;

    let isDead = false;

    for (let c = 0; c < brickLineCount; c++) {
      bricks[c] = [];
      for (let r = 0; r < brickLineCount; r++) {
        bricks[c][r] = { warning: false, meteor: false };
      }
    }

    function LoadScene() {
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Loading...", canvas.width / 2, canvas.height / 2);

      setTimeout(TitleScene, 1000);
    }

    function TitleScene() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Break Tile", canvas.width / 2, canvas.height / 2);

      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Press any key to start", canvas.width / 2, canvas.height / 2 + 30);

      document.addEventListener("keydown", GameStart);
    }

    function GameStart() {
      document.removeEventListener("keydown", GameStart);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";

      warningID = setTimeout(CreateWarning, warningTime);
      GameManager();
    }

    function KeyDownHandler(e) {
      if (e.key === "Up" || e.key === "ArrowUp") {
        upPressed = true;
        player.src = imagePath + "dino_up.png";
        viewPoint = "Up";
      }
      if (e.key === "Down" || e.key === "ArrowDown") {
        downPressed = true;
        player.src = imagePath + "dino_down.png";
        viewPoint = "Down";
      }
      if (e.key === "Left" || e.key === "ArrowLeft") {
        leftPressed = true;
        player.src = imagePath + "dino_left.png";
        viewPoint = "Left";
      }
      if (e.key === "Right" || e.key === "ArrowRight") {
        rightPressed = true;
        player.src = imagePath + "dino_right.png";
        viewPoint = "Right";
      }
    }

    function KeyUpHandler(e) {
      if (e.key === "Up" || e.key === "ArrowUp") upPressed = false;
      if (e.key === "Down" || e.key === "ArrowDown") downPressed = false;
      if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
    }

    function MovePlayer() {
      if (upPressed && y > 0) y -= moveSpeed;
      else if (downPressed && y < canvas.height - playerSize) y += moveSpeed;
      else if (leftPressed && x > 0) x -= moveSpeed;
      else if (rightPressed && x < canvas.width - playerSize) x += moveSpeed;
    }

    function CreateWarning() {
      const warningCount = Math.floor(Math.random() * 5) + 2; // 2 ~ 6

      for (let i = 0; i < warningCount; i++) {
        const c = Math.floor(Math.random() * brickLineCount);
        const r = Math.floor(Math.random() * brickLineCount);

        bricks[c][r].warning = true;
      }

      if (warningTime > meteorTime + 300) warningTime -= 100;
      if (warningTime <= meteorTime + 300 && meteorTime > 500) meteorTime -= 100;
      if (meteorTime <= 500 && removeTime > 500) removeTime -= 100;

      warningID = setTimeout(CreateWarning, warningTime);
      meteorID = setTimeout(CreateMeteor, meteorTime);
    }

    function CreateMeteor() {
      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          if (bricks[c][r].warning) {
            bricks[c][r].warning = false;
            bricks[c][r].meteor = true;
          }
        }
      }

      removeMeteorID = setTimeout(RemoveMeteor, removeTime);
    }

    function RemoveMeteor() {
      const removeCount = Math.floor(Math.random() * 5) + 1; // 1 ~ 5

      const meteorIndices = [];

      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          if (bricks[c][r].meteor) {
            meteorIndices.push({ c, r });
          }
        }
      }

      const effectiveRemoveCount = Math.min(removeCount, meteorIndices.length);
      for (let i = 0; i < effectiveRemoveCount; i++) {
        const randomIndex = Math.floor(Math.random() * meteorIndices.length);
        const { c, r } = meteorIndices[randomIndex];
        bricks[c][r].meteor = false;

        meteorIndices.splice(randomIndex, 1);
      }
    }

    function ClearTimeouts() {
      clearTimeout(warningID);
      clearTimeout(meteorID);
      clearTimeout(removeMeteorID);
    }

    function DrawBackground() {
      ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    }

    function DrawTiles() {
      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          const brickX = c * brickSize;
          const brickY = r * brickSize;

          if (bricks[c][r].warning) {
            ctx.drawImage(warning, brickX, brickY, brickSize, brickSize);
          } else if (bricks[c][r].meteor) {
            ctx.drawImage(meteor, brickX, brickY, brickSize, brickSize);
          }
        }
      }
    }

    function DrawPlayer() {
      //if (viewPoint === "Up" && viewPoint === "Down") ctx.drawImage(player, x, y, playerSize, playerSize * 2);
      //else if (viewPoint === "Left" && viewPoint === "Right")
      //ctx.drawImage(player, x, y, playerSize * 2, playerSize);
      ctx.drawImage(player, x, y, playerSize, playerSize);
    }

    function CheckCollision() {
      // 플레이어와 블럭의 충돌 판정
      const playerLeft = x;
      const playerRight = x + playerSize;
      const playerTop = y;
      const playerBottom = y + playerSize;

      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          const brickX = c * brickSize;
          const brickY = r * brickSize;

          if (bricks[c][r].meteor) {
            const brickLeft = brickX;
            const brickRight = brickX + brickSize;
            const brickTop = brickY;
            const brickBottom = brickY + brickSize;

            if (
              playerLeft < brickRight &&
              playerRight > brickLeft &&
              playerTop < brickBottom &&
              playerBottom > brickTop
            ) {
              isDead = true;
            }
          }
        }
      }
    }

    function GameOver() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
    }

    function GameManager() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      document.addEventListener("keydown", KeyDownHandler);
      document.addEventListener("keyup", KeyUpHandler);

      MovePlayer();

      DrawBackground();
      DrawTiles();
      DrawPlayer();

      CheckCollision();

      if (isDead) {
        GameOver();
        return;
      }

      requestAnimationFrame(GameManager);
    }

    LoadScene();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.alignCenter} />
    </div>
  );
}
