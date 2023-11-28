"use client";
import { useInput } from "@/util/hooks";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/api/firebase";
import "@/styles/ranking.css";

export default function () {
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
    <div id={selectedGame}>
      <h1>{selectedGame} 랭킹 보드</h1>
      <h2>게임을 선택해주세요</h2>

      <select onChange={setSelectedGame} id="box">
        <option value="DinoRush">DinoRush</option>
        <option value="Speedy">Speedy</option>
        <option value="WORRRD">WORRRD</option>
        <option value="MeteorImpact">MeteorImpact</option>
      </select>
      <div id="RSL">
        {rankings.map((player, index) => (
          <div key={index}>
            <span>{index + 1}등</span>
            <span>
              {player.name} - {player.score}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
