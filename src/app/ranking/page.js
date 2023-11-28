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

  return (
    <div>
      <h1>{selectedGame} 랭킹 보드</h1>
      <select onChange={setSelectedGame}>
        <option value="DinoRush">DinoRush</option>
        <option value="Speedy">Speedy</option>
        <option value="WORRRD">WORRRD</option>
        <option value="MeteorImpact">MeteorImpact</option>
      </select>
      <ol>
        {rankings.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ol>
    </div>
  );
}
