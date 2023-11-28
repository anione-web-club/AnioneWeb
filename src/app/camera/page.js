"use client";
import { useEffect, useRef, useState } from "react";

const CameraPage = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
      }
    };

    startCamera();

    return () => {
      // Cleanup - stop the camera when the component is unmounted
      const stream = videoRef.current?.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Set canvas dimensions to match video stream
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;

      // Capture video frame and draw it on the canvas
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

      // Convert canvas content to data URL and set as photoURL state
      const dataURL = canvas.toDataURL("image/png");
      setPhotoURL(dataURL);
    }
  };

  return (
    <div>
      <h1>Camera Page</h1>
      <video ref={videoRef} autoPlay playsInline />
      <button onClick={capturePhoto}>Capture Photo</button>
      {photoURL && (
        <div>
          <h2>Captured Photo</h2>
          <img src={photoURL} alt="Captured" />
        </div>
      )}
      <canvas ref={canvasRef} style={{ display: "none" }} />
    </div>
  );
};

export default CameraPage;
