"use strict";
import React from "react";
import UserOverview from "./UserOverview";
import socketIOClient from "socket.io-client";
import * as config from "../../appsetting.json";
import "./Index.css";
import "./Index.device.css";
//http://preview.themeforest.net/item/slek-chat-and-discussion-platform-html5-template/full_screen_preview/24935203
const ChatBox = (_) => {
  const [canShowActionPanel, toggleActionPanel] = React.useState(false);
  const [color, setColor] = React.useState("white");
  const [socket, setSocket] = React.useState(null);
  const onClickToggleAction = () => {
    toggleActionPanel((prev) => {
      return !prev;
    });
  };

  const send = () => {
    socket.emit("change color", color);
  };

  React.useEffect(() => {
    if (!socket) {
      const _socket = socketIOClient(config.apiHost);
      _socket.on("change color", (col) => {
        document.body.style.setProperty("background-color", col, "important");
      });

      setSocket(_socket);
    }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <button onClick={() => send()}>Change Color</button>

      <button id="blue" onClick={() => setColor("blue")}>
        Blue
      </button>
      <button id="red" onClick={() => setColor("red")}>
        Red
      </button>
    </div>
  );

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
          <div className="another-message message">
            <UserOverview
              avatarUrl="http://slek.laborasyon.com/demos/default/dist/media/img/man_avatar1.jpg"
              name="Townsend Seary"
              className="border-0"
              overviewChild={
                <div className="pl-2">
                  <div className="user-overview__name">Townsend Seary</div>
                  <div className="created-at">16:04 15/05/2020</div>
                </div>
              }
            />
            <div className="content">Hello, i'm Thomas</div>
          </div>
          <div className="your-message message">
            <UserOverview
              avatarUrl="http://slek.laborasyon.com/demos/default/dist/media/img/man_avatar1.jpg"
              name="Townsend Seary"
              className="border-0"
              overviewChild={
                <div className="pl-2">
                  <div className="user-overview__name">Townsend Seary</div>
                  <div className="created-at">16:04 15/05/2020</div>
                </div>
              }
            />
            <div className="content">Hello, i'm Thomas</div>
            <div className="content">Hello, i'm Thomas</div>
            <div className="content">Hello, i'm Thomas</div>
          </div>
        </div>
        <div className="bottom-nav">
          <input type="text" placeholder="Write a message" />
          <button className="messenger__button bg-primary">
            <i className="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
