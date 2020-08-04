import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import Infobar from "../Infobar/Infobar";
import Input from "../Input/Input";
import "./Chat.css";
import Messages from "../Messages/Messages";
import TextContainer from "../TextContainer/TextContainer";
let socket;
export default function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
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
    socket.on("roomData", ({ room, users }) => {
      setUsers(users);
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
        <Messages messages={messages} name={name} />
        <Input
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
        />
      </div>
      <TextContainer users={users} />
    </div>
  );
}
