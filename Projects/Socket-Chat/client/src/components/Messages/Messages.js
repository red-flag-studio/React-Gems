import React from "react";
import ScrollToBottom from "react-scroll-to-bottom";
import Message from "./Message/Message";
import "./Messages.css";
export default function Messages({ messages, name }) {
  return (
    <ScrollToBottom className="messages">
      {messages.map((msg, i) => (
        <div key={i}>
          <Message message={msg} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
}
