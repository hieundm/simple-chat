const socketIO = require("socket.io");
const { messengerInit } = require("./messenger");

var io;

const createSocketServer = (server) => {
  io = socketIO(server);
  init();
};

const init = () => {
  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    messengerInit(socket, io);
  });
};

exports.createSocketServer = createSocketServer;

exports.io = io;
