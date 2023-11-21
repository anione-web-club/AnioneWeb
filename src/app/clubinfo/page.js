import WebInfo from "@/components/WebInfo";
import GameInfo from "@/components/GameInfo";
import CInfo from "@/components/CInfo";
import styles from "@/styles/clubinfo.module.css";

export default function ClubInfo() {
  return (
    <div className={styles.background}>
      <h1 className={styles.title}>동아리 소개</h1>
      <WebInfo />
      <GameInfo />
      <CInfo />
    </div>
  );
}
