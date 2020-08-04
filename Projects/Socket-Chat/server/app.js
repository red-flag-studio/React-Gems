const express = require("express");
const socketio = require("socket.io");
const http = require("http");

const router = require("./router");
const userService = require("./users");
const PORT = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  let user;
  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = userService.addUser({ id: socket.id, name, room });
    if (error) return callback(error);
    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to the room ${user.room}`,
    });
    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name}, has joined the room`,
    });
    socket.join(user.room);
    io.to(user.room).emit("roomData", {
      room: user.room,
      users: userService.getUsersInRoom(room),
    });
    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = userService.getUser(socket.id);
    io.to(user.room).emit("message", { user: user.name, text: message });
    callback();
  });

  socket.on("disconnect", () => {
    const user = userService.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", {
        user: "admin",
        text: `${user.name} has left`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: userService.getUsersInRoom(user.room),
      });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server started on ${PORT}`));
