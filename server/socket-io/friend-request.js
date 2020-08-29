const AutoMapper = require("../AutoMapper");
const User = require("../models/user");

exports.friendRequestInit = (socket, io) => {
    socket.on("onSendedNewRequest", async (email) => {
        if (!email) {
           return false;
        }

        const sender = await User.getByEmail(email);

        if (!sender) {
            return false;
        }
        
        io.sockets.emit("onReceiveNewRequest", AutoMapper(sender, 'friend-request'));
    });
};
