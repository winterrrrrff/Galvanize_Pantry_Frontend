import React, { Component } from "react";
import { Link } from "react-router-dom";
import AdminButton from "./AdminMainButton";
import LogoutButton from "./LogoutButton";
import { Logo, BtnGroup, Main, Label, AdminPanel} from "./adminMainStyle";
import * as api from "../../../api";

class AdminMain extends Component {
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
          <Label>Welcome! Admin:</Label>
          <AdminPanel>
            <BtnGroup>
              <Link to="/auditEmployee">
                <AdminButton content="Manage Users" />
              </Link>
              <Link to="/auditOrder">
                <AdminButton content="Manage Order" />
              </Link>
              <Link to="/auditSnack">
                <AdminButton content="Manage Snacks" />
              </Link>
              <Link to="/report">
                <AdminButton content="Generate Report" />
              </Link>
            </BtnGroup>
          </AdminPanel>
          <Link to="/"  onClick={api.logout}>
                <LogoutButton content="Logout" />
          </Link>
        </Main>
      </div>
    );
  }
}

export default AdminMain;
