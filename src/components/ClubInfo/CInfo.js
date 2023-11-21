import Image from "next/image";
import styles from "@/styles/ClubInfo.module.css";

export default function CInfo() {
  return (
    <div className={styles.flex}>
      <div className={styles.imgCover}>
        <Image src="/club/c.png" alt="C언어 게임 개발 동아리" width={425} height={300} />
      </div>
      <div>
        <h2 className={styles.subtitle}>C언어 게임 개발 동아리</h2>
        <p className={styles.text}></p>
      </div>
    </div>
  );
}
