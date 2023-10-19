import { combineReducers } from "redux";
import Auth from "./Auth";
import User from "./User";
import Setting from "./Setting";
import Project from "./Project";

const rootReducer = combineReducers({
  auth: Auth,
  users: User,
  setting: Setting,
  projects: Project,
});

export default rootReducer;
