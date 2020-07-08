"use strict";
import React from "react";
import UserOverview from "./UserOverview";
import FriendList from "./FriendList";
import socketIOClient from "socket.io-client";
import * as config from "../../appsetting.json";
import { Button, Modal } from "react-bootstrap";
import "./Index.css";
import "./Index.device.css";
//http://preview.themeforest.net/item/slek-chat-and-discussion-platform-html5-template/full_screen_preview/24935203
const ChatBox = (_) => {
  const [canShowActionPanel, toggleActionPanel] = React.useState(false);
  const [content, setContent] = React.useState("");
  const [messages, updateMessages] = React.useState([]);
  const [socket, setSocket] = React.useState(null);
  const [YOUR_ID, SET_YOUR_ID] = React.useState(Math.floor(Math.random() * 10));
  const [versionNo, updateVersionNo] = React.useState(0);
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  const onClickToggleAction = () => {
    toggleActionPanel((prev) => {
      return !prev;
    });
  };

  const onChangeMessageTextbox = (event) => {
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

  const onProcessData = (data) => {
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

    updateMessages((prev) => temp);
  };

  React.useEffect(() => {
    if (!socket) {
      const _socket = socketIOClient(config.apiHost);
      _socket.on("onReceiveMessage", (data) => {
        console.log(messages);
        onProcessData(data);
      });

      setSocket(_socket);
    }
  }, [versionNo]);

  React.useEffect(() => {
    console.log(messages);
  }, [messages]);

  return (
    <div className="messenger__container">
      <div
        className={`messenger__main-action ${canShowActionPanel ? "show" : ""}`}
      >
        <i className="messenger__icon fal fa-comment-lines"></i>
        <button
          className="messenger__close-button"
          onClick={onClickToggleAction}
        >
          Close
        </button>
      </div>
      <div className="messenger__message-list">
        <div className="messenger__header">
          <div className="title">Chats</div>
          <div className="actions">
            <button
              className="messenger__button"
              title="Add friend"
              onClick={handleShow}
            >
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
            onClick={onClickToggleAction}
          >
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
              onChange={(event) => onChangeMessageTextbox(event)}
            />
            <button
              className="messenger__button bg-primary"
              onClick={onClickSend}
            >
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

export default ChatBox;
