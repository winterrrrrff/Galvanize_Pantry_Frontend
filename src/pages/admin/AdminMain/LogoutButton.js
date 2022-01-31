import React, { Component } from "react";

import { LogOutBtn } from "./adminMainStyle";

class LogoutButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
    this.changeStateFocus = this.changeStateFocus.bind(this);
    this.changeStateDefocus = this.changeStateDefocus.bind(this);
  }

  render() {
    const { content } = this.props;
    return (
      <LogOutBtn
        className={this.state.focused ? "focused" : ""}
        onMouseEnter={this.changeStateFocus}
        onMouseLeave={this.changeStateDefocus}>
        {content}
      </LogOutBtn>
      
    );
  }

  changeStateFocus() {
    this.setState((state) => {
      console.log("changed");
      return { focused: true };
    });
  }

  changeStateDefocus() {
    this.setState((state) => {
      console.log("changed");
      return { focused: false };
    });
  }
}

export default LogoutButton;
