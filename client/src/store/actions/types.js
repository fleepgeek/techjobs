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
export const GET_JOBS = "GET JOBS";
export const GET_JOBS_SUCCESS = "GET JOBS SUCCESS";
export const GET_SINGLE_JOB_SUCCESS = "GET SINGLE JOB SUCCESS";
export const ADD_JOB_INIT = "ADD JOB INIT";
export const ADD_JOB = "ADD JOB";
export const ADD_JOB_SUCCESS = "ADD JOB SUCCESS";
export const LOADING = "LOADING";
export const ERROR_OCCURED = "ERROR_OCCURED";

// AUTH
export const AUTH_START = "AUTH START";
export const AUTH_SUCCESS = "AUTH SUCCESS";
export const AUTH_FAILED = "AUTH FAILED";
export const LOGOUT_SUCCESS = "LOGOUT SUCCESS";
export const TOGGLE_AUTH = "TOGGLE AUTH";
