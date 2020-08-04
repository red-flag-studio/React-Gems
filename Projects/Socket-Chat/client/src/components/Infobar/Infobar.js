import React from "react";
import "./Infobar.css";
import closeIcon from "../../icons/closeIcon.png";
import onlineIcon from "../../icons/onlineIcon.png";
export default function Infobar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <img className="onlineIcon" src={onlineIcon} alt="Online" />
        <h3>{room}</h3>
      </div>
      <div className="rightInnerContainer">
        <a href="/">
          <img src={closeIcon} alt="Close" />
        </a>
      </div>
    </div>
  );
}
