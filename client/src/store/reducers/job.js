import * as types from "../actions/actionTypes";

const initialState = {
	jobs: [],
	job: null,
	isLoading: false,
	jobCreated: false,
	error: null
};

/*
Reducers are in charge of updating our app's state (store).
It is a function that takes in the app state and action.
It reads the incoming action's type and updates the state accordingly.
This incoming action could sometimes carry additional payload(data).
This payload could be used to update the state too.
NB: States must be updated immutably. 
This means that you don't directly change or reassign the values in the state.
Instead, you copy the current state, update the relevant properties and then
return this updated copy as the next state.
ES6 spread operator and  ES5 Object.assign() can help you with this or you could
install an immutable library to make this easier.
*/

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case types.GET_JOBS_SUCCESS:
			return {
				...state,
				jobs: action.jobs,
				isLoading: false
			};
		case types.GET_SINGLE_JOB_SUCCESS:
			return {
				...state,
				job: action.job,
				isLoading: false
			};
		case types.ADD_JOB_INIT:
			return {
				...state,
				jobCreated: false,
				error: null
			};
		case types.ADD_JOB_SUCCESS:
			return {
				...state,
				isLoading: false,
				jobCreated: true,
				error: null
			};
		case types.LOADING:
			return {
				...state,
				isLoading: true
			};
		case types.ERROR_OCCURED:
			return {
				...state,
				isLoading: false,
				error: action.error
			};
		default:
			return state;
	}
};

export default reducer;
