import React, { useState } from "react";
import quotes from "./advice.json";
import reLoad from "../Icons/reload.png";
import { Paper } from "@material-ui/core";

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
    <Paper>
      <div
        style={{
          textAlign: "center",
          margin: "50px",
          padding: "15px",
          fontSize: "15px",
        }}
      >
        <p>{quote.message}</p>
        <p>
          <strong>{quote.author}</strong> - {quote.authorProfile}
        </p>
        <img
          src={reLoad}
          alt="새로고침"
          style={{ cursor: "pointer" }}
          onClick={handleClick}
        />
      </div>
    </Paper>
  );
}

export default Quotes;
