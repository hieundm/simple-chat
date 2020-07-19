import React, { useEffect, useState, useContext } from "react";
import UserOverview from "./UserOverview";
import { SimpleChatContext } from "../../context";
import SearchFriend from "./ChatBox.SearchFriendPanel";
import { base } from "../../helpers/Utils";
import * as config from "../../appsetting.json";
import * as _ from "lodash";

const Message = () => {
	const [content, setContent] = useState("");
	const [messages, updateMessages] = useState([]);
	const [YOUR_ID, SET_YOUR_ID] = useState("");
	const [versionNo, updateVersionNo] = useState(0);
	const [canShowActionPanel, toggleActionPanel] = useState(false);

	const { socket } = useContext(SimpleChatContext);

	//#region methods

	const handleSocket = () => {
		socket.on("onReceiveMessage", data => {
			console.log(messages);
			onProcessData(data);
		});

		socket.on("onGetUserId", () => {
			socket.emit("onReceiveUserId", { userId: YOUR_ID });
		});
	};

	const onClickToggleAction = () => {
		toggleActionPanel(prev => {
			return !prev;
		});
	};
	const onChangeMessageTextbox = event => {
		const { value } = event.target;

		setContent(value);
	};

	const onClickSend = () => {
		socket.emit("onSendMessage", {
			content: content,
			userId: YOUR_ID,
		});

		setContent("");
	};

	const onProcessData = data => {
		const temp = messages;

		switch (data.userId) {
			case YOUR_ID:
				temp.push({
					content: data.content,
					userId: data.userId,
					isYour: true,
				});

				break;

			default:
				temp.push({
					content: data.content,
					userId: data.userId,
					isYour: false,
				});

				break;
		}

		updateVersionNo(new Date().getTime());

		updateMessages(prev => temp);
	};

	//#endregion

	useEffect(() => {
		if (_.isEmpty(YOUR_ID) === true) {
			const cookie = base.getCookie(config.cookie.userInfo);

			if (_.isEmpty(cookie) === true) {
				return;
			}

			const user = JSON.parse(unescape(atob(cookie)));

			if (_.isNull(user) === true || _.isUndefined(user) === true) {
				return;
			}
		}
	}, [YOUR_ID]);

	useEffect(() => {
		if (socket) {
			handleSocket();
		}
	}, [handleSocket, socket, versionNo]);

	useEffect(() => {
		console.log(messages);
	}, [messages]);

	return (
		<div className="messenger__message-container">
			<SearchFriend.Provider>
				<div className="messenger__message-list">
					<div className="messenger__header">
						<div className="title">Chats</div>
						<div className="actions">
							<SearchFriend.ToggleButton></SearchFriend.ToggleButton>
							<button className="messenger__button" title="New group">
								<i className="fas fa-user-friends"></i>
							</button>
							<button className="messenger__button" title="New chat">
								<i className="fal fa-plus-circle"></i>
							</button>
						</div>
					</div>
					<div className="messenger__body">
						<div className="message-list">
							<div className="message-item">
								<UserOverview
									avatarUrl="http://slek.laborasyon.com/demos/default/dist/media/img/man_avatar1.jpg"
									name="Townsend Seary"
									avatarChild={<div className="user-status active"></div>}
								/>
								<div className="message-item__overview">
									<div className="user-name">Townsend Seary</div>
									<div className="user-last-message">
										What's up, how are you?
									</div>
								</div>
								<div className="message-item__counter-box">
									<div className="new-counter">32</div>
									<div className="last-message-time">16:04 12/05/2020</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="messenger__chat-box">
					<div className="top-nav">
						<UserOverview
							avatarUrl="http://slek.laborasyon.com/demos/default/dist/media/img/man_avatar1.jpg"
							name="Townsend Seary"
							overviewChild={
								<div className="pl-2">
									<div className="user-overview__name">Townsend Seary</div>
									<div className="user-overview__status">online</div>
								</div>
							}
						/>
						<button
							className="messenger__toggle-action-button"
							onClick={onClickToggleAction}>
							<i className="fas fa-bars"></i>
						</button>
					</div>
					<div className="content-pane">
						{messages.map((message, index) => {
							if (message.isYour === true) {
								return (
									<div className="your-message message" key={index}>
										<UserOverview
											avatarUrl="http://slek.laborasyon.com/demos/default/dist/media/img/man_avatar1.jpg"
											name="Townsend Seary"
											className="border-0"
											overviewChild={
												<div className="pl-2">
													<div className="user-overview__name">
														Townsend Seary - {message.userId}
													</div>
													<div className="created-at">16:04 15/05/2020</div>
												</div>
											}
										/>
										<div className="content">{message.content}</div>
									</div>
								);
							}

							return (
								<div className="another-message message" key={index}>
									<UserOverview
										avatarUrl="http://slek.laborasyon.com/demos/default/dist/media/img/man_avatar1.jpg"
										name="Townsend Seary"
										className="border-0"
										overviewChild={
											<div className="pl-2">
												<div className="user-overview__name">
													Townsend Seary - {message.userId}
												</div>
												<div className="created-at">16:04 15/05/2020</div>
											</div>
										}
									/>
									<div className="content">{message.content}</div>
								</div>
							);
						})}
						<div className="bottom-nav">
							<input
								type="text"
								placeholder="Write a message"
								value={content}
								onChange={event => onChangeMessageTextbox(event)}
							/>
							<button
								className="messenger__button bg-primary"
								onClick={onClickSend}>
								<i className="fas fa-paper-plane"></i>
							</button>
						</div>
					</div>
				</div>
				<SearchFriend.Modal></SearchFriend.Modal>
			</SearchFriend.Provider>
		</div>
	);
};

export default Message;
