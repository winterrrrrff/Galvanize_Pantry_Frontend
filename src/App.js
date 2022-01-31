import React, { Component, Fragment } from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";

import { TopBar } from "./commonStyle";
import GlobalStyle from "./globalStyle";

class App extends Component {
  render() {
    return (
      <Fragment>
        <GlobalStyle />
        <TopBar />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </Fragment>
    );
  }
}

export default App;
