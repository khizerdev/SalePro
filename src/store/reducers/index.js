import { combineReducers } from "redux";
import Auth from "./Auth";
import User from "./User";
import Setting from "./Setting";

const rootReducer = combineReducers({
  auth: Auth,
  users: User,
  setting: Setting,
});

export default rootReducer;
