import Image from "next/image";
import styles from "@/styles/clubinfo.module.css";

export default function CInfo() {
  return (
    <div className={styles.flex}>
      <div className={styles.imgCover}>
        <Image src="/club/c.png" alt="C언어 게임 개발 동아리" width={425} height={300} />
      </div>
      <div>
        <h2 className={styles.subtitle}>C언어 게임 개발 동아리</h2>
        <p className={styles.text}>
          C언어 게임 개발 동아리는 프로그래밍 기초를 다지며 C언어를 통해 콘솔 기반의 게임을 제작하는 것을
          목표로 운영되고 있습니다
        </p>
      </div>
    </div>
  );
}
