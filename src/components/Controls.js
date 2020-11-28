import React, { useState, useEffect } from "react";
import "./styles/controls.css";

function Controls(props) {
  const [amount, setAmount] = useState(10);
  const [inputStyle, setInputStyle] = useState("input");

  useEffect(() => {
    validation();
  }, [amount, props.balance]);

  const validation = () => {
    if (amount > props.balance) {
      setInputStyle("inputError");
      return false;
    }
    if (amount < 0.01) {
      setInputStyle("inputError");
      return false;
    }
    setInputStyle("input");
    return true;
  };

  const amountChange = (e) => {
    setAmount(e.target.value);
  };

  const onBetClick = () => {
    if (validation()) {
      props.betEvent(Math.round(amount * 100) / 100);
    }
  };

  const getControls = () => {
    if (props.gameState === 0) {
      return (
        <div className="controlsContainer">
          <div className="betContainer">
            <h4>Amount:</h4>
            <input
              autoFocus
              type="number"
              value={amount}
              onChange={amountChange}
              className={inputStyle}
            />
          </div>
          <button onClick={() => onBetClick()} className="button">
            Bet
          </button>
        </div>
      );
    } else {
      return (
        <div className="controlsContainer">
          <button
            onClick={() => props.hitEvent()}
            hidden={props.buttonState.hitDisabled}
            className={
              props.buttonState.hitDisabled === true ? "btn-hidden" : "btn"
            }
            style={{
              background: "#3b0e8ddb",
            }}
          >
            Hit
          </button>

          <button
            onClick={() => props.standEvent()}
            hidden={props.buttonState.standDisabled}
            className={
              props.buttonState.standDisabled === true ? "btn-hidden" : "btn"
            }
            style={{
              background: "#3b0e8ddb",
            }}
          >
            <span>Stand</span>
          </button>
          <button
            onClick={() => props.resetEvent()}
            hidden={props.buttonState.resetDisabled}
            className="btn"
            className={
              props.buttonState.resetDisabled === true ? "btn-hidden" : "btn"
            }
            style={{
              background: "#3b0e8ddb",
            }}
          >
            Play Again
          </button>
        </div>
      );
    }
  };

  return <>{getControls()}</>;
}

export default Controls;
