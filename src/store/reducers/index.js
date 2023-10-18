import { combineReducers } from "redux";
import Auth from "./Auth";
import User from "./User";

const rootReducer = combineReducers({
  auth: Auth,
  users: User,
});

export default rootReducer;
