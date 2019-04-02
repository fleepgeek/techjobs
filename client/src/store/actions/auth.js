import axios from "../../utils/axios-base";
import * as types from "./types";

export const authStart = () => ({
  type: types.AUTH_START
});

export const authSuccess = (token, userId) => ({
  type: types.AUTH_SUCCESS,
  token,
  userId
});

export const authFailed = error => ({
  type: types.AUTH_FAILED,
  error
});

export const auth = authData => (dispatch, getState) => {
  dispatch(authStart());
  const isLogin = getState().auth.isLogin;
  const endPoint = isLogin ? "auth" : "user";
  axios
    .post("/" + endPoint, authData)
    .then(res => {
      const { token, user } = res.data;
      const userId = user.id;
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId);
      dispatch(authSuccess(token, userId));
    })
    .catch(err => dispatch(authFailed(err.response.data)));
};

export const toggleAuth = () => ({
  type: types.TOGGLE_AUTH
});

export const logout = () => ({
  type: types.LOGOUT_SUCCESS
});
