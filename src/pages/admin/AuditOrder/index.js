import React, { Component } from "react";
import {Logo} from "../AdminMain/adminMainStyle";
import {Grid} from "@material-ui/core";
import {Link} from "react-router-dom";
import LogoutButton from "../AdminMain/LogoutButton";
import UserListOrder from "./userListForOrder";
import * as api from "../../../api";

class AuditOrder extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
        };
    }

    // componentDidMount() {
    //     fetch('https://jsonplaceholder.typicode.com/users')
    //         .then(response => response.json())
    //         .then(userJson => { this.setState({ users: userJson }) })
    // }

    componentDidMount() {
        api.getAllEmployees()
            .then(userJson => { this.setState({ users: userJson }) })
    }

    render() {
        const { users } = this.state;
        return (
            <div>
                <main>
                    <Logo />
                    <UserListOrder users = { users }>

                    </UserListOrder>

                    <Grid container justify="space-evenly" spacing={10} >

                        <Grid item xs={3}>
                            <Link to="/adminMain">
                                <LogoutButton content="Back" />
                            </Link>
                        </Grid>

                        <Grid item xs={3}>
                            <Link to="/">
                                <LogoutButton content="Logout" />
                            </Link>
                        </Grid>

                    </Grid>
                </main>
            </div>
        )
    }
}

export default AuditOrder;
