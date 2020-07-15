import React, { useEffect, useState, useContext } from "react";
import UserOverview from "./UserOverview";
import FriendList from "./FriendList";
import { Button, Modal } from "react-bootstrap";
import { SimpleChatContext } from "../../context";
import { base } from "../../helpers/Utils";
import * as config from "../../appsetting.json";
import * as _ from "lodash";

const Message = () => {
	const [content, setContent] = useState("");
	const [messages, updateMessages] = useState([]);
	const [YOUR_ID, SET_YOUR_ID] = useState("");
	const [versionNo, updateVersionNo] = useState(0);
	const [show, setShow] = useState(false);
	const [canShowActionPanel, toggleActionPanel] = useState(false);

	const { socket } = useContext(SimpleChatContext);

	//#region methods

	const handleClose = () => setShow(false);

	const handleSocket = () => {
		socket.on("onReceiveMessage", data => {
			console.log(messages);
			onProcessData(data);
		});

		socket.on("onGetUserId", () => {
			socket.emit("onReceiveUserId", { userId: YOUR_ID });
		});
	};

	const handleShow = () => setShow(true);

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
		<div className="messenger__main-body messenger__message-container">
			<div className="messenger__message-list">
				<div className="messenger__header">
					<div className="title">Chats</div>
					<div className="actions">
						<button
							className="messenger__button"
							title="Add friend"
							onClick={handleShow}>
							<i className="fas fa-user-plus"></i>
						</button>
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
								<div className="user-last-message">What's up, how are you?</div>
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
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FriendList></FriendList>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

export default Message;
