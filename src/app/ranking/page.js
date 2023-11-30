"use client";
import { useInput } from "@/util/hooks";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/api/firebase";
import styles from "@/styles/ranking.module.css";

export default function Ranking() {
  const [selectedGame, setSelectedGame] = useInput("DinoRush");
  const [rankings, setRankings] = useState([]);

  function getRankings() {
    getDocs(collection(firestore, selectedGame)).then((snapshot) => {
      const rankings = snapshot.docs.map((doc) => doc.data());
      rankings.sort((a, b) => b.score - a.score);
      setRankings(rankings);
    });
  }

  useEffect(() => {
    getRankings();
  }, [selectedGame]);

  useEffect(() => {
    const min = 1000 * 60;

    const interval = setInterval(() => {
      getRankings();
    }, min);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <h1>{selectedGame} 랭킹 보드</h1>
      <select onChange={setSelectedGame} className={styles.selectGame}>
        <option value="Speedy">Speedy</option>
        <option value="WORRRD">WORRRD</option>
        <option value="MeteorImpact">MeteorImpact</option>
        <option value="DinoRush">DinoRush</option>
        <option value="OrdinaryRhythm">OrdinaryRhythm</option>
        <option value="SpikeRush">SpikeRush</option>
      </select>
      <p>랭킹 반영은 최대 1분이 소요될 수 있습니다.</p>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>순위</th>
            <th>이름</th>
            <th>점수</th>
          </tr>
        </thead>
        <tbody>
          {rankings.map((player, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
