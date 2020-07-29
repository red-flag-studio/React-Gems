import React, { useState } from "react";

export default function UploadForm() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const changeHandler = (e) => {
    const types = ["image/png", "image/jpeg", "image/jpg"];
    const selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError(null);
    } else {
      setFile(null);
      setError("Please select an image file (png/jpeg/jpg)");
    }
  };
  return (
    <form>
      <input type="file" onChange={changeHandler} />
      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
      </div>
    </form>
  );
}