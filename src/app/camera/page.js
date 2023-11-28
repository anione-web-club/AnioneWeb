"use client";
import { useEffect, useRef, useState } from "react";

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(null);
  const [cameraActive, setCameraActive] = useState(true);

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

      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/png");
      setPhotoURL(dataURL);
      setCameraActive(false); // 사진 찍은 후에 카메라 비활성화
    }
  };

  const resetCamera = () => {
    setPhotoURL(null);
    setCameraActive(true); // 카메라 다시 활성화
  };

  const savePhoto = () => {
    if (photoURL) {
      const link = document.createElement("a");
      link.href = photoURL;
      link.download = "captured_photo.png";
      link.click();
    }
  };

  return (
    <div>
      <h1>카메라 페이지</h1>
      {photoURL ? (
        <div>
          <img src={photoURL} alt="Captured" />
          <button onClick={resetCamera}>다시 찍기</button>
          <button onClick={savePhoto}>사진 저장</button>
        </div>
      ) : (
        <div>
          <video ref={videoRef} autoPlay playsInline />
          <button onClick={capturePhoto}>사진 찍기</button>
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CameraPage;
