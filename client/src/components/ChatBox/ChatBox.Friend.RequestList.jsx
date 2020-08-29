import * as _ from "lodash";
import React, { useEffect, useState } from "react";
import UserOverview, { UserPlaceHolder } from "./UserOverview";
import { base } from "../../helpers/Utils";

function RequestList() {
    const [requestIsLoading, setRequestIsLoading] = useState(true);
    const [friendRequests, setFriendRequests] = useState([]);

    const getRequestList = async () => {
        setRequestIsLoading(true);
        try {
            const response = await base.get("/friend/request/list");

            base.onResponse(response, data => {
                const lstFriendRequest = [];

                if(_.isEmpty(data) === false){
                    data.forEach(x => {
                        lstFriendRequest.push(x);
                    });
                }

                setFriendRequests(lstFriendRequest);
            });
        } finally {
            setRequestIsLoading(false);
        }
    };

    useEffect(() => {
        getRequestList();
    }, []);

    return (
        <div className="chat-box__friend-request">
            {requestIsLoading === false ? (
                friendRequests.map((friend, index) => (
                    <UserOverview
                        key={index}
                        avatarUrl={friend.avatarUrl}
                        name={friend.displayName}
                        className="chat-box__friend-request-item"
                        overviewChild={
                            <div className="pl-2">
                                <div className="user-overview__name">
                                    {friend.displayName}
                                </div>
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
                ))
            ) : (
                    <React.Fragment>
                        <UserPlaceHolder />
                        <UserPlaceHolder />
                        <UserPlaceHolder />
                        <UserPlaceHolder />
                    </React.Fragment>
                )}
        </div>

    )
}

export default RequestList
