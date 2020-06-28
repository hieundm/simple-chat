exports.messengerInit = (socket, io) => {
  socket.on("change color", (color) => {
    console.log("Color Changed to: ", color);
    io.sockets.emit("change color", color);
  });
};
