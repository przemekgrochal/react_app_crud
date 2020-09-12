import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";

const rootReducers = combineReducers({
    stateUsers: usersReducer,
});

export default rootReducers;
