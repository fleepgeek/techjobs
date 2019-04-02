// import axios from "axios";
import axios from "../../utils/axios-base";
// import { GET_JOBS, ADD_JOB, LOADING } from "./types"; // Another way to import them
import * as types from "./types";

// Actions - These are JS objects that are sent to the reducer with some information.
// These object must have the 'type' property which indicates the type of action.
// It can have additional payload(data) attached to it by adding new properties.
// eg - { type: "GET_USERS" } OR { type: "LOGIN", username: "john", password: "calmdown" }
// When you 'dispatch' an action, you're simply sending it to the reducer.
// The reducer gets the type and/or additional payload and updates the store accordingly.
// NB: Only the reducer can update the store.

// Action Creators - these are simple functions that return an action.

// You: Why do I need them?
// Me: Because of Reusability, my friend.
// Once you've written an action creator once, you could call the method in multiple places.

// You: Isn't that additional boilerplate? I hate my life right now.
// Me: You could dispatch your actions by writing it as an object directly. You must not
// use action creators. What if you want to perform async tasks like usng a middleware like
// thunk? Look at getJobs() and addJob() below. They are both action creators but they return
// a function instead of an action. How would you have done that if not with an action creator.
// Plus, they both use loading() and errorOccured() action creators. If i didn't use that, i
// would have to manually write the same code four different times.
// Besides, there are libraries that help in reducing your boilerplate by generating action creators.
// Imagine if you add 7 more middleware funtions that required you to use this loading()
// and errorOccured() functions at different places. That would be a whole lot of copy
// and pasting.
// Do you still hate your life my friend?

export const loading = () => {
  return {
    type: types.LOADING
  };
};

export const getJobsSuccess = jobs => {
  return {
    type: types.GET_JOBS_SUCCESS,
    jobs
  };
};

export const errorOccured = error => {
  return {
    type: types.ERROR_OCCURED,
    error
  };
};

// This is possible because of the redux-thunk middleware
export const getJobs = () => {
  return dispatch => {
    dispatch(loading());
    axios
      .get("/jobs")
      .then(res => {
        dispatch(getJobsSuccess(res.data));
      })
      .catch(err => dispatch(errorOccured(err)));
  };
};

export const addJobInit = () => {
  return {
    type: types.ADD_JOB_INIT
  };
};

// This is possible because of the redux-thunk middleware
export const addJob = jobData => {
  return dispatch => {
    dispatch(loading());
    axios
      .post("/jobs", jobData)
      .then(res => {
        dispatch({ type: types.ADD_JOB_SUCCESS });
      })
      .catch(err => dispatch(errorOccured(err.response.data)));
  };
};
