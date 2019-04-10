// These are just constants to hold the names
// of our action types.
// This is good practise because it helps reduce
// typos and saves you the stress of remembering
// your action type names.
// Just import them and let your text editor help
// you with it intellisense feature.
// Also, this file is a single source of truth for
// all your action type names.
// Want to add a new action type name?
// Just add it here.
//JOB
export const GET_JOBS = "GET_JOBS";
export const GET_JOBS_SUCCESS = "GET_JOBS_SUCCESS";
export const GET_SINGLE_JOB_SUCCESS = "GET_SINGLE_JOB_SUCCESS";
export const ADD_JOB_INIT = "ADD_JOB_INIT";
export const ADD_JOB = "ADD_JOB";
export const ADD_JOB_SUCCESS = "ADD_JOB_SUCCESS";
export const LOADING = "LOADING";
export const ERROR_OCCURED = "ERROR_OCCURED";

// AUTH
export const AUTH_START = "AUTH_START";
export const AUTH_SUCCESS = "AUTH_SUCCESS";
export const AUTH_FAILED = "AUTH_FAILED";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const TOGGLE_AUTH = "TOGGLE_AUTH";
export const LOAD_AUTH_USER_START = "LOAD_AUTH_USER_START";
export const LOAD_AUTH_USER_SUCCESS = "LOAD_AUTH_USER_SUCCESS";
export const LOAD_AUTH_USER_FAILED = "LOAD_AUTH_USER_FAILED";
