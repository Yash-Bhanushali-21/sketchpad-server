const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.get("/", (req, res) => {
  res.send("Hello you are in and forward hah");
});

io.on("connection", (socket) => {});

server.listen(5000, () => {
  console.log("listening on *:5000");
});
