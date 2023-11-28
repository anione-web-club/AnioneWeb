"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/games.module.css";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/api/firebase";

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

    let warningTimer = 0; // 워닝 영역 타이머
    let meteorTimer = 0; // 메테오 영역 타이머

    let stopwatchRunning = false; // 스톱워치가 실행 중인지 여부
    let stopwatchStartTime = 0; // 스톱워치 시작 시간
    let stopwatchElapsedTime = 0; // 스톱워치 경과 시간

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

    // 스톱워치를 시작하는 함수를 추가합니다.
    function StartStopwatch() {
      stopwatchRunning = true;
      stopwatchStartTime = Date.now() - stopwatchElapsedTime;
    }

    // 스톱워치를 정지하는 함수를 추가합니다.
    function StopStopwatch() {
      stopwatchRunning = false;
      stopwatchElapsedTime = Date.now() - stopwatchStartTime;
    }

    // 스톱워치를 초기화하는 함수를 추가합니다.
    function ResetStopwatch() {
      stopwatchRunning = false;
      stopwatchStartTime = 0;
      stopwatchElapsedTime = 0;
    }

    // 스톱워치를 업데이트하는 함수를 추가합니다.
    function UpdateStopwatch() {
      if (stopwatchRunning) {
        stopwatchElapsedTime = Date.now() - stopwatchStartTime;
      }
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

      StopStopwatch();

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#fff";
      ctx.textAlign = "center";

      ctx.font = "20px Arial";
      ctx.fillText(
        "Time: " + (stopwatchElapsedTime / 1000).toFixed(2) + "s",
        canvas.width / 2,
        canvas.height / 2 - 30
      );

      ctx.font = "30px Arial";
      ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);

      ctx.font = "20px Arial";
      ctx.fillText("Press any key to restart", canvas.width / 2, canvas.height / 2 + 30);

      const name = prompt("랭킹에 등록할 이름을 입력해주세요.", "");
      if (name) {
        const time = (stopwatchElapsedTime / 1000).toFixed(2);

        setDoc(doc(firestore, "MeteorImpact", Date.now().toString()), {
          name: name,
          score: time,
        });
      }

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

      ResetStopwatch();
      StartStopwatch();

      Update();
    }

    function Update() {
      MovePlayer();

      // 워닝 영역을 랜덤하게 생성합니다.
      if (!warningTimer && !meteorTimer) {
        GenerateWarningZones();
      }

      // 워닝 영역의 지속 시간을 처리합니다.
      if (warningTimer > 0) {
        warningTimer--;

        if (warningTimer === 0) {
          // 워닝에서 메테오 영역으로 전환합니다.
          TransitionToMeteorZone();
        }
      }

      // 메테오 영역의 지속 시간을 처리합니다.
      if (meteorTimer > 0) {
        meteorTimer--;

        if (meteorTimer === 0) {
          // 메테오에서 일반 영역으로 전환합니다.
          TransitionToNormalZone();
        }
      }

      // 스톱워치를 업데이트합니다.
      UpdateStopwatch();

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
      const random = Math.floor(Math.random() * 8) + 3; // 워닝 영역의 개수를 랜덤하게 설정합니다. (조절 필요)

      for (let i = 0; i < random; i++) {
        // 5개의 워닝 영역 생성 (조절 가능)
        const randomC = Math.floor(Math.random() * brickLineCount);
        const randomR = Math.floor(Math.random() * brickLineCount);

        if (!bricks[randomC][randomR].warning && !bricks[randomC][randomR].meteor) {
          bricks[randomC][randomR].warning = true;

          // 시간이 지날수록 워닝 영역의 지속 시간이 짧아집니다.
          warningTimer = 30 - Math.floor(stopwatchElapsedTime / 1000 / 10);
        }
      }
    }

    // 메테오 영역으로 전환하는 함수를 추가합니다.
    function TransitionToMeteorZone() {
      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          if (bricks[c][r].warning) {
            bricks[c][r].warning = false;
            bricks[c][r].meteor = true;
            meteorTimer = 80; // 메테오 영역의 지속 시간을 프레임 단위로 설정합니다. (조절 필요)
          }
        }
      }
    }

    // 일반 영역으로 전환하는 함수를 추가합니다.
    function TransitionToNormalZone() {
      const meteorArray = [];

      for (let c = 0; c < brickLineCount; c++) {
        for (let r = 0; r < brickLineCount; r++) {
          if (bricks[c][r].meteor) {
            meteorArray.push(bricks[c][r]);
          }
        }
      }

      const random = Math.floor(Math.random() * (meteorArray.length / 2));

      for (let i = 0; i < random; i++) {
        meteorArray[i].meteor = false;
      }
    }

    LoadScene();
  }, []);

  return (
    <>
      <div>
        <canvas ref={canvasRef} className={styles.alignCenter} />
      </div>
      <p>게임을 비정상정으로 종료 시 오류가 발생할 수 있습니다</p>
    </>
  );
}
