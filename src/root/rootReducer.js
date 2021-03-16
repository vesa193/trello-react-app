import { combineReducers } from "redux";
import homeReducer from "../pages/HomePage/reducer";
import profileReducer from "../pages/Profile/reducer";
import commonReducer from "./reducer";

export default combineReducers({
	common: commonReducer,
	home: homeReducer,
	profile: profileReducer
})
