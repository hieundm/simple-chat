import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { base } from "../../helpers/Utils";
import { notify } from "../../helpers/Toast";

const FriendList = (_) => {
  const [friends, updateFriend] = React.useState([]);

  const findFriend = async () => {
    const response = await base.post("/friend/find", {
      email: "hieu.nguyen@cooky.vn",
    });

    base.onResponse(response, (data) => {
      console.log(data);
    });
  };

  return (
    <React.Fragment>
      <div className="search__input">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter something like email or phone to search"
            aria-label="Email or phone"
            aria-describedby="search-input"
          />
          <InputGroup.Append>
            <Button variant="primary" onClick={findFriend}>
              <i className="fal fa-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      <div className="friend__list">
        <div className="friend__item">abc</div>
      </div>
    </React.Fragment>
  );
};

export default FriendList;
