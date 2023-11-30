"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/leaflet.module.css";

export default function Leaflet() {
  const [selected, setSelected] = useState("1층 좌측");
  const menuList = ["1층 좌측", "1층 우측", "2층 6층", "무대공연"];

  function onClickMenu(e) {
    setSelected(e.target.id);
  }

  return (
    <div className={styles.background}>
      <div className={styles.positionList}>
        {menuList.map((menu, index) => (
          <div className={styles.positionItem} key={index}>
            <button className={styles.positionImg} onClick={onClickMenu}>
              <Image src={`/images/leaflet/button${index + 1}.png`} width={128} height={80} id={menu} />
            </button>
          </div>
        ))}
      </div>
      <div className={styles.displayBlock}>
        <Image
          src={`/images/leaflet/${selected}.png`}
          width={656}
          height={1088}
          className={styles.marginAuto}
        />
      </div>
    </div>
  );
}
