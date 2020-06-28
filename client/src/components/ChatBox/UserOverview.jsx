import React from "react";
import { Image } from "react-bootstrap";
import PropTypes from "prop-types";

const UserOverview = ({
  avatarUrl,
  name,
  overviewChild,
  avatarChild,
  className,
}) => {
  return (
    <div className={`user-overview ${className ? className : ""}`}>
      <div className="message-item__avatar">
        <Image roundedCircle className="img-fit" src={avatarUrl} alt={name} />
        {avatarChild ? avatarChild : null}
      </div>
      {overviewChild ? overviewChild : null}
    </div>
  );
};

UserOverview.propTypes = {
  avatarUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default UserOverview;
