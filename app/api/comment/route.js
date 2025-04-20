// app/api/comments/route.js
import { db } from "@/app/firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

export async function POST(req) {
  try {
    const { name, comment, rating } = await req.json();

    if (!name || !comment || typeof rating !== "number") {
      return Response.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await addDoc(collection(db, "comments"), {
      name,
      comment,
      rating,
      timestamp: serverTimestamp(),
    });

    return Response.json({ message: "Comment added successfully" });
  } catch (error) {
    console.error("Error adding comment:", error);
    return Response.json({ error: "Failed to add comment" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const querySnapshot = await getDocs(collection(db, "comments"));
    const comments = [];

    querySnapshot.forEach((doc) => {
      comments.push({ id: doc.id, ...doc.data() });
    });

    return Response.json({ comments });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return Response.json(
      { error: "Failed to fetch comments" },
      { status: 500 }
    );
  }
}
