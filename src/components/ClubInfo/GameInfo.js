import Image from "next/image";
import styles from "@/styles/ClubInfo.module.css";

export default function GameInfo() {
  return (
    <div className={styles.flex}>
      <div className={styles.imgCover}>
        <Image src="/club/game.png" alt="인디게임 연구 개발 동아리" width={425} height={300} />
      </div>
      <div>
        <h2 className={styles.subtitle}>인디게임 연구 개발 동아리</h2>
        <p className={styles.text}></p>
      </div>
    </div>
  );
}
