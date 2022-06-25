import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { register } from "../../actions/auth.actions";

import styles from "./register.module.css";

const Register = () => {
  const dispatch = useDispatch();
  const authData = useSelector((state) => state.auth);
  const navigation = useNavigate();

  if (authData.isAuthenticated) {
    navigation("/");
  }

  const [userCreds, setUserCreds] = useState({
    email: null,
    password: null,
    password2: null,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (userCreds.password === userCreds.password2) {
      register(dispatch, userCreds);
    } else {
      console.log("passwords doesn't match");
    }
  };

  const handleChange = (event) => {
    setUserCreds((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <div className={`${styles.login} main-card`}>
      <h1 className="text-center">Register</h1>
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

        <div className="form-group m-2">
          <input
            type="password"
            onChange={handleChange}
            name="password2"
            className="form-control"
            placeholder="Match Password"
          />
        </div>

        <button className="btn btn-primary fullSize">Register</button>
      </form>
    </div>
  );
};

export default Register;
