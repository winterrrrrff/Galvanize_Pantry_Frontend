import React, { Component } from "react";

import { LogOutBtn } from "./employeeMainStyle";

class LogoutButton extends Component {
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
            <LogOutBtn
                className={this.state.focused ? "focused" : ""}
                onMouseEnter={this.changeState}
                onMouseLeave={this.changeState}
            >
                {content}
            </LogOutBtn>

        );
    }

    changeState() {
        this.setState((state) => {
            console.log("changed");
            return { focused: !this.state.focused };
        });
    }
}

export default LogoutButton;