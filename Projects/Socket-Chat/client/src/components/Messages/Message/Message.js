import React from "react";
import ReactEmoji from "react-emoji";

import "./Message.css";
export default function Message({ message, name }) {
  let isCurrentUser = false;
  const trimName = name.trim().toLowerCase();
  if (message.user === trimName) isCurrentUser = true;
  return isCurrentUser ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{trimName}</p>
      <div className="messageBox backgroundBlue">
        <p className="messageText colorWhite">{ReactEmoji.emojify(message.text)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messageText colorDark">{ReactEmoji.emojify(message.text)}</p>
      </div>
      <p className="sentText">{message.user}</p>
    </div>
  );
}
