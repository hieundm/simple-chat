import React from "react";
import UserOverview from "./UserOverview";
import { Row, Col } from "react-bootstrap";
import "./Chatbox.Friend.css";

const FriendList = () => {
	//const [friends, setFriends] = React.useState(null);

	const init = async () => {};

	const friends = [
		{
			avatarUrl: `data:image/jpeg;base64,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`,
			name: "Trần Minh Anh",
		},
		{
			avatarUrl: `https://previews.123rf.com/images/tverdohlib/tverdohlib1706/tverdohlib170600400/79856821-beauty-pretty-woman-or-cute-girl-with-blue-eyes-and-young-face-skin-posing-among-white-blossoming-fl.jpg`,
			name: "Uyên Nguyễn",
		},
		{
			avatarUrl: `https://i.pinimg.com/originals/5a/21/1e/5a211ed585466597727c493653deb6dc.jpg`,
			name: "Jennie",
		},
	];

	const friendRequests = [
		{
			avatarUrl:
				"https://i.pinimg.com/originals/4a/5b/2e/4a5b2e54af1a42287e7d0af80fdc60c3.jpg",
			name: "Nancy",
		},
		{
			avatarUrl: `https://i.pinimg.com/originals/37/e8/6c/37e86c820cebc8f420e3f88f103fdc08.jpg`,
			name: "Jisoo",
		},
		{
			avatarUrl: `https://image2.tin247.com/pictures/2020/04/24/xrh1587735690.jpg`,
			name: "Lisa",
		},
	];

	return (
		<div className="chat-box__friend messenger__main-body">
			<div className="chat-box__header">Friends</div>
			<div className="chat-box__body">
				<div className="chat-box__friend-request">
					{friendRequests.map((friend, index) => (
						<UserOverview
							key={index}
							avatarUrl={friend.avatarUrl}
							name={friend.name}
							className="chat-box__friend-request-item"
							overviewChild={
								<div className="pl-2">
									<div className="user-overview__name">{friend.name}</div>
									<div className="created-at pt-1">16:04 15/05/2020</div>
									<div className="actions pt-2">
										<button className="button-accept border-rounded">
											Accept
										</button>
										<button className="button-delete border-rounded">
											Delete
										</button>
									</div>
								</div>
							}></UserOverview>
					))}
				</div>
				<div className="chat-box__friend-list">
					{friends.map((friend, index) => (
						<Col md={3} xs={12} className="mb-4">
							<UserOverview
								key={index}
								avatarUrl={friend.avatarUrl}
								name={friend.name}
								className="chat-box__friend-item"
								overviewChild={
									<div className="pl-2">
										<div className="user-overview__name">{friend.name}</div>
										<div className="created-at pt-1">16:04 15/05/2020</div>
									</div>
								}
							/>
						</Col>
					))}
				</div>
			</div>
		</div>
	);
};

export default FriendList;
