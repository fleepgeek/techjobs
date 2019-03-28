import { combineReducers } from "redux";

import jobReducer from "./job";

const rootReducer = combineReducers({
    job: jobReducer
})

export default rootReducer;