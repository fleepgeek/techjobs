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

// Automatically logs in the user when the user visits the page
// but only does that if his/her credentials are still valid
// We call the at the root (App) component.
export const authAutoLogin = () => (dispatch, getState) => {
	const { token, userId } = getState().auth;
	// const token = localStorage.getItem("token");
	// const userId = localStorage.getItem("userId");
	if (!token) {
		dispatch(logout());
	} else {
		dispatch(authSuccess(token, userId));
	}
};
