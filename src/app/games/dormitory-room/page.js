"use cilent";
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
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} className={styles.alignCenter} />
    </div>
  );
}