import React, { Component } from "react";
import Cart from "./cart";

import { Provider } from "react-redux";
import store from "./store";
import { Fragment } from "react";
import * as api from "../../api";

class CartEntry extends Component {
  render() {
    return (
      <Fragment>
        <Provider store={store}>
            <Cart />
        </Provider>
      </Fragment>
    );
  }
}

export default CartEntry;
