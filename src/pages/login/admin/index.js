import React, { Component } from "react";
import { Link } from "react-router-dom";
import {BtnGroup, Label, LoginPanel, Logo, Main, AdminLoginRow} from "./adminLoginStyle";
import AdminLoginButton from "./AdminLoginButton";
import * as api from "../../../api";
import {EmployeeLoginRow} from "../employee/employeeLoginStyle";
import EmployeeLoginButton from "../employee/EmployeeLoginButton";
import GoogleLogin from 'react-google-login';

class AdminLogin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            focused: false,
        };
    }
    handleLoginSuccess = googleData =>{
        api.getGoogleID(googleData).then(data => {
            //window.alert("Login Success, id = " + data.id);
            window.location.href="/adminMain";
        }).catch((err) => {});
    }
    handleLoginFailed = async googleData =>{
        window.alert("Login Failed");
    }

    render() {
        return (
            <div>
                <Main>
                    <Logo />
                    <LoginPanel>
                        <Label>Please click here if google login doesn't show up:</Label>
                        <EmployeeLoginRow>
                            <GoogleLogin
                                clientId={"151515184899-oemjj6mkoi036v3spidcpktl2aua7eav.apps.googleusercontent.com"}
                                render={renderProps => (
                                    <Link to="/employeeLogin" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                        <EmployeeLoginButton content="Google Login" /> </Link>
                                )}
                                buttonText="Log in with Google"
                                onSuccess={this.handleLoginSuccess}
                                onFailure={this.handleLoginFailed}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />

                        </EmployeeLoginRow>
                    </LoginPanel>
                </Main>
            </div>
        );
    }

}

export default AdminLogin;
