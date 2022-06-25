import axios from "axios";

import { authActions } from "../redux/slices/auth.slice";
import setAuthToken from "../utils/setAuthToken";
import { setAlert } from "./ui.actions";

export const auth = async (dispatch) => {
  try {
    const res = await axios.get("auth/");
    const { token, user } = res.data;

    dispatch(authActions.login({ token, user }));
  } catch (err) {
    console.log(...err.response.data.errors);
    delete axios.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export const login = async (dispatch, userCreds) => {
  try {
    const res = await axios.post("auth/login", userCreds);

    // create local storage token data
    localStorage.setItem("token", res.data.token);

    setAuthToken(res.data.token);

    dispatch(
      authActions.login({
        user: res.data.user,
        token: res.data.token,
      })
    );
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(...errors);
    localStorage.removeItem("token");

    errors.forEach((err) =>
      setAlert(dispatch, {
        type: "error",
        msg: err.msg,
      })
    );
  }
};

export const register = async (dispatch, userCreds) => {
  try {
    const res = await axios.post("auth/register", userCreds);
    localStorage.setItem("token", res.data.token);

    // create local storage token data
    localStorage.setItem("token", res.data.token);

    setAuthToken(res.data.token);

    dispatch(
      authActions.register({
        user: res.data.user,
        token: res.data.token,
      })
    );

    //show success alert
    setAlert(dispatch, { type: "success", msg: "Account Created!" });
  } catch (err) {
    const errors = err.response.data.errors;
    console.log(...errors);
    localStorage.removeItem("token");

    errors.forEach((err) =>
      setAlert(dispatch, {
        type: "error",
        msg: err.msg,
      })
    );
  }
};

export const logout = (dispatch) => {
  localStorage.removeItem("token");
  dispatch(authActions.logout());
};
