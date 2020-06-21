import React from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "signedIn":
      return {
        ...state,
        hasLogged: true,
        displayName: action.payload.displayName,
      };
    default:
      return;
  }
};

const initialState = {
  hasLogged: false,
  displayName: "",
};

const SimpleChatContext = React.createContext(initialState);

function SimpleChatProvider(props) {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <SimpleChatContext.Provider value={{ state, dispatch }}>
      {props.children}
    </SimpleChatContext.Provider>
  );
}
export { SimpleChatContext, SimpleChatProvider };
