import * as constants from "./constants";
import { fromJS } from "immutable";

const defaultSnackState = fromJS({
  items: [],
  categories: [],
});

export default (state = defaultSnackState, action) => {
  if (action.type === constants.GET_LIST) {
    return state.set("items", action.data);
  }

  if (action.type === constants.GET_CATE) {
    return state.set("categories", action.data);
  }
  return state;
};
