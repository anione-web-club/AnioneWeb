import { firestore } from "@/api/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  const res = await req.json();
  console.log(res);

  setDoc(doc(firestore, "DinoRush", Date.now().toString()), res.data);

  return {
    status: 200,
    body: {
      message: "success",
    },
  };
}
