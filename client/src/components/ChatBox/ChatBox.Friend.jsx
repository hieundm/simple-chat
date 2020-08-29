import React from "react";
import SearchFriend from "./ChatBox.SearchFriendPanel";
import RequestList from './ChatBox.Friend.RequestList';
import FriendList from './ChatBox.Friend.FriendList';
import { Col } from "react-bootstrap";
import "./ChatBox.Friend.css";

const Friend = () => {
	return (
		<SearchFriend.Provider>
			<div className="chat-box__friend">
				<div className="chat-box__header">
					Friends
				<SearchFriend.ToggleButton></SearchFriend.ToggleButton>
				</div>
				<RequestList></RequestList>
				<div className="chat-box__body">
					<FriendList></FriendList>
				</div>
				<SearchFriend.Modal></SearchFriend.Modal>
			</div>
		</SearchFriend.Provider>
	);
};

export default Friend;
