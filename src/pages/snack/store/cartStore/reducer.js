import * as constants from "../snackStore/constants";
import { fromJS } from "immutable";

const defaultCartState = fromJS({
  cartItem: [],
});

export default (state = defaultCartState, action) => {
  if (action.type === constants.ADD_TO_CART) {
    const addedId = action.item.id;
    const count = action.item.count;
    let added = false;
    let error = false;
    let curCart = JSON.parse(JSON.stringify(state.get("cartItem")));
    if (curCart.length > 0) {
      curCart.map((it, index) => {
        if (!added && !error && it.id === addedId) {
          if (it.count + count > it.quantity) {
            window.alert('There is no enough product quantity.');
            error = true;
          }
          it.count = it.count + count;
          curCart[index] = it;
          added = true;
        }
      });
    }
    if (error) {
      return state;
    }
    if (!added) {
      curCart = curCart.concat(action.item);
    }
    // console.log('the cart: ' + JSON.stringify(curCart));
    return state.set("cartItem", curCart);
  }

  if (action.type === constants.UPDATE_CART) {
    return state.set("cartItem", action.items);
  }

  return state;
};
