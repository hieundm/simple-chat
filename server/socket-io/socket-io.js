const socketIO = require("socket.io");
const _ = require("lodash");
const { friendInit } = require("./friend");
const { messengerInit } = require("./messenger");
const User = require("../models/user");

var io;

const createSocketServer = (server) => {
	io = socketIO(server);
	init();
};

const onConnected = async(email) => {
	if(_.isEmpty(email) === true){
		return;
	}

	const user = await User.getByEmail(email);

	//console.log(user);
}

const init = () => {
	io.on("connection", (socket) => {
		console.log("User connected");

		onConnected("hieu.nguyen@cooky.vn");

		socket.emit("onGetUserId");

		socket.on("onReceiveUserId", (data) => {
			console.log(data);
		});

		socket.on("disconnect", () => {
			console.log("user disconnected");
		});

		messengerInit(socket, io);

		friendInit(socket, io);
	});
};

exports.createSocketServer = createSocketServer;

exports.io = io;
