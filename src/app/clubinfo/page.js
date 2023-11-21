import WebInfo from "@/components/ClubInfo/WebInfo";
import GameInfo from "@/components/ClubInfo/GameInfo";
import CInfo from "@/components/ClubInfo/CInfo";
import styles from "@/styles/clubinfo.module.css";

export default function ClubInfo() {
  return (
    <div className={styles.background}>
      <h1 className={styles.title}>동아리 소개</h1>
      <hr />
      <WebInfo />
      <hr />
      <GameInfo />
      <hr />
      <CInfo />
    </div>
  );
}
