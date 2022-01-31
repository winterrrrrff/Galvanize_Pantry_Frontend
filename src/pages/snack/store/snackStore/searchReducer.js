import * as constants from "./constants";

// 0 is for all category
const defaultCartState = {
  searchByName: "",
  searchByCate: 0,
};

export default (state = defaultCartState, action) => {
  if (action.type === constants.SEARCH_BY_NAME) {
    return {
      searchByName: action.query,
      searchByCate: state.searchByCate,
    };
  }
  
  if (action.type === constants.SEARCH_BY_CATE) {
    return {
      searchByName: state.searchByName,
      searchByCate: action.cate,
    };
  }

  return state;
};
