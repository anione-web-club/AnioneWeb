import Image from "next/image";
import styles from "@/styles/clubinfo.module.css";

export default function WebInfo() {
  return (
    <div className={styles.flex}>
      <div className={styles.imgCover}>
        <Image src="/club/web.png" alt="웹 프로그래밍 동아리" width={425} height={300} />
      </div>
      <div>
        <h2 className={styles.subtitle}>웹 프로그래밍 동아리</h2>
        <p className={styles.text}>
          저희는 평상시 사용하는 웹 사이트를 '제작'하는 웹 프로그래밍 동아리입니다. HTML, CSS, JavaScript부터
          다양한 라이브러리와 프레임워크까지 다양한 웹 개발 기술을 배우게 됩니다. 학과에서 배우는 게임
          프로그래밍 뿐만 아니라, 다른 분야의 프로그래밍도 접해보며 개발 능력을 더욱 더 향상 시키는 것을
          목표로 운영하고 있습니다.
        </p>
      </div>
    </div>
  );
}
