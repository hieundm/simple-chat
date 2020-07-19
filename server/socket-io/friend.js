const FriendRequest = require("../models/friend-request");
const User = require("../models/user");

exports.friendInit = (socket, io) => {
    socket.on("onAskNewRequest", async (email) => {
        let iTotal = 0;

        if (email){
            const user = User.getByEmail(email);

            if (user) {
                iTotal = await FriendRequest.getTotalRequest((await user).id);
            }
        }

        io.sockets.emit("onReceiveTotalNewRequest", iTotal);
    });
};
