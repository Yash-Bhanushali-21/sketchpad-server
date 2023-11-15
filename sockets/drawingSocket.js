//socket configuration for drawing data.

module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("server connected");

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
};
