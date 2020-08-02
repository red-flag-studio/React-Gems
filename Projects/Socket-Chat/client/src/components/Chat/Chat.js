import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import queryString from "query-string";
import "./Chat.css";

let socket;
export default function Chat({ location }) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const SERVER = "localhost:5000";
  useEffect(() => {
    const { name, room } = queryString.parse(location.search);
    socket = io(SERVER);
    setName(name);
    setRoom(room);
    socket.emit("join", { room, name }, () => {});
    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [location.search, SERVER]);
  return <div>Chat</div>;
}
