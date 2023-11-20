"use client";
import { useEffect, useRef } from "react";

export default function () {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    ctx.fillStyle = "#eee"; // 색상명
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
}
