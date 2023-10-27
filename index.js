const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
const server = http.createServer(app);
const io = new Server(server, {
  cors: "http://localhost:3000",
});

app.get("/", (req, res) => {
  res.send("Hello you are in and forward hah");
});

io.on("connection", (socket) => {
  console.log("server connected");

  socket.on("test", () => {
    console.log("test");
    socket.emit("message", "incoming from sv.");
  });

  socket.on("beginPath", (arg) => {
    socket.broadcast.emit("beginPath", arg);
  });

  socket.on("drawLine", (arg) => {
    socket.broadcast.emit("drawLine", arg);
  });

  socket.on("changeConfig", (arg) => {
    socket.broadcast.emit("changeConfig", arg);
  });
});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
