import React from "react";
import socket from "./helpers/Socket";

const reducer = (state, action) => {
	switch (action.type) {
		case "signedIn":
			return {
				...state,
				hasLogged: true,
				email: action.payload.email,
				displayName: action.payload.displayName,
			};
		case "updateTotalRequest":
			return {
				...state,
				totalRequest: action.payload
			}
		default:
			return;
	}
};

const initialState = {
	hasLogged: false,
	email: "",
	displayName: "",
	totalRequest: 0
};

const SimpleChatContext = React.createContext(initialState);

function SimpleChatProvider(props) {
	const [state, dispatch] = React.useReducer(reducer, initialState);

	const globalVariable = {
		state,
		dispatch,
		socket,
	};

	return (
		<SimpleChatContext.Provider value={globalVariable}>
			{props.children}
		</SimpleChatContext.Provider>
	);
}
export { SimpleChatContext, SimpleChatProvider };
