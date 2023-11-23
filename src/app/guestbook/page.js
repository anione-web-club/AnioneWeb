"use client";
import { useEffect, useState } from "react";
import { useInput } from "@/util/hooks";
import { firestore } from "@/api/firebase";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";

export default function GuestBook() {
  const [comment, setComment] = useInput("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getComments();
  }, []);

  function getComments() {
    getDocs(collection(firestore, "community")).then((snapshot) => {
      setComments(snapshot.docs.map((doc) => doc.data()).reverse());
    });
  }

  async function Submit(e) {
    e.preventDefault();
    const time = new Date().toLocaleString("ko-KR");
    await setDoc(doc(firestore, "community", time), {
      text: comment,
    });
    setComment({ target: { value: "" } });
    getComments();
  }

  return (
    <div>
      <h1>Guest Book</h1>

      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={Submit}>
          <input type="text" value={comment} onChange={setComment} />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
