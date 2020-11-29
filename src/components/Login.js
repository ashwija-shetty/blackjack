import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from "@fortawesome/free-solid-svg-icons";

import React, { Component } from "react";
import "./styles/hand.css";

export class Login extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };
  render() {
    const { values } = this.props;
    return (
      <div className="login-page">
        <div className="input-field">
          <input
            type="text"
            id="name"
            required
            onChange={this.props.handleChange("name")}
          />
          <label for="name">Your name:</label>
          <span style={{ position: "absolute" }}>
            <FontAwesomeIcon
              /*               style={{ color: "#fd7e14", marginLeft: "-4vh" }}
               */ className={
                this.props.values.name !== "" ? "icon-enabled" : "icon-disabled"
              }
              icon={faArrowCircleRight}
              size="2x"
              onClick={(e) => this.continue(e)}
            ></FontAwesomeIcon>
          </span>
        </div>
        <div style={{ alignItems: "left", textAlign: "left" }}>
          <div className="rule-item">
            <h3>
              <u>Rules of the game:</u>
            </h3>
            <ul
              style={{
                listStyleType: "square",
              }}
            >
              <li>
                The goal of blackjack is to beat the dealer's hand without going
                over 21.
              </li>
              <li>
                Face cards are worth 10. Aces are worth 1 or 11, whichever makes
                a better hand.
              </li>
              <li>
                Player and Dealer starts with two cards, one of the dealer's
                cards is hidden until the player stands
              </li>
              <li>
                To 'Hit' is to ask for another card. To 'Stand' is to hold your
                total and end your turn.
              </li>
              <li>
                If you go over 21 you bust, and the dealer wins regardless of
                the dealer's hand.
              </li>
              <li>
                If you are dealt 21 from the start (Ace and 10), you got a
                blackjack.
              </li>
              <li>
                You win when your hand totals higher than the dealer's hand or
                the dealer busts.
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
