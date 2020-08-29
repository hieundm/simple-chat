import React, { useEffect, useState } from 'react'
import UserOverview, { UserPlaceHolder } from "./UserOverview";
import { base } from "../../helpers/Utils";
import { Col } from "react-bootstrap";
import _ from "lodash";

function FriendList() {
    const [friends, setFriends] = useState(null);

    const getFriendList = async () => {
        const response = await base.get("/friend/list");

        base.onResponse(response, data => {
            const lstFriend = [];

            if (data.recordCount > 0) {
                data.records.forEach(x => {
                    lstFriend.push(x);
                });

                setFriends(lstFriend);
            }
        });
    };

    useEffect(() => {
        getFriendList();
    }, []);

    if (_.isEmpty(friends) === true) {
        return (
            <div className="chat-box__friend-list">
               {
                    Array.from(Array(8), (d, i) => i).map(x => (
                       <Col key={x} md={12} lg={3} xs={12} className="mb-4">
                           <UserPlaceHolder />
                       </Col>
                   ))
               }
            </div>
        );
    }

    return (
        <div className="chat-box__friend-list">
            {friends.map((friend, index) => (
                <Col key={index} md={12} lg={3} xs={12} className="mb-4">
                    <UserOverview
                        avatarUrl={friend.avatarUrl}
                        name={friend.displayName}
                        className="chat-box__friend-item"
                        overviewChild={
                            <div className="pl-2">
                                <div className="user-overview__name">{friend.displayName}</div>
                                <div className="created-at pt-1">16:04 15/05/2020</div>
                            </div>
                        }
                    />
                </Col>
            ))}
        </div>
    )
}

export default FriendList
