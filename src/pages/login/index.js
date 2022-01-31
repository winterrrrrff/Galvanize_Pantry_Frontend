import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";

import { Logo, BtnGroup, Main, Label, LoginPanel } from "./loginStyle";
import employeeLogin from "./employee";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  render() {
    return (
      <div>
        <Main>
          <Logo />
          <LoginPanel>
            <Label>Login With:</Label>
            <BtnGroup>
              <Link to="/rosterlogin">
                <LoginButton content="Roster" />
              </Link>
              <Link to="/employeeLogin">
                <LoginButton content="Employee" />
              </Link>
              <Link to="/adminLogin">
                <LoginButton content="Admin" />
              </Link>
            </BtnGroup>
          </LoginPanel>
        </Main>
      </div>
    );
  }
}
export default Login;
