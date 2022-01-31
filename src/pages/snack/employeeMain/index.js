import React, { Component } from "react";
import { Link } from "react-router-dom";
import EmployeeMainButton from "./EmployeeMainButton";
import LogoutButton from "./LogoutButton";
import { Logo, BtnGroup, Main, Label, EPanel} from "./employeeMainStyle";
import * as api from "../../../api";

class EmployeeMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
    }
    componentDidMount() {
    }

    render() {
        return (
            <div>
                <Main>
                    <Logo />
                    <Label>Welcome! Employee:</Label>
                    <EPanel>
                        <BtnGroup>
                            <Link to="/order">
                                <EmployeeMainButton content="Order History" />
                            </Link>
                            <Link to="/vote">
                                <EmployeeMainButton content="Vote Snacks" />
                            </Link>
                        </BtnGroup>
                    </EPanel>
                    <Link to="/" onClick={api.logout}>
                        <LogoutButton content="LogOut" />
                    </Link>
                </Main>
            </div>
        );
    }
}

export default EmployeeMain;