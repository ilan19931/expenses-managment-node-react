import React from "react";

import "./Alert.css";

const Alert = ({ alert }) => {
  const classes =
    alert.type === "error" ? "Alert AlertError" : "Alert AlertMessage";
  return <div className={classes}>{alert.msg}</div>;
};

export default Alert;
