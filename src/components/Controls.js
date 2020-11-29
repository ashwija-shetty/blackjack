import React, { useState, useEffect } from "react";
import "./styles/controls.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";

function Controls(props) {
  const [amount, setAmount] = useState(10);
  const [inputStyle, setInputStyle] = useState("input");
  const [betBtnState, disableBtn] = useState(false);

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

  const onBetClick = (e) => {
    if (validation()) {
      disableBtn(true);
      props.betEvent(Math.round(amount * 100) / 100);
    }
  };

  const getControls = () => {
    if (props.gameState === 0) {
      return (
        <div className="controlsContainer">
          <div className="betContainer">
            <h1 style={{ margin: "0 " }}>Bet Amount:</h1>
            <input
              autoFocus
              type="number"
              value={amount}
              onChange={amountChange}
              className={inputStyle}
              style={{ fontSize: "25px" }}
            />
          </div>
          <FontAwesomeIcon
            id="bet"
            icon={faSignInAlt}
            size="4x"
            aria-disabled={betBtnState}
            className={betBtnState === true ? "bet-disable" : "bet-enable"}
            onClick={(e) => onBetClick(e)}
          />
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
              color: "#42a1ec",
            }}
          >
            HIT
          </button>

          <button
            onClick={() => props.standEvent()}
            hidden={props.buttonState.standDisabled}
            className={
              props.buttonState.standDisabled === true ? "btn-hidden" : "btn"
            }
            style={{
              color: "#F44336",
            }}
          >
            STAND
          </button>
          <button
            onClick={() => props.resetEvent()}
            hidden={props.buttonState.resetDisabled}
            className="btn"
            className={
              props.buttonState.resetDisabled === true ? "btn-hidden" : "btn"
            }
            style={{
              color: "#f7e543",
            }}
          >
            PLAY AGAIN
          </button>
        </div>
      );
    }
  };

  return <>{getControls()}</>;
}

export default Controls;
