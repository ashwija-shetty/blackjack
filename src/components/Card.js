import React from "react";
import "./styles/card.css";

function Card(props) {
  const getColor = () => {
    if (props.suit === "♠" || props.suit === "♣") {
      return "black";
    } else {
      return "red";
    }
  };

  const getCard = () => {
    if (props.hidden) {
      return <div className="hiddenCard" />;
    } else {
      return (
        <div className="card">
          <div className={getColor()}>
            <h1 className="cardValue">{props.value}</h1>
            <h1 className="suit">{props.suit}</h1>
          </div>
        </div>
      );
    }
  };

  return <>{getCard()}</>;
}

export default Card;
