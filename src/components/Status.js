import { faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { Component } from "react";
import "./styles/status.css";

export class Status extends Component {
  render() {
    return (
      <div className="statusContainer">
        <div className="status">
          <h1 className="value">
            {this.props.playerName}, {this.props.message}
            <FontAwesomeIcon
              size="3x"
              style={{
                paddingLeft: "10vh",
                paddingRight: "1vh",
                color: "#f7e543",
                marginBottom: "-4vh",
              }}
              icon={faCoins}
            />
            <span style={{ paddingRight: "2vh" }}>{this.props.balance}</span>
          </h1>
        </div>
      </div>
    );
  }
}

export default Status;
