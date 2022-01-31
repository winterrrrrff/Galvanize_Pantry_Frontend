import snackReducer from "./snackStore/reducer";
import cartReducer from "./cartStore/reducer";
import searchReducer from "./snackStore/searchReducer";
import { combineReducers } from "redux";

export default combineReducers({
  snack: snackReducer,
  search: searchReducer,
  cart: cartReducer,
});
