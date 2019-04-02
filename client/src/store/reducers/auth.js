import * as types from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  userId: localStorage.getItem("userId"),
  isLoading: false,
  error: null,
  isLogin: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_START:
      return {
        ...state,
        isLoading: true
      };
    case types.AUTH_SUCCESS:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
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
        isLoading: false,
        error: action.error
      };
    case types.TOGGLE_AUTH:
      return {
        ...state,
        isLogin: !state.isLogin
      };
    default:
      return state;
  }
};

export default reducer;
