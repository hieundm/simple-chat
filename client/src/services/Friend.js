export default {
    getTotalRequest: async ({ socket, dispatch, email }) => {
        socket.emit("onAskNewRequest", email);

        socket.on("onReceiveTotalNewRequest", data => {
            dispatch({
                type: "updateTotalRequest",
                payload: data,
            });
        });
    }
}