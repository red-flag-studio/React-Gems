import React from "react";

export default function Modal({ src, setSelectedImage }) {
  function handleClick(e) {
    if (e.target.classList.contains("backdrop")) setSelectedImage(null);
  }
  return (
    <div className="backdrop" onClick={handleClick}>
      <img src={src} alt="bigger pic" />
    </div>
  );
}
