"use strict";
import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import CustomLink from "./ChatBox.CustomLink";
import FriendList from "./ChatBox.Friend";
import Message from "./ChatBox.Message";
import "./Index.css";
import "./Index.device.css";
//http://preview.themeforest.net/item/slek-chat-and-discussion-platform-html5-template/full_screen_preview/24935203
const ChatBox = (_) => {
	const [canShowActionPanel, toggleActionPanel] = React.useState(false);
	const onClickToggleAction = () => {
		toggleActionPanel((prev) => {
			return !prev;
		});
	};

	return (
		<BrowserRouter>
			<div className="messenger__container">
				<div
					className={`messenger__main-action ${
						canShowActionPanel ? "show" : ""
					}`}>
					<i className="messenger__icon fal fa-comment-lines"></i>
					<CustomLink
						to="/messages"
						className="messenger__action-button"
						style={{ marginTop: "30px" }}>
						<i className="fad fa-comments-alt"></i>
					</CustomLink>
					<CustomLink to="/friends" className="messenger__action-button">
						<i className="fad fa-user-friends"></i>
					</CustomLink>
				</div>
				<Switch>
					<Route path="/messages">
						<Message />
					</Route>
					<Route path="/friends">
						<FriendList />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
};

export default ChatBox;
