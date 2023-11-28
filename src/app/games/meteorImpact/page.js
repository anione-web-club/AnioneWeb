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

    const playerSize = canvas.width / 12;
    let playerX = canvas.width / 2 - playerSize / 2;
    let playerY = canvas.height / 2 - playerSize / 2;
    const moveSpeed = playerSize / 10;

    const brickLineCount = 10;
    const brickSize = canvas.width / brickLineCount;
    const bricks = [];

    let upPressed = false;
    let downPressed = false;
    let leftPressed = false;
    let rightPressed = false;

    let lastViewPoint = "Down";

    // 디버그용 키 입력 감지
    //document.addEventListener("keydown", EventTest, false);

    //function EventTest(event) {
    //  console.log(event.key);
    //}

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

      ctx.font = "20px Arial";
      ctx.fillText("Press any key to start", canvas.width / 2, canvas.height / 2 + 30);

      document.addEventListener("keydown", Start, false);
    }

    function KeyDownHandler(event) {
      if (event.key == "Up" || event.key == "ArrowUp") {
        upPressed = true;
        lastViewPoint = "Up";
      } else if (event.key == "Down" || event.key == "ArrowDown") {
        downPressed = true;
        lastViewPoint = "Down";
      } else if (event.key == "Left" || event.key == "ArrowLeft") {
        leftPressed = true;
        lastViewPoint = "Left";
      } else if (event.key == "Right" || event.key == "ArrowRight") {
        rightPressed = true;
        lastViewPoint = "Right";
      }
    }

    function KeyUpHandler(event) {
      if (event.key == "Up" || event.key == "ArrowUp") upPressed = false;
      else if (event.key == "Down" || event.key == "ArrowDown") downPressed = false;
      else if (event.key == "Left" || event.key == "ArrowLeft") leftPressed = false;
      else if (event.key == "Right" || event.key == "ArrowRight") rightPressed = false;
    }

    function MovePlayer() {
      if (upPressed && playerY > 0) playerY -= moveSpeed;
      if (downPressed && playerY < canvas.height - playerSize) playerY += moveSpeed;
      if (leftPressed && playerX > 0) playerX -= moveSpeed;
      if (rightPressed && playerX < canvas.width - playerSize) playerX += moveSpeed;
    }

    function DrawBricks() {
      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          const brick = bricks[c][r];

          const brickImage = new Image();
          brickImage.src = imagePath + "brick/" + brick.randomBrick + ".png";

          ctx.drawImage(brickImage, brick.x, brick.y, brickSize, brickSize);

          if (brick.warning) {
            const warningImage = new Image();
            warningImage.src = imagePath + "warning.png";

            ctx.drawImage(warningImage, brick.x, brick.y, brickSize, brickSize);
          }

          if (brick.meteor) {
            const meteorImage = new Image();
            meteorImage.src = imagePath + "meteor.png";

            ctx.drawImage(meteorImage, brick.x, brick.y, brickSize, brickSize);
          }
        }
      }
    }

    function DrawPlayer() {
      const playerImage = new Image();
      playerImage.src = imagePath + "dino/" + lastViewPoint.toLowerCase() + ".png";

      if (lastViewPoint == "Up" || lastViewPoint == "Down")
        ctx.drawImage(playerImage, playerX, playerY, playerSize / 1.5, playerSize);
      else if (lastViewPoint == "Left" || lastViewPoint == "Right")
        ctx.drawImage(playerImage, playerX, playerY, playerSize * 1.5, playerSize);
    }

    function Draw() {
      DrawBricks();
      DrawPlayer();
    }

    function CollisionDetection() {
      const playerCenterX = playerX + playerSize / 2;
      const playerCenterY = playerY + playerSize / 2;
      const playerRadius = playerSize / 2;

      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          const brick = bricks[c][r];

          if (brick.meteor) {
            const meteorCenterX = brick.x + brickSize / 2;
            const meteorCenterY = brick.y + brickSize / 2;
            const meteorRadius = brickSize / 2;

            const distanceX = Math.abs(playerCenterX - meteorCenterX);
            const distanceY = Math.abs(playerCenterY - meteorCenterY);

            const combinedRadius = playerRadius + meteorRadius;

            if (distanceX < combinedRadius && distanceY < combinedRadius) {
              return true;
            }
          }
        }
      }

      return false;
    }

    function GameOver() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      document.removeEventListener("keydown", KeyDownHandler, false);
      document.removeEventListener("keyup", KeyUpHandler, false);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

      ctx.fillStyle = "#fff";
      ctx.font = "20px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Press any key to restart", canvas.width / 2, canvas.height / 2 + 30);

      document.addEventListener("keydown", Start, false);
    }

    function Start() {
      for (let c = 0; c < brickLineCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickLineCount; r++) {
          const random = Math.floor(Math.random() * 3) + 1;

          bricks[c][r] = {
            x: c * brickSize,
            y: r * brickSize,
            randomBrick: random,
            warning: false,
            meteor: false,
          };
        }
      }

      upPressed = false;
      downPressed = false;
      leftPressed = false;
      rightPressed = false;

      document.removeEventListener("keydown", Start, false);

      document.addEventListener("keydown", KeyDownHandler, false);
      document.addEventListener("keyup", KeyUpHandler, false);

      bricks[0][0].meteor = true;

      Update();
    }

    // 컴포넌트 시작 부분에 다음 상태 변수들을 추가합니다.
    const warningZones = []; // 워닝 영역 배열
    const meteorZones = []; // 메테오 영역 배열

    function Update() {
      MovePlayer();

      // 워닝 영역을 랜덤하게 생성합니다.
      if (Math.random() < 0.01 && !warningZones.length && !meteorZones.length) {
        GenerateWarningZones();
      }

      // 워닝 영역의 지속 시간을 처리합니다.
      warningZones.forEach((zone) => {
        if (zone.timer > 0) {
          zone.timer--;

          if (zone.timer === 0) {
            // 워닝에서 메테오 영역으로 전환합니다.
            TransitionToMeteorZone(zone);
          }
        }
      });

      // 메테오 영역의 지속 시간을 처리합니다.
      meteorZones.forEach((zone) => {
        if (zone.timer > 0) {
          zone.timer--;

          if (zone.timer === 0) {
            // 메테오에서 일반 영역으로 전환합니다.
            TransitionToNormalZone(zone);
          }
        }
      });

      Draw();

      // 충돌 검사를 수행합니다.
      if (CollisionDetection()) {
        GameOver();
        return;
      }

      requestAnimationFrame(Update);
    }

    // 여러 개의 워닝 영역을 생성하는 함수를 추가합니다.
    function GenerateWarningZones() {
      const numWarningZones = Math.floor(Math.random() * 3) + 1; // 1부터 3까지의 워닝 영역을 생성 (조절 가능)

      for (let i = 0; i < numWarningZones; i++) {
        const randomC = Math.floor(Math.random() * brickLineCount);
        const randomR = Math.floor(Math.random() * brickLineCount);

        if (!bricks[randomC][randomR].warning && !bricks[randomC][randomR].meteor) {
          bricks[randomC][randomR].warning = true;
          const warningZone = {
            c: randomC,
            r: randomR,
            timer: 60, // 워닝 영역의 지속 시간을 프레임 단위로 설정합니다. (조절 필요)
          };
          warningZones.push(warningZone);
        }
      }
    }

    // 메테오 영역으로 전환하는 함수를 추가합니다.
    function TransitionToMeteorZone(zone) {
      const { c, r } = zone;

      if (bricks[c][r].warning) {
        bricks[c][r].warning = false;
        bricks[c][r].meteor = true;
        zone.timer = 120; // 메테오 영역의 지속 시간을 프레임 단위로 설정합니다. (조절 필요)
        meteorZones.push(zone);
      }
    }

    // 일반 영역으로 전환하는 함수를 추가합니다.
    function TransitionToNormalZone(zone) {
      const { c, r } = zone;

      if (bricks[c][r].meteor) {
        bricks[c][r].meteor = false;
        meteorZones.splice(meteorZones.indexOf(zone), 1);
      }
    }

    // 나머지 코드는 그대로 유지합니다.

    LoadScene();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.alignCenter} />
    </div>
  );
}
