exports.messengerInit = (socket, io) => {
  socket.on("onSendMessage", (data) => {
    console.log("Message: ", data);
    io.sockets.emit("onReceiveMessage", data);
  });
};
