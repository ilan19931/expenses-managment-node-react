import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import { setAlert } from "../../actions/ui.actions";
import Alert from "./Alert/Alert";
import "./Alerts.css";

const Alerts = ({ alerts }) => {
  return (
    <div className="Alerts">
      {alerts.length !== 0 &&
        alerts.map((alert) => <Alert key={alert.id} alert={alert} />)}
    </div>
  );
};

export default Alerts;
