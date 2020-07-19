import React, { useState, useReducer, useContext } from "react";
import FriendList from "./FriendList";
import { Button, Modal } from "react-bootstrap";
import PropTypes from "prop-types";

const initialState = {
	canShow: false,
};

const SearchFriendPanelContext = React.createContext(initialState);

const reducer = (state, action) => {
	switch (action.type) {
		case "toggle":
			return {
				...state,
				canShow: !state.canShow,
			};
		default:
			return;
	}
};

const action = {
	toggle: (dispatch) => {
		dispatch({
			type: "toggle",
		});
	},
};

const SearchFriendPanel = props => {
	const { state, dispatch } = useContext(SearchFriendPanelContext);

	const handleClose = () => {
		action.toggle(dispatch);
	};

	return (
		<div className="search-friend-panel">
			<Modal show={state.canShow} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Modal heading</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FriendList></FriendList>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
						Close
					</Button>
					<Button variant="primary" onClick={handleClose}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</div>
	);
};

const ToggleButton = params => {
	const { state, dispatch } = useContext(SearchFriendPanelContext);

	return (
		<button
			className="messenger__button"
			title="Add friend"
			onClick={() => action.toggle(dispatch)}>
			<i className="fas fa-user-plus"></i>
		</button>
	);
};

const SearchFriendPanelProvider = props => {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const variable = {
		state,
		dispatch,
	};

	return (
		<SearchFriendPanelContext.Provider value={variable}>
			{props.children}
		</SearchFriendPanelContext.Provider>
	);
};

SearchFriendPanel.propTypes = {};

export default {
	Modal: SearchFriendPanel,
	Context: SearchFriendPanelContext,
	Provider: SearchFriendPanelProvider,
	ToggleButton,
};
