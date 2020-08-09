import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./Components/NewsCards/NewsCards";
const ALAN_KEY =
  "a56d647ed7e285d954006626b6eefb772e956eca572e1d8b807a3e2338fdd0dc/stage";

export default function App() {
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    alanBtn({
      key: ALAN_KEY,
      onCommand: ({ command, articles }) => {
        switch (command) {
          case "newHeadlines":
            setNewsArticles(articles);
            break;
        }
      },
    });
  }, []);
  return (
    <div>
      <h1>Alan AI News Application</h1>
      <NewsCards articles={newsArticles} />
    </div>
  );
}
