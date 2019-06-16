import { combineReducers } from "redux";
import gameList from "./game-reducer";

const rootReducer = combineReducers({
  gameList
});

export default rootReducer;
