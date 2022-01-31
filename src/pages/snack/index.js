import React, { Component } from "react";
import SnackHeader from "./SnackHeader";
import SnackList from "./SnackList";
import { SnackContainer, SnackFooter } from "./style";

import { Provider } from "react-redux";
import store from "./store";
import * as api from "../../api";
import {Link} from "react-router-dom";

class Snack extends Component {

    componentDidMount() {
    }
  render() {
    return (
      <SnackContainer>
        <Provider store={store}>
          <SnackHeader />
          <SnackList />
          <SnackFooter>
                <Link to="/rosterlogin" onClick={api.logout}>back to login</Link>
          </SnackFooter>
        </Provider>
      </SnackContainer>
    );
  }
}

export default Snack;
