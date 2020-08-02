import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import Infobar from "../Infobar/Infobar";
import './Chat.css';
let socket;
export default function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const SERVER = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(SERVER);
    setName(name);
    setRoom(room);
    socket.emit("join", { room, name }, (error) => {
      if (error) alert(error);
    });
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search, SERVER]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);
  return (
    <div className="outerContainer">
      <div className="container">
        <Infobar room={room} />

        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyPress={(event) =>
            event.key === "Enter" ? sendMessage(event) : null
          }
        />
      </div>
    </div>
  );
}
