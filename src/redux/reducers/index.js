import { combineReducers } from "redux";
import counterReducers from "./counter";
import isLoggedReducers from "./isLogged";

const allReducers = combineReducers({
    counter: counterReducers,
    isLogged: isLoggedReducers,
});

export default allReducers;
