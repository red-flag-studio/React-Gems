import { useState, useEffect } from "react";
import { databaseService } from "../firebase/config";
export default function useDatabase(collection) {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const unsub = databaseService
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((snap) => {
        let documents = [];
        snap.forEach((doc) => documents.push({ ...doc.data(), id: doc.id }));
        setDocs(documents);
      });
    return () => unsub();
  }, [collection]);
  return {docs};
}
