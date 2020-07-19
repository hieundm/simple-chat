const FriendRequestMethods = require("../models/friend-request").Methods;
const UserMethods = require("../models/user").Methods;

exports.friendInit = (socket, io) => {
    socket.on("onAskNewRequest", async (email) => {
        let iTotal = 0;


        console.log('--------------------------');
        console.log(email);
        console.log('--------------------------');

        if (email){
            const user = UserMethods.getByEmail(email);

            if (user) {
                iTotal = await FriendRequestMethods.getTotalRequestByUserId((await user).id);
            }
        }

        io.sockets.emit("onReceiveTotalNewRequest", iTotal);
    });
};
