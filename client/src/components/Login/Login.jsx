import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { login } from "../../actions/auth.actions";

import styles from "./login.module.css";

const Login = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const navigation = useNavigate();

  if (authData.isAuthenticated) {
    navigation("/");
  }

  const [userCreds, setUserCreds] = useState({
    email: null,
    password: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    login(dispatch, userCreds);
  };

  const handleChange = (event) => {
    setUserCreds((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={`${styles.login} main-card`}>
      <h1 className="text-center">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group m-2">
          <input
            type="text"
            onChange={handleChange}
            name="email"
            className="form-control"
            placeholder="Email"
          />
        </div>

        <div className="form-group m-2">
          <input
            type="password"
            onChange={handleChange}
            name="password"
            className="form-control"
            placeholder="Password"
          />
        </div>

        <button className="btn btn-primary fullSize">Login</button>
      </form>
    </div>
  );
};

export default Login;
