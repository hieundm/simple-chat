const socketIO = require("socket.io");
const { messengerInit } = require("./messenger");
const { User } = require("../models/user");

var io;

const createSocketServer = (server) => {
	io = socketIO(server);
	init();
};

const init = () => {
	io.on("connection", (socket) => {
		console.log("User connected");

		socket.emit("onGetUserId");

		socket.on("onReceiveUserId", (data) => {
			console.log(data);
		});

		socket.on("disconnect", () => {
			console.log("user disconnected");
		});

		messengerInit(socket, io);
	});
};

exports.createSocketServer = createSocketServer;

exports.io = io;
