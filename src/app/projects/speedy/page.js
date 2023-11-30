"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/games.module.css";
import "@/styles/bullet.css";
import { doc, setDoc } from "firebase/firestore";
import { firestore } from "@/api/firebase";

export default function () {
  // 캔버스 요소 가져오기
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 660;
    canvas.height = 720;
    //타이틀 화면 변수
    let title = true;
    let start = false;

    //타이틀 화면 그리기
    function titleScreen() {
      ctx.fillStyle = "white";
      ctx.font = "36px Arial";
      ctx.fillText("SPEEDY", 260, 160);
      ctx.font = "24px Arial";
      ctx.fillText("Press Spacebar to Start", 190, 200);
      ctx.textAlign = "center";
      ctx.fillText("마우스를 이용하여 하얀공을 조종해 총알을 피하세요!", canvas.width / 2, 280);
      ctx.font = "18px times new roman";
      ctx.fillText("정상우(@sw.the.creater)", canvas.width / 2, 680);

      //스페이스 이벤트 핸들러 등록
      document.addEventListener("keydown", function (event) {
        console.log(event);
        if (event.code === "Space") {
          console.log(event.code);
          gameLoop();
        }
      });
    }
    //타이틀 화면 실행
    titleScreen();

    // 게임 상태 변수
    let gameOver = false;
    let score = 0;
    let time = 5000;
    setInterval;
    let player = {
      x: canvas.width / 2,
      y: canvas.height - 50,
      radius: 25,
    };
    let missiles = [];
    // 키 이벤트 핸들러 등록
    document.addEventListener("keydown", function (event) {
      if (event.code === "Escape") {
        gameOver = true;
      }
    });

    // 마우스 이벤트 핸들러 등록
    canvas.addEventListener("mousemove", function (event) {
      if (!gameOver) {
        player.x = event.clientX - canvas.offsetLeft;
      }
    });

    let gameTimer = setTimeout(gameLevelup, time);

    function gameLevelup() {
      missiles.speed += 0.7; //미사일 속도 증가
      gameTimer = setTimeout(gameLevelup, time);
    }

    // 게임 루프 함수
    function gameLoop() {
      // 게임 종료 시 게임 루프 중지
      if (gameOver) {
        return;
      }

      // 게임 상태 업데이트
      time++;
      if (time % 50 === 0) {
        missiles.push({
          x: Math.random() * canvas.width,
          y: 0,
          radius: 15,
          speed: 5 + time / 600, //미사일 속도
        });
      }

      for (let i = 0; i < missiles.length; i++) {
        missiles[i].y += missiles[i].speed;
        if (missiles[i].y > canvas.height) {
          missiles.splice(i, 1);
          i--;
        } else {
          let distance = Math.sqrt(Math.pow(player.x - missiles[i].x, 2) + Math.pow(player.y - missiles[i].y, 2));
          // 충돌 검사
          if (distance < player.radius + missiles[i].radius) {
            gameOver = true;
          }
        }
      }
      score++;

      // 게임 화면 그리기
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
      ctx.fillStyle = "white"; //공 명령어
      ctx.fill();
      //미사일 생성
      for (let i = 0; i < missiles.length; i++) {
        ctx.beginPath();
        ctx.arc(missiles[i].x, missiles[i].y, missiles[i].radius, 0, 2.4 * Math.PI);
        ctx.fillStyle = "yellow";
        ctx.fill();
      }
      ctx.fillStyle = "white";
      ctx.font = "40px Arial";
      ctx.textAlign = "left";
      ctx.fillText("Score: " + score, 10, 30);

      // 다음 프레임 실행
      requestAnimationFrame(gameLoop);

      // 게임 종료 시 최종 점수 출력
      if (gameOver) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "white";
        ctx.font = "36px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Game Over", canvas.width / 2, 150);
        ctx.font = "60px Arial";
        ctx.fillText("Score: " + score, canvas.width / 2, 300);
        ctx.font = "30px Arial";
        ctx.fillText("N키를 눌러서 닉네임을 입력해주세요!", canvas.width / 2, 450);
        //스페이스 이벤트 핸들러 등록
        document.addEventListener("keydown", namer);

        function namer(event) {
          console.log(event);
          if (event.code === "KeyN") {
            //팝업창 띄우기
            var name = prompt("닉네임을 입력해주세요", "");
            console.log(name);

            setDoc(doc(firestore, "Speedy", Date.now().toString()), {
              name: name,
              score: score,
            });

            //이름 입력후 새로고침
            document.removeEventListener("keydown", namer);
          }
        }
      }
    }
    //gameLoop();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.alignCenter} />
    </div>
  );
}
