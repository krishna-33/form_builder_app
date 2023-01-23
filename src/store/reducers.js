import { combineReducers } from "redux";

import FormReducer from "./forms/reducer";

const rootReducer = combineReducers({
  FormReducer,
});

export default rootReducer;