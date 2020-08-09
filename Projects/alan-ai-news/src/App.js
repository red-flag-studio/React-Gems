import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./Components/NewsCards/NewsCards";
import useStyles from "./Styles";
const ALAN_KEY =
  "a56d647ed7e285d954006626b6eefb772e956eca572e1d8b807a3e2338fdd0dc/stage";

export default function App() {
  const classes = useStyles();
  const [activeArticle, setActiveArticle] = useState(-1);
  const [newsArticles, setNewsArticles] = useState([]);
  useEffect(() => {
    alanBtn({
      key: ALAN_KEY,
      onCommand: ({ command, articles, article }) => {
        switch (command) {
          case "news":
            setNewsArticles(articles);
            setActiveArticle(-1);
            break;
          case "highlight":
            setActiveArticle((prev) => prev + 1);
            break;
        }
      },
    });
  }, []);
  return (
    <div>
      <div className={classes.logoContainer}>
        <img
          src="https://alan.app/voice/images/previews/preview.jpg"
          className={classes.alanLogo}
          alt="Alan Logo"
        />
      </div>
      <NewsCards articles={newsArticles} activeArticle={activeArticle} />
    </div>
  );
}
