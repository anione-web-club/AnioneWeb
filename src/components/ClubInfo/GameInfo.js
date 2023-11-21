import Image from "next/image";
import styles from "@/styles/clubinfo.module.css";

export default function GameInfo() {
  return (
    <div className={styles.flex}>
      <div className={styles.imgCover}>
        <Image src="/club/game.png" alt="인디게임 연구 개발 동아리" width={425} height={300} />
      </div>
      <div>
        <h2 className={styles.subtitle}>인디게임 연구 개발 동아리</h2>
        <p className={styles.text}>
          안녕하세요! 우리는 인디게임 연구개발 동아리입니다. 새로운 아이디어와 창의성이 넘치는 회원들이 모여,
          협력과 열정을 바탕으로 다양한 인디게임 프로젝트를 진행하고 있습니다. 우리 동아리는 게임 개발에
          관심이 있는 학생들을 위한 특별한 공간으로, 함께 성장하고 새로운 경험을 쌓을 수 있는 장을 마련하고자
          노력하고 있습니다.
        </p>
      </div>
    </div>
  );
}
