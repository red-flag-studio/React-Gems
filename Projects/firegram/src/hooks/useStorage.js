import { useState, useEffect } from "react";
import { storageService, databaseService, timestamp } from "../firebase/config";

export default function useStorage(file) {
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    const storageRef = storageService.ref(file.name);
    const colRef = databaseService.collection("images");
    storageRef.put(file).on(
      "state_changed",
      (snap) => {
        setProgress((snap.bytesTransferred / snap.totalBytes) * 100);
      },
      (err) => {
        setError(err);
      },
      async () => {
        const url = await storageRef.getDownloadURL();
        setUrl(url);
        colRef.add({ url, createdAt: timestamp() });
      }
    );
  }, [file]);

  return { progress, url, error };
}
