import { combineReducers } from "redux";
import User from "./User";

const rootReducer = combineReducers({
  user: User,
});

export default rootReducer;
