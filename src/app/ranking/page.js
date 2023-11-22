"use client";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "@/api/firebase";

export default function () {
  const [rankings, setRankings] = useState([]);

  function getRankings() {
    getDocs(collection(firestore, "DinoRush")).then((snapshot) => {
      const rankings = snapshot.docs.map((doc) => doc.data());
      rankings.sort((a, b) => b.score - a.score);
      setRankings(rankings);
    });
  }

  useEffect(() => {
    getRankings();
  }, []);

  return (
    <div>
      <h1>게임 랭킹 보드</h1>
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
