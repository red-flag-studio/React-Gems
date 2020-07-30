import React from "react";
import useDatabase from "../hooks/useDatabase";

export default function ImageGrid() {
  const { docs } = useDatabase("images");
  return (
    <div className="img-grid">
      {docs &&
        docs.map((doc) => (
          <div className="img-wrap" key={doc.id}>
            <img src={doc.url} alt="uploaded pic" />
          </div>
        ))}
    </div>
  );
}
