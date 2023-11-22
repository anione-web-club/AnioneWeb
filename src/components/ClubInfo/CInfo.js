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
          저희 C언어 게임 개발 동아리는 C언어를 통해 프로그래밍 기초를 다지고, 추후 콘솔 기반 게임 제작을
          목표로 운영되고 있습니다. 게임의 기본적인 틀을 잡고, 컴퓨터의 구조를 배우고, 다양한 형태의 앱, 게임
          등을 직접 만들고 플레이해보며 코딩을 보다 재미있게 배울 수 있습니다.
        </p>
      </div>
    </div>
  );
}
