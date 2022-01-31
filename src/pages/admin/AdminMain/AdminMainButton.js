import React, { Component } from "react";

import { AdminBtn } from "./adminMainStyle";

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
      <AdminBtn
        className={this.state.focused ? "focused" : ""}
        onMouseEnter={this.changeState}
        onMouseLeave={this.changeState}
      >
        {content}
      </AdminBtn>
      
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
