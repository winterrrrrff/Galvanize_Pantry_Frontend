import * as constants from "./constants";
import { fromJS } from "immutable";
import axios from "axios";

const api_url = "http://localhost:4399";
// const api_url = "https://mysterious-coast-30450.herokuapp.com";

export const getSnacks = () => {
  return (dispatch) => {
    axios
      .get(api_url + "/api/snacks")
      .then((res) => {
        // console.log("get res: " + JSON.stringify(res));
        const data = res.data.filter((snack)=>{
          return snack.price != null;
        });
        dispatch(listSnack(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const listSnack = (data) => ({
  type: constants.GET_LIST,
  data: fromJS(data),
});

export const getCategories = () => {
  return (dispatch) => {
    axios
      .get(api_url + "/api/categories")
      .then((res) => {
        // console.log("get categories: " + JSON.stringify(res));
        const data = res.data;
        dispatch(listCategories(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

const listCategories = (data) => ({
  type: constants.GET_CATE,
  data: fromJS(data),
});

/*
export const updateVote = (snackid, userid) => {
  console.log("send " + userid);
  const data = { snackid: snackid, userid: userid };
  return (dispatch) => {
    axios
      .post(api_url + "/api/updatevote", data)
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
};
*/

export const getCart = () => ({
  type: constants.LIST_CART
});


export const addToCart = (item) => ({
  type: constants.ADD_TO_CART,
  item: item,
});

export const updateCart = (items) => ({
  type: constants.UPDATE_CART,
  items: items,
});

export const searchByName = (query) => ({
  type: constants.SEARCH_BY_NAME,
  query,
});

export const searchByCategory = (cate) => ({
  type: constants.SEARCH_BY_CATE,
  cate,
});
