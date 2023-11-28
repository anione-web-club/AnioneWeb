"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/games.module.css";

export default function DormitoryRoom() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imagePath = "/images/games/dormitory-room/";

    if (window.innerWidth <= 768) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth;
    } else {
      canvas.width = 420;
      canvas.height = 420;
    }

    const imageWidth = (canvas.width / 4) * 3;
    const imageHeight = (canvas.height / 4) * 3;

    const scenes = {
      room: imagePath + "room.png",
      bed: imagePath + "bed.png",
      desk: imagePath + "desk.png",
      washroom: imagePath + "washroom.jpg",
      toilet: imagePath + "toilet.jpg",
    };

    function RoomScene() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const CameraScene = new Image();
      CameraScene.src = scenes.room;

      CameraScene.onload = () => {
        ctx.drawImage(CameraScene, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();
      };

      canvas.addEventListener("touchstart", TouchEvent);

      function TouchEvent(e) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        if (touchX < canvas.width / 20 && touchY < imageHeight) ToiletScene();
        else if (touchX > canvas.width - canvas.width / 20 && touchY < imageHeight) WashroomScene();
      }
    }

    function ToiletScene() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 검정 배경
      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const CameraScene = new Image();
      CameraScene.src = scenes.toilet;

      CameraScene.onload = () => {
        const widthMargin = (canvas.width - imageWidth) / 2;
        //ctx.drawImage(CameraScene, widthMargin, 0, imageWidth, canvas.height);

        //BottomBar();

        ctx.fillStyle = "rgb(255, 255, 255)";
        ctx.fillRect(
          canvas.width / 2 - canvas.width / 20,
          canvas.height - canvas.height / 20,
          canvas.width / 10,
          canvas.height / 20
        );
      };

      canvas.addEventListener("touchstart", TouchEvent);

      function TouchEvent(e) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        // 하단 버튼 클릭 시 방으로 이동
        if (
          touchX > canvas.width / 2 - canvas.width / 40 &&
          touchX < canvas.width / 2 + canvas.width / 40 &&
          touchY > canvas.height - canvas.height / 20
        )
          RoomScene();
      }
    }

    function WashroomScene() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#000";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const CameraScene = new Image();
      CameraScene.src = scenes.washroom;

      CameraScene.onload = () => {
        const widthMargin = (canvas.width - imageWidth) / 2;
        ctx.drawImage(CameraScene, widthMargin, 0, imageWidth, canvas.height);

        BottomBar();
      };

      canvas.addEventListener("touchstart", TouchEvent);

      function TouchEvent(e) {
        const touchX = e.touches[0].clientX;
        const touchY = e.touches[0].clientY;

        // 하단 버튼 클릭 시 방으로 이동
        if (
          touchX > canvas.width / 2 - canvas.width / 20 &&
          touchX < canvas.width / 2 + canvas.width / 20 &&
          touchY > canvas.height - canvas.height / 20
        )
          RoomScene();
      }
    }

    function LeftSideBar() {
      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(0, 0, canvas.width / 20, imageHeight);

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(canvas.width / 30, imageHeight / 2 - canvas.width / 40);
      ctx.lineTo(canvas.width / 30, imageHeight / 2 + canvas.width / 40);
      ctx.lineTo(canvas.width / 80, imageHeight / 2);
      ctx.fill();
    }

    function RightSideBar() {
      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(canvas.width - canvas.width / 20, 0, canvas.width / 20, imageHeight);

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(canvas.width - canvas.width / 30, imageHeight / 2 - imageHeight / 40);
      ctx.lineTo(canvas.width - canvas.width / 30, imageHeight / 2 + imageHeight / 40);
      ctx.lineTo(canvas.width - canvas.width / 80, imageHeight / 2);
      ctx.fill();
    }

    function BottomBar() {
      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(0, canvas.height - canvas.height / 20, canvas.width, canvas.height / 20);

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - canvas.width / 40, canvas.height - canvas.height / 30);
      ctx.lineTo(canvas.width / 2 + canvas.width / 40, canvas.height - canvas.height / 30);
      ctx.lineTo(canvas.width / 2, canvas.height - canvas.height / 80);
      ctx.fill();
    }

    RoomScene();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.alignCenter} />
    </div>
  );
}
