import React, { useEffect, useState, useContext } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import { SimpleChatContext } from "../../context";
import { notify, type } from "../../helpers/Toast";
import Content from './ChatBox.Friend.NewRequestContent';
import CustomLink from "./ChatBox.CustomLink";
import Friend from "./ChatBox.Friend";
import MainPage from "./ChatBox.MainPage";
import Message from "./ChatBox.Message";
import "./Index.css";
import "./Index.device.css";
//http://preview.themeforest.net/item/slek-chat-and-discussion-platform-html5-template/full_screen_preview/24935203
const ChatBox = _ => {
	const { state, socket, dispatch } = React.useContext(SimpleChatContext);

	useEffect(() => {
		socket.on('onReceiveNewRequest', data => {
			notify.custom(<Content name={data.displayName} />, {
				autoClose: 5000,
				hideProgressBar: true,
				position: "bottom-left",
				type: type.DEFAULT,
			});
		});

		socket.emit("onSendedNewRequest", "cordelia_storment@aol.com");
	}, []);

	return (
		<BrowserRouter>
			<div className="messenger__container">
				<div
					className={`messenger__main-action`}>
					<CustomLink
						to="/"
						className="messenger__action-button"
						style={{ marginTop: "0" }}>
						<i className="messenger__icon fal fa-comment-lines"></i>
					</CustomLink>
					<CustomLink
						to="/messages"
						className="messenger__action-button"
						style={{ marginTop: "30px" }}>
						<i className="fad fa-comments-alt"></i>
					</CustomLink>
					<CustomLink to="/friends" className="messenger__action-button">
						<React.Fragment>
							<i className="fad fa-user-friends"></i>
							{state.totalRequest > 0 && (
								<div className="messenger__total-request-bubble">
									{state.totalRequest}
								</div>
							)}
						</React.Fragment>
					</CustomLink>
				</div>
				<div className="messenger__main-body">
					<Switch>
						<Route exact path="/">
							<MainPage />
						</Route>
						<Route path="/messages">
							<Message />
						</Route>
						<Route path="/friends">
							<Friend />
						</Route>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
};

export default ChatBox;
