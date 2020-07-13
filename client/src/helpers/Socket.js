import socketIOClient from "socket.io-client";
import * as config from "../appsetting.json";

const socket = socketIOClient(config.apiHost);

export default socket;
