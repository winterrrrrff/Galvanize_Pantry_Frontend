import React, { Component } from "react";

import { EBtn } from "./employeeMainStyle";

class EmployeeMainButton extends Component {
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
            <EBtn
                className={this.state.focused ? "focused" : ""}
                onMouseEnter={this.changeState}
                onMouseLeave={this.changeState}
            >
                {content}
            </EBtn>

        );
    }

    changeState() {
        this.setState((state) => {
            console.log("changed");
            return { focused: !this.state.focused };
        });
    }
}

export default EmployeeMainButton;
