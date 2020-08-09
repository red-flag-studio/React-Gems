import React, { useEffect } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const ALAN_KEY =
  "a56d647ed7e285d954006626b6eefb772e956eca572e1d8b807a3e2338fdd0dc/stage";

export default function App() {
  useEffect(() => {
    alanBtn({
      key: ALAN_KEY,
      onCommand: ({ command }) => {
        if (command === "testCommand") alert("test executed");
      },
    });
  }, []);
  return (
    <div>
      <h1>Alan AI News Application</h1>
    </div>
  );
}
