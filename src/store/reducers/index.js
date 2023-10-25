import { combineReducers } from "redux";
import Auth from "./Auth";
import User from "./User";
import Setting from "./Setting";
import Project from "./Project";
import Modal from "./Modal";
import Task from "./Task";

const rootReducer = combineReducers({
  auth: Auth,
  users: User,
  setting: Setting,
  projects: Project,
  modal: Modal,
  tasks: Task,
});

export default rootReducer;
