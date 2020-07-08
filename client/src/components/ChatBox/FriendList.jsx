import React from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import Loader from "../Loader";
import { base } from "../../helpers/Utils";
import regex from "../../helpers/Regex";
import { notify } from "../../helpers/Toast";

const FriendList = (_) => {
  const [friends, updateFriend] = React.useState([]);
  const [isEmpty, setIsEmpty] = React.useState(false);
  const [isInvalid, setInvalid] = React.useState(false);
  const [canShow, setCanShow] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");

  const onChangeSearchInput = (event) => {
    const { value } = event.target;

    setSearchText(value);
  };

  const findFriend = async () => {
    try {
      setCanShow(true);

      if (!searchText) {
        setInvalid(true);

        notify.error("Please type the email or phone to continue!!!");

        return false;
      } else {
        setInvalid(false);
      }

      const formData = {};

      if (regex.email.test(searchText) === true) {
        formData["email"] = searchText;
      } else if (regex.phone.test(searchText) === true) {
        formData["phone"] = searchText;
      }

      const response = await base.post("/friend/find", formData);

      base.onResponse(response, (data) => {
        if (data.recordCount > 0) {
          updateFriend(data.records);
          setIsEmpty(false);
        } else {
          setIsEmpty(true);
        }
      });
    } finally {
      setCanShow(false);
    }
  };

  return (
    <React.Fragment>
      <div className="search__input">
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Enter something like email or phone to search"
            isInvalid={isInvalid}
            aria-label="Email or phone"
            aria-describedby="search-input"
            value={searchText}
            onChange={(event) => onChangeSearchInput(event)}
          />
          <InputGroup.Append>
            <Button variant="primary" onClick={findFriend}>
              <i className="fal fa-search"></i>
            </Button>
          </InputGroup.Append>
        </InputGroup>
      </div>
      {isEmpty === false ? (
        <div className="friend__list">
          {friends.map((x, i) => (
            <div key={i} className="friend__item">
              <div className="friend__name">{x.displayName}</div>
              <div className="friend__action">
                <button
                  className="friend__btn-add"
                  title="Click to send friend request."
                >
                  <i className="far fa-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        "No result."
      )}
    </React.Fragment>
  );
};

export default FriendList;
