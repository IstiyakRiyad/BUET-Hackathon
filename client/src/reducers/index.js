import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import searchReducer from "./Search.reducer";

const reducer = combineReducers({
  auth: authReducer,
  search: searchReducer,
});

export default reducer;
