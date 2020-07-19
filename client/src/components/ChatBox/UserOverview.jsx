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

const UserPlaceHolder = () => {
	return (
		<div className="user-overview place-holder">
			<div className="message-item__avatar">
				<div className="rounded-circle image animated-place-holder"></div>
			</div>
			<div className="message-item__content">
				<div className="line animated-place-holder"></div>
				<div className="line animated-place-holder"></div>
			</div>
		</div>
	);
};

UserOverview.propTypes = {
	avatarUrl: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
};

export default UserOverview;

export { UserPlaceHolder };
