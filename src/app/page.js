"use client";

import { useEffect } from "react";

export default function Home() {
  // 예시 클라이언트 코드

  const postData = async () => {
    const data = {
      // 보내고 싶은 데이터 추가
      name: "홍길동",
      score: 100,
    };

    console.log("Sending data:", data);

    try {
      const response = await fetch("/api/score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result);
      } else {
        console.error("Failed to send data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // postData 함수를 호출하여 데이터를 보냅니다.
  useEffect(() => {
    postData();
  }, []);

  return <></>;
}
