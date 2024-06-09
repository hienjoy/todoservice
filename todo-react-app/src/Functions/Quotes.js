import React, { useState } from "react";
import quotes from "./advice.json";
import reLoad from "../Icons/reload.png";

function Quotes() {
  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    return quotes[randomIndex];
  };

  const [quote, setQuote] = useState(getRandomQuote());

  const handleClick = () => {
    setQuote(getRandomQuote());
  };

  return (
    <div style={{ textAlign: "center", margin: "50px" }}>
      <h1>명언</h1>
      <p>{quote.message}</p>
      <p>
        <strong>{quote.author}</strong> - {quote.authorProfile}
      </p>
      <img src={reLoad} alt="새로고침" onClick={handleClick} />
    </div>
  );
}

export default Quotes;
