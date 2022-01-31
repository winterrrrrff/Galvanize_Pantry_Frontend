import React, { Component } from "react";

import { ReportBtn } from "./reportStyle";

class AdminMainButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.changeState = this.changeState.bind(this);
  }

  render() {
    const { content } = this.props;
    return (
      <ReportBtn
        className={this.state.focused ? "focused" : ""}
        onMouseEnter={this.changeState}
        onMouseLeave={this.changeState}
      >
        {content}
      </ReportBtn>
      
    );
  }

  changeState() {
    this.setState((state) => {
      console.log("changed");
      return { focused: !this.state.focused };
    });
  }
}

export default AdminMainButton;
