"use client";
import { useEffect, useState } from "react";
import { useInput } from "@/util/hooks";
import { firestore } from "@/api/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import styles from "@/styles/guestbook.module.css";

export default function GuestBook() {
  const [comment, setComment] = useInput("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    getDocs(collection(firestore, "Community")).then((snapshot) => {
      setComments(snapshot.docs.map((doc) => doc.data()).reverse());
    });
  }

  async function Submit(e) {
    e.preventDefault();
    const time = new Date().toLocaleString("ko-KR");
    await setDoc(doc(firestore, "Community", time), {
      text: comment,
    });
    setComment({ target: { value: "" } });
    getComments();
  }

  return (
    <div>
      <div className={styles.cent}>
        <h1>Guest Book</h1>
        <h2>소중한 한마디 남겨주세요</h2>
      </div>
      <form className={styles.guestoption} onSubmit={Submit}>
        <input type="text" value={comment} onChange={setComment} className={styles.input} />
        <button type="submit" className={styles.button}>
          남기기!
        </button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div className={styles.guestchat} key={index}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
