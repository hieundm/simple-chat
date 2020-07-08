"use strict";
import React from "react";
import "./Loader.css";

const Loader = (props) => {
  if (!props.canShow) {
    return null;
  }

  const style = {
    backgroundColor: "white",
  };

  if (props.color) {
    style.backgroundColor = props.color;
  }

  return (
    <div className="simple-chat-spinner" style={style}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Loader;
