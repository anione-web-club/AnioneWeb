import { firestore } from "@/api/firebase";
import { doc, setDoc } from "firebase/firestore";

export async function POST(req) {
  const res = await req.json();
  console.log(res);

  setDoc(doc(firestore, "SpikeRush", Date.now().toString()), res);

  return Response.json({ message: "success" });
}
