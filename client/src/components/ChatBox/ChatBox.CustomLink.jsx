import React from "react";
import propTypes from "prop-types";
import { useRouteMatch, Link } from "react-router-dom";

const CustomLink = (props) => {
	const matched = useRouteMatch({
		path: props.to,
		exact: props.activeOnlyWhenExact,
	});

	let className = props.className;

	if (matched) {
		className += " active";
	}

	return (
		<Link to={props.to} className={className} style={props.style}>
			{props.children}
		</Link>
	);
};

CustomLink.defaultProps = {
	activeOnlyWhenExact: false,
};

CustomLink.propTypes = {
	to: propTypes.string.isRequired,
	activeOnlyWhenExact: propTypes.bool,
	children: propTypes.element,
	style: propTypes.object,
};

export default CustomLink;
