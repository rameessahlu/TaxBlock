import { combineReducers } from "redux";
import { reducer as userReducer } from "./users";
import { reducer as loanReducer } from "./loans";

export default combineReducers({ users: userReducer, loans: loanReducer });
