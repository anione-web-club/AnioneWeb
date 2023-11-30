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

    let allowLeftBar = false;
    let allowRightBar = false;
    let allowBottomBar = false;

    let isMove = false;

    const imageHeight = (canvas.width / 3) * 4;

    // 가로 바 변수, 세로 바 변수 제작
    const widthBar = canvas.width / 20;
    const heightBar = canvas.height / 20;

    const background = new Image();

    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    /**
     * 이동 바 클릭 여부를 초기화하는 함수
     */
    function init() {
      allowLeftBar = false;
      allowRightBar = false;
      allowBottomBar = false;
    }

    function LeftSideBar() {
      allowLeftBar = true;

      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(0, 0, widthBar, imageHeight);

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(canvas.width / 30, imageHeight / 2 - canvas.width / 40);
      ctx.lineTo(canvas.width / 30, imageHeight / 2 + canvas.width / 40);
      ctx.lineTo(canvas.width / 80, imageHeight / 2);
      ctx.fill();
    }

    function RightSideBar() {
      allowRightBar = true;

      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(canvas.width - widthBar, 0, widthBar, imageHeight);

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(canvas.width - canvas.width / 30, imageHeight / 2 - imageHeight / 40);
      ctx.lineTo(canvas.width - canvas.width / 30, imageHeight / 2 + imageHeight / 40);
      ctx.lineTo(canvas.width - canvas.width / 80, imageHeight / 2);
      ctx.fill();
    }

    function BottomBar() {
      allowBottomBar = true;

      ctx.fillStyle = "rgb(50, 50, 50)";
      ctx.fillRect(0, imageHeight - heightBar, canvas.width, heightBar);

      ctx.fillStyle = "rgb(255, 255, 255)";
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2 - canvas.width / 40, imageHeight - canvas.height / 30);
      ctx.lineTo(canvas.width / 2 + canvas.width / 40, imageHeight - canvas.height / 30);
      ctx.lineTo(canvas.width / 2, imageHeight - canvas.height / 80);
      ctx.fill();
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

    function RoomFrontScene() {
      console.log("RoomFront Scene");

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

      background.src = imagePath + "정면_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();

        // RoomEvent 함수에 대한 참조를 유지
        const roomFrontEventFunction = (e) => RoomFrontEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", roomFrontEventFunction);

        function RoomFrontEvent(e) {
          console.log("RoomFront Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (x < widthBar && allowLeftBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", roomFrontEventFunction);
            ToiletScene();
          }
          if (x > canvas.width - widthBar && allowRightBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", roomFrontEventFunction);
            BathroomScene();
          }
          // 베란다 클릭
          if (
            balconyClickBox.x < x &&
            x < balconyClickBox.x + balconyClickBox.width &&
            balconyClickBox.y < y &&
            y < balconyClickBox.y + balconyClickBox.height
          ) {
            printText("아직 낮이다.");
          }
          // 책상 클릭
          if (
            tableClickBox.x < x &&
            x < tableClickBox.x + tableClickBox.width &&
            tableClickBox.y < y &&
            y < tableClickBox.y + tableClickBox.height
          ) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", roomFrontEventFunction);
            TableScene();
          }
          // 침대 클릭
          if (
            bedClickBox.x < x &&
            x < bedClickBox.x + bedClickBox.width &&
            bedClickBox.y < y &&
            y < bedClickBox.y + bedClickBox.height
          ) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", roomFrontEventFunction);
            BedScene();
          }
        }
      };
    }

    function ToiletScene() {
      console.log("Toilet Scene");

      background.src = imagePath + "화장실_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        BottomBar();

        // ToiletEvent 함수에 대한 참조를 유지
        const toiletEventFunction = (e) => ToiletEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", toiletEventFunction);

        function ToiletEvent(e) {
          console.log("Toilet Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (y > imageHeight - heightBar && allowBottomBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", toiletEventFunction);
            RoomFrontScene();
          }
        }
      };
    }

    function BathroomScene() {
      console.log("Bathroom Scene");

      const sinkClickBox = {
        x: 0,
        y: imageHeight / 2,
        width: canvas.width / 2,
        height: imageHeight / 3,
      };

      const soapClickBox = {
        x: canvas.width / 2.25,
        y: imageHeight / 1.75,
        width: canvas.width / 15,
        height: imageHeight / 30,
      };

      // 거울 클릭 히트박스
      const mirrorClickBox = {
        x: canvas.width / 7,
        y: imageHeight / 5,
        width: canvas.width - canvas.width / 7,
        height: imageHeight / 4,
      };

      // 샤워기 클릭 히트박스
      const showerClickBox = {
        x: canvas.width / 1.3,
        y: imageHeight / 2.2,
        width: canvas.width / 5,
        height: imageHeight / 10,
      };

      background.src = imagePath + "욕실_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        BottomBar();

        // BathroomEvent 함수에 대한 참조를 유지
        const bathroomEventFunction = (e) => BathroomEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", bathroomEventFunction);

        function BathroomEvent(e) {
          console.log("Bathroom Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (y > imageHeight - heightBar && allowBottomBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", bathroomEventFunction);
            RoomFrontScene();
          }
          if (
            soapClickBox.x < x &&
            x < soapClickBox.x + soapClickBox.width &&
            soapClickBox.y < y &&
            y < soapClickBox.y + soapClickBox.height
          ) {
            printText("비누다.");
          }
          // 세면대 클릭
          else if (
            sinkClickBox.x < x &&
            x < sinkClickBox.x + sinkClickBox.width &&
            sinkClickBox.y < y &&
            y < sinkClickBox.y + sinkClickBox.height
          ) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", bathroomEventFunction);
            // 세면대 씬으로 전환
            SinkScene();
          }

          // 거울 클릭
          else if (
            mirrorClickBox.x < x &&
            x < mirrorClickBox.x + mirrorClickBox.width &&
            mirrorClickBox.y < y &&
            y < mirrorClickBox.y + mirrorClickBox.height
          ) {
            printText("보고 싶지 않다.");
          }
          // 샤워기 클릭
          if (
            showerClickBox.x < x &&
            x < showerClickBox.x + showerClickBox.width &&
            showerClickBox.y < y &&
            y < showerClickBox.y + showerClickBox.height
          ) {
            printText("굳이 건드릴 필요는 없다.");
          }
        }
      };
    }

    function SinkScene() {
      console.log("Sink Scene");

      background.src = imagePath + "세면대_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        BottomBar();

        // SinkEvent 함수에 대한 참조를 유지
        const sinkEventFunction = (e) => SinkEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", sinkEventFunction);

        function SinkEvent(e) {
          console.log("Sink Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (y > imageHeight - heightBar && allowBottomBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", sinkEventFunction);
            BathroomScene();
          }
        }
      };
    }

    function TableScene() {
      console.log("Table Scene");

      const chairClickBox = {
        x: canvas.width / 5,
        y: imageHeight / 1.3,
        width: canvas.width / 3,
        height: imageHeight / 5,
      };

      const paperClickBox = {
        x: canvas.width / 2,
        y: imageHeight / 2.25,
        width: canvas.width / 5,
        height: imageHeight / 8,
      };

      background.src = imagePath + "책상_낮_필통미개봉.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();

        // TableEvent 함수에 대한 참조를 유지
        const tableEventFunction = (e) => TableEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", tableEventFunction);

        function TableEvent(e) {
          console.log("Table Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (x < widthBar && allowLeftBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", tableEventFunction);
            RoomBackScene();
          }
          if (x > canvas.width - widthBar && allowRightBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", tableEventFunction);
            RoomFrontScene();
          }
          if (
            chairClickBox.x < x &&
            x < chairClickBox.x + chairClickBox.width &&
            chairClickBox.y < y &&
            y < chairClickBox.y + chairClickBox.height
          ) {
            printText("평범한 의자");
          }
          if (
            paperClickBox.x < x &&
            x < paperClickBox.x + paperClickBox.width &&
            paperClickBox.y < y &&
            y < paperClickBox.y + paperClickBox.height
          ) {
            printText("무언가 적혀있다.");
          }
        }
      };
    }

    function BedScene() {
      console.log("Bed Scene");

      const fanClickBox = {
        x: widthBar,
        y: imageHeight / 2,
        width: canvas.width / 5,
        height: imageHeight / 2,
      };

      const bedClickBox = {
        x: widthBar + canvas.width / 5,
        y: imageHeight / 1.5,
        width: canvas.width - (widthBar * 2 + canvas.width / 5),
        height: imageHeight / 5,
      };

      const drawerClickBox = {
        x: widthBar + canvas.width / 5,
        y: imageHeight / 1.5 + imageHeight / 5,
        width: canvas.width - (widthBar * 2 + canvas.width / 5),
        height: imageHeight / 7.5,
      };

      background.src = imagePath + "침대_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();

        // BedEvent 함수에 대한 참조를 유지
        const bedEventFunction = (e) => BedEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", bedEventFunction);

        function BedEvent(e) {
          console.log("Bed Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (x < widthBar && allowLeftBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", bedEventFunction);
            RoomBackScene();
          }
          if (x > canvas.width - widthBar && allowRightBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", bedEventFunction);
            RoomFrontScene();
          }
          // 선풍기 클릭
          if (
            fanClickBox.x < x &&
            x < fanClickBox.x + fanClickBox.width &&
            fanClickBox.y < y &&
            y < fanClickBox.y + fanClickBox.height
          ) {
            printText("선풍기가 간간히 돌아간다.");
          }
          // 침대 클릭
          if (
            bedClickBox.x < x &&
            x < bedClickBox.x + bedClickBox.width &&
            bedClickBox.y < y &&
            y < bedClickBox.y + bedClickBox.height
          ) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            printText("침대다.");
          }
          // 서랍장 클릭
          if (
            drawerClickBox.x < x &&
            x < drawerClickBox.x + drawerClickBox.width &&
            drawerClickBox.y < y &&
            y < drawerClickBox.y + drawerClickBox.height
          ) {
            printText("열리지 않는다.");
          }
        }
      };
    }

    function RoomBackScene() {
      console.log("RoomBack Scene");

      const closetClickBox = {
        x: canvas.width / 4,
        y: imageHeight / 3,
        width: canvas.width / 8,
        height: imageHeight / 3,
      };
      const roomFrontClickBox = {
        x: canvas.width / 2,
        y: imageHeight / 3,
        width: canvas.width / 8,
        height: imageHeight / 3,
      };
      const drawerClickBox = {
        x: canvas.width / 1.5,
        y: imageHeight / 2,
        width: canvas.width / 4,
        height: imageHeight / 6,
      };

      background.src = imagePath + "후면_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();
        RightSideBar();

        // RoomBackEvent 함수에 대한 참조를 유지
        const roomBackEventFunction = (e) => RoomBackEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", roomBackEventFunction);

        function RoomBackEvent(e) {
          console.log("RoomBack Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (x < widthBar && allowLeftBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", roomBackEventFunction);
            BedScene();
          }
          if (x > canvas.width - widthBar && allowRightBar) {
            // 새로운 씬으로 전환하기 전에 이전 이벤트 리스너 삭제
            canvas.removeEventListener("click", roomBackEventFunction);
            TableScene();
          }
          // 옷장 클릭
          if (
            closetClickBox.x < x &&
            x < closetClickBox.x + closetClickBox.width &&
            closetClickBox.y < y &&
            y < closetClickBox.y + closetClickBox.height
          ) {
            canvas.removeEventListener("click", roomBackEventFunction);
            ClosetScene();
          }
          if (
            roomFrontClickBox.x < x &&
            x < roomFrontClickBox.x + roomFrontClickBox.width &&
            roomFrontClickBox.y < y &&
            y < roomFrontClickBox.y + roomFrontClickBox.height
          ) {
            canvas.removeEventListener("click", roomBackEventFunction);
            RoomFrontScene();
          }
          // 서랍장 클릭
          if (
            drawerClickBox.x < x &&
            x < drawerClickBox.x + drawerClickBox.width &&
            drawerClickBox.y < y &&
            y < drawerClickBox.y + drawerClickBox.height
          ) {
            canvas.removeEventListener("click", roomBackEventFunction);
            DrawerScene();
          }
        }
      };
    }

    function ClosetScene() {
      console.log("Closet Scene");

      const closetClickBox = {
        x: widthBar,
        y: imageHeight / 2,
        width: canvas.width / 5,
        height: imageHeight / 2,
      };

      background.src = imagePath + "옷장_낮.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        LeftSideBar();

        // ClosetEvent 함수에 대한 참조를 유지
        const closetEventFunction = (e) => ClosetEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", closetEventFunction);

        function ClosetEvent(e) {
          console.log("Closet Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (x < widthBar && allowLeftBar) {
            canvas.removeEventListener("click", closetEventFunction);
            RoomBackScene();
          }
        }
      };
    }

    function DrawerScene() {
      console.log("Drawer Scene");

      const drawerClickBox = {
        x: canvas.width / 4,
        y: imageHeight / 2,
        width: canvas.width / 5,
        height: imageHeight / 10,
      };

      background.src = imagePath + "서랍_낮_곰돌이있음.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        RightSideBar();

        // DrawerEvent 함수에 대한 참조를 유지
        const drawerEventFunction = (e) => DrawerEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", drawerEventFunction);

        function DrawerEvent(e) {
          console.log("Drawer Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (x > canvas.width - widthBar && allowRightBar) {
            canvas.removeEventListener("click", drawerEventFunction);
            RoomBackScene();
          }
          // 서랍장 클릭
          if (
            drawerClickBox.x < x &&
            x < drawerClickBox.x + drawerClickBox.width &&
            drawerClickBox.y < y &&
            y < drawerClickBox.y + drawerClickBox.height
          ) {
            canvas.removeEventListener("click", drawerEventFunction);
            BearScene();
          }
        }
      };
    }

    function BearScene() {
      console.log("Bear Scene");

      background.src = imagePath + "곰돌이.png";
      background.onload = () => {
        init();

        ctx.drawImage(background, 0, 0, canvas.width, imageHeight);

        RightSideBar();

        // BearEvent 함수에 대한 참조를 유지
        const bearEventFunction = (e) => BearEvent(e);

        // 새로운 이벤트 리스너 등록
        canvas.addEventListener("click", bearEventFunction);

        function BearEvent(e) {
          console.log("Bear Event");

          const rect = canvas.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;

          if (x > canvas.width - widthBar && allowRightBar) {
            canvas.removeEventListener("click", bearEventFunction);
            DrawerScene();
          }
        }
      };
    }

    RoomFrontScene();
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.alignCenter} />
    </div>
  );
}
