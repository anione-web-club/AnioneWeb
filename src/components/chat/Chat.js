"use client";

import { useChat } from "ai/react";
import styles from "@/styles/chat.module.css";

export function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/anione-gpt/api",
    initialMessages: [
      { role: "user", content: "안녕하세요" },
      { role: "assistant", content: "반갑습니다" },
    ],
  });

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input value={input} onChange={handleInputChange} placeholder="내용을 입력해주세요" />

        <button type="submit">Send</button>
      </form>
      <ul className={styles.messages}>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === "user" ? "질문: " : "애니원GPT: "}
            {m.content}
          </li>
        ))}
      </ul>
    </div>
  );
}
