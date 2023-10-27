import { combineReducers } from "redux";
import Auth from "./Auth";
import User from "./User";
import Setting from "./Setting";
import Project from "./Project";
import Modal from "./Modal";
import Task from "./Task";
import TaskStatus from "./TaskStatus";

const rootReducer = combineReducers({
  auth: Auth,
  users: User,
  setting: Setting,
  projects: Project,
  modal: Modal,
  tasks: Task,
  taskstatus: TaskStatus,
});

export default rootReducer;
