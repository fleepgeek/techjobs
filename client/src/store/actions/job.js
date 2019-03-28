import axios from "axios";
import * as types from "./types";
// import { GET_JOBS, ADD_JOB, LOADING } from "./types"


export const loading = () => {
    return {
        type: types.LOADING
    }
}

export const getJobsSuccess = (jobs) => {
    return {
        type: types.GET_JOBS_SUCCESS,
        jobs
    }
}

export const errorOccured = (err) => {
    return {
        type: types.ERROR_OCCURED,
        err
    }
}

export const getJobs = () => {
    return (dispatch) => {
        dispatch(loading())
        axios.get("http://localhost:5000/api/jobs")
            .then(res => {
                dispatch(getJobsSuccess(res.data))
            })
            .catch(err => dispatch(errorOccured(err)));
    }
}

export const addJobInit = () => {
    return {
        type: types.ADD_JOB_INIT
    }
}

export const addJob = (jobData) => {
    return dispatch => {
        dispatch(loading());
        axios.post("http://localhost:5000/api/jobs", jobData)
            .then(res => {
                dispatch({ type: types.ADD_JOB_SUCCESS })
            })
            .catch(err => dispatch(errorOccured(err)));
    }
}