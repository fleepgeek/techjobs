import * as types from "../actions/actionTypes";

const initialState = {
	token: localStorage.getItem("token"),
	userId: localStorage.getItem("userId"),
	user: null,
	isLoading: false,
	error: null,
	isLogin: true
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.AUTH_START:
		case types.LOAD_AUTH_USER_START:
			return {
				...state,
				isLoading: true
			};
		case types.AUTH_SUCCESS:
			return {
				...state,
				token: action.token,
				userId: action.userId,
				user: action.user,
				isLoading: false,
				isLogin: true,
				error: null
			};
		case types.AUTH_FAILED:
		case types.LOGOUT_SUCCESS:
			localStorage.removeItem("token");
			localStorage.removeItem("userId");
			return {
				...state,
				token: null,
				userId: null,
				user: null,
				isLoading: false,
				error: action.error
			};
		case types.TOGGLE_AUTH:
			return {
				...state,
				isLogin: !state.isLogin
			};
		case types.LOAD_AUTH_USER_SUCCESS:
			return {
				...state,
				user: action.user,
				isLoading: false
			};
		default:
			return state;
	}
};

export default reducer;
