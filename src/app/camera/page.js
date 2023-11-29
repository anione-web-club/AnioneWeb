"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/styles/camera.module.css";

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [photoURLBackup, setPhotoURLBackup] = useState(null); // 사진 찍기 전에 카메라 화면 백업
  const [cameraActive, setCameraActive] = useState(true);
  const [selectedStickerIndex, setSelectedStickerIndex] = useState(null); // 선택된 스티커
  const [stickerPosition, setStickerPosition] = useState(null); // 스티커 위치

  useEffect(() => {
    const canvas = canvasRef.current;

    if (window.innerWidth < 768) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth * 0.75;
    } else {
      canvas.width = 768;
      canvas.height = 576;
    }

    console.log("캔버스 크기:", canvas.width, canvas.height);

    setStickerPosition({
      x: canvas.width / 2,
      y: canvas.height / 2,
    });
  }, []);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("카메라 접근 중 오류 발생:", error);
      }
    };

    if (cameraActive) {
      startCamera();
    }

    return () => {
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, [cameraActive]);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/png");
      setPhotoURL(dataURL);
      setPhotoURLBackup(dataURL);
      setCameraActive(false); // 사진 찍은 후에 카메라 비활성화
    }
  };

  const captureCanvas = () => {
    const canvas = canvasRef.current;
    const dataURL = canvas.toDataURL("image/png");
    setPhotoURL(dataURL);
  };

  const resetCamera = () => {
    setPhotoURL(null);
    setCameraActive(true); // 카메라 다시 활성화
  };

  const savePhoto = () => {
    if (photoURL) {
      // 사용자에게 파일 이름 입력 받기
      const fileName = prompt("파일 이름을 입력하세요 (확장자는 자동으로 .png로 설정됩니다):");
      if (fileName) {
        const link = document.createElement("a");
        link.href = photoURL;
        link.download = `${fileName}.png`;
        link.click();
      }
    }
  };

  const handleStickerClick = (index) => {
    setSelectedStickerIndex(index);
  };

  useEffect(() => {
    const selectedSticker = `sticker_${selectedStickerIndex}.png`;
    console.log("선택된 스티커:", selectedSticker);

    if (selectedStickerIndex) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      const stickerImage = new Image();
      stickerImage.src = `/images/camera/${selectedSticker}`;
      console.log(stickerImage.src);

      stickerImage.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);

        const backupImage = new Image();
        backupImage.src = photoURLBackup;
        backupImage.onload = () => {
          context.drawImage(backupImage, 0, 0, canvas.width, canvas.height);

          context.drawImage(stickerImage, stickerPosition.x, stickerPosition.y, 100, 100);
          captureCanvas();
        };
      };
    }
  }, [selectedStickerIndex, stickerPosition]);

  return (
    <div className={styles.container}>
      <h1>카메라 페이지</h1>
      {photoURL ? (
        <div>
          <img src={photoURL} alt="Captured" />
          <div>
            <h3>스티커 선택</h3>
            <div className={styles.stickerToolbar}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((stickerIndex) => (
                <img
                  key={stickerIndex}
                  src={`/images/camera/sticker_${stickerIndex}.png`} // 각 스티커의 경로
                  alt={`Sticker ${stickerIndex}`}
                  onClick={() => handleStickerClick(stickerIndex)} // 배열 인덱스는 0부터 시작
                  className={`${styles.sticker} ${
                    selectedStickerIndex === stickerIndex ? styles.selected : ""
                  }`} // 배열 인덱스는 0부터 시작
                />
              ))}
            </div>
          </div>
          <button onClick={resetCamera}>다시 찍기</button>
          <button onClick={savePhoto}>사진 저장</button>
        </div>
      ) : (
        <div>
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={capturePhoto}>사진 찍기</button>
        </div>
      )}
      <canvas ref={canvasRef} />
    </div>
  );
};

export default CameraPage;
