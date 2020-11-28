import React from "react";
import "./styles/hand.css";
import Card from "./Card";

function Hand(props) {
  const getTitle = () => {
    if (props.cards.length > 0) {
      return <h1 className="title">{props.title}</h1>;
    }
  };
  return (
    <div className="handContainer">
      {getTitle()}
      <div className="cardContainer">
        {props.cards.map((card, index) => {
          return (
            <Card
              key={index}
              value={card.value}
              suit={card.suit}
              hidden={card.hidden}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Hand;
