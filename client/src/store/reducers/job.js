import * as types from "../actions/types";

const initialState = {
    jobs: [],
    isLoading: false,
    jobCreated: false
}

const reducer = (state=initialState, action) => {
    switch (action.type) {
        case types.GET_JOBS_SUCCESS:
            return {
                ...state,
                jobs: action.jobs,
                isLoading: false
            }
        case types.ADD_JOB_INIT:
            return {
                ...state,
                jobCreated: false
            }
        case types.ADD_JOB_SUCCESS:
            return {
                ...state,
                isLoading: false,
                jobCreated: true
            }
        case types.LOADING:
            return {
                ...state,
                isLoading: true
            }
        case types.ERROR_OCCURED:
            return {
                ...state,
                isLoading: false
            }
        default:
            return state;
    }
}

export default reducer;