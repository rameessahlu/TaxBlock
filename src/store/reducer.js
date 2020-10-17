import { combineReducers } from "redux";
import reducer from "./entities";
import { reducer as authReducer } from "./auth";

export default combineReducers({ entities: reducer, auth: authReducer });
