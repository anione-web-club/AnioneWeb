"use client";
import { useEffect, useRef } from "react";
import styles from "@/styles/games.module.css";

export default function DormitoryRoom() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const imagePath = "/images/games/dormitory-room/";

    if (window.innerWidth <= 1080) {
      canvas.width = window.innerWidth;
      canvas.height = canvas.width * 1.5;
    } else {
      canvas.height = window.innerHeight - 75;
      canvas.width = (canvas.height / 5) * 3;
    }

    // 이동이 가능한지 확인하는 변수
    let leftSideBarClick = false;
    let rightSideBarClick = false;
    let bottomBarClick = false;

    let isMove = false;

    const imageHeight = (canvas.width / 3) * 4;

    const background = new Image();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, imageHeight);

    function init() {
      leftSideBarClick = false;
      rightSideBarClick = false;
      bottomBarClick = false;

      isMove = false;
    }

    function LeftSideBar() {
      leftSideBarClick = true;

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
      rightSideBarClick = true;

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
      bottomBarClick = true;

      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(0, imageHeight - canvas.height / 20, canvas.width, canvas.height / 20);

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - canvas.width / 40, imageHeight - canvas.height / 30);
      ctx.lineTo(canvas.width / 2 + canvas.width / 40, imageHeight - canvas.height / 30);
      ctx.lineTo(canvas.width / 2, imageHeight - canvas.height / 80);
      ctx.fill();
    }

    /**
     * 이벤트를 발생시키는 함수
     * @param {function} callback 이벤트 발생 후 실행할 함수
     * @param {object} clickBox {x: 0, y: 0, width: 0, height: 0} 형태의 객체
     * @param {number} clickX 클릭한 x 좌표
     * @param {number} clickY 클릭한 y 좌표
     */
    function TriggerEvent(callback, clickBox, clickX, clickY) {
      const { x, y, width, height } = clickBox;

      ctx.strokeStyle = "rgb(255, 0, 0)";
      ctx.lineWidth = 5;
      ctx.strokeRect(x, y, width, height);

      // 클릭한 좌표가 박스 안에 있는지 확인
      if (clickX > x && clickX < x + width && clickY > y && clickY < y + height) {
        callback();
      }
    }

    /**
     * 정보 텍스트를 출력하는 함수
     * @param {string} text 출력할 텍스트
     */
    function printText(text) {
      ctx.fillStyle = "#222";
      ctx.fillRect(
        canvas.width / 10,
        imageHeight - canvas.height / 7.5,
        canvas.width - canvas.width / 5,
        canvas.height / 20
      );

      ctx.fillStyle = "#fff";
      ctx.font = "30px Arial";
      ctx.textAlign = "center";
      ctx.fillText(text, canvas.width / 2, imageHeight - canvas.height / 10);
    }

    // 씬 구성
    function RoomScene() {
      background.src = imagePath + "정면_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();

        console.log(leftSideBarClick, rightSideBarClick, bottomBarClick);
      };

      function RoomEvent(e) {
        console.log("Room Event");

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const balconyClickBox = {
          x: canvas.width / 3,
          y: imageHeight / 3 - canvas.width / 20,
          width: canvas.width / 3,
          height: imageHeight / 2.5,
        };

        const tableClickBox = {
          x: canvas.width / 20,
          y: imageHeight / 2,
          width: canvas.width / 5,
          height: imageHeight / 4,
        };

        const bedClickBox = {
          x: canvas.width - canvas.width / 3,
          y: imageHeight / 2,
          width: canvas.width / 3.5,
          height: imageHeight / 3,
        };

        if (x < canvas.width / 20 && leftSideBarClick) {
          isMove = true;
          ToiletScene();
        }
        if (x > canvas.width - canvas.width / 20 && rightSideBarClick) {
          isMove = true;
          BathroomScene();
        }

        TriggerEvent(
          () => {
            printText("아직 낮이다.");
          },
          balconyClickBox,
          x,
          y
        );

        TriggerEvent(
          () => {
            TableScene();
          },
          tableClickBox,
          x,
          y
        );

        TriggerEvent(
          () => {
            BedScene();
          },
          bedClickBox,
          x,
          y
        );

        if (isMove) canvas.removeEventListener("click", RoomEvent);
      }

      canvas.removeEventListener("click", RoomEvent);
      canvas.addEventListener("click", RoomEvent);
    }

    function ToiletScene() {
      background.src = imagePath + "화장실_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        BottomBar();
      };

      function ToiletEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (y > imageHeight - canvas.height / 20 && bottomBarClick) RoomScene();
      }

      canvas.addEventListener("click", ToiletEvent);
    }

    function BathroomScene() {
      background.src = imagePath + "욕실_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        BottomBar();
      };

      function BathroomEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (y > imageHeight - canvas.height / 20 && bottomBarClick) RoomScene();
      }

      canvas.addEventListener("click", BathroomEvent);
    }

    function TableScene() {
      background.src = imagePath + "책상_낮_필통미개봉.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();
      };

      function TableEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < canvas.width / 20 && leftSideBarClick) BackRoomScene();
        if (x > canvas.width - canvas.width / 20 && rightSideBarClick) RoomScene();
      }

      canvas.addEventListener("click", TableEvent);
    }

    function BackRoomScene() {
      background.src = imagePath + "후면_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();
      };

      function BackRoomEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < canvas.width / 20 && leftSideBarClick) TableScene();
        if (x > canvas.width - canvas.width / 20 && rightSideBarClick) BedScene();
      }

      canvas.addEventListener("click", BackRoomEvent);
    }

    function BedScene() {
      background.src = imagePath + "침대_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();
      };

      function BedEvent(e) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (x < canvas.width / 20 && leftSideBarClick) BackRoomScene();
        if (x > canvas.width - canvas.width / 20 && rightSideBarClick) RoomScene();
      }

      canvas.addEventListener("click", BedEvent);
    }

    document.addEventListener("click", (e) => {
      // 캔버스에서 포커스의 위치를 확인
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      console.log(x, y);
    });

    RoomScene();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.alignCenter} />
    </div>
  );
}
