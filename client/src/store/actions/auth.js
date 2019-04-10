import axios from "../../utils/axios-base";
import * as types from "./actionTypes";

export const authStart = () => ({
	type: types.AUTH_START
});

export const authSuccess = (token, userId, user) => ({
	type: types.AUTH_SUCCESS,
	token,
	userId,
	user
});

export const authFailed = error => ({
	type: types.AUTH_FAILED,
	error
});

export const auth = authData => (dispatch, getState) => {
	dispatch(authStart());
	const isLogin = getState().auth.isLogin;
	let endPoint = null;
	let formData = null;
	const config = {
		headers: {}
	};
	if (!isLogin) {
		config.headers["Content-Type"] = "multipart/form-data";
		endPoint = "user";
		formData = new FormData();
		formData.append("name", authData.name);
		formData.append("email", authData.email);
		formData.append("password", authData.password);
		formData.append("image", authData.image);
	} else {
		config.headers["Content-Type"] = "application/json";
		endPoint = "auth";
		formData = authData;
	}
	axios
		.post("/" + endPoint, formData, config)
		.then(res => {
			const { token, user } = res.data;
			const userId = user.id;
			localStorage.setItem("token", token);
			localStorage.setItem("userId", userId);
			dispatch(authSuccess(token, userId, user));
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

const loadAuthUserSuccess = user => ({
	type: types.LOAD_AUTH_USER_SUCCESS,
	user
});

export const loadAuthUser = () => (dispatch, getState) => {
	dispatch({ type: types.LOAD_AUTH_USER_START });
	const token = getState().auth.token;
	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};

	// If token, add to headers
	if (token) {
		config.headers["x-access-token"] = token;
	}
	axios
		.get("/auth/user", config)
		.then(res => {
			console.log(res.data);
			dispatch(loadAuthUserSuccess(res.data));
		})
		.catch(error =>
			dispatch({
				type: types.LOAD_AUTH_USER_FAILED,
				error: error.message
			})
		);
};
