import { faHome, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Header(props) {
  const hide = props.values.step === 2 ? false : true;
  console.log(props.values.step, hide);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        /* textAlign: "center", */
      }}
    >
      <h1 style={{ textAlign: "center" }}>
        <span id="black">BLACK</span>
        <span id="jack">JACK</span>
      </h1>

      <span hidden={hide} style={{ position: "absolute", right: "0" }}>
        <div className="back-home">
          <FontAwesomeIcon
            size=""
            className="back-home-icon"
            icon={faHome}
            onClick={(e) => props.prevStep(e)}
          />
        </div>
      </span>
    </div>
  );
}

export default Header;
