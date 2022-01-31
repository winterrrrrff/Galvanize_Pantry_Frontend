import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

// logins
import Login from "../pages/login";
import EmployeeLogin from "../pages/login/employee";
import AdminLogin from "../pages/login/admin";
import RosterLogin from "../pages/login/roster/RosterLogin";

// employee snack
import Snack from "../pages/snack";
import Order from "../pages/snack/order";
import CartEntry from "../pages/snack/CartEntry";
import Item from "../pages/snack/item";
import EmployeeMain from "../pages/snack/employeeMain";
import Vote from "../pages/snack/vote";

// admin
import Admin from "../pages/admin";
import AdminMain from "../pages/admin/AdminMain";
import Report from "../pages/admin/report";
import AuditEmployee from "../pages/admin/AuditEmployee";
import AuditSnack from "../pages/admin/AuditSnack";
import AuditOrder from "../pages/admin/AuditOrder";
import * as api from "../api";

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/employeelogin" component={EmployeeLogin} />
        <Route path="/adminlogin" component={AdminLogin} />
        <Route path="/rosterlogin" component={RosterLogin} />

        <Route path="/snack" render={()=>{api.verify(false); return <Snack/>}}/>
        <Route path="/order"render={()=>{api.verify(false);return <Order/>}} />
          {/*<Route path="/item"render={()=>{api.verify(false);return <Item/>}} />*/}

        <Route path="/cart"render={()=>{api.verify(false);return <CartEntry/>}} />
        <Route path="/employeeMain"render={()=>{api.verify(false);return <EmployeeMain/>}} />
        <Route path="/vote"render={()=>{api.verify(false);return <Vote/>}} />

        {/*<Route path="/admin"render={()=>{api.verify(false);return <Admin/>}} />*/}
        <Route path="/adminMain"render={()=>{api.verify(true);return <AdminMain/>}} />
        <Route path="/report"render={()=>{api.verify(true);return <Report/>}} />
        <Route path="/auditEmployee"render={()=>{api.verify(true);return <AuditEmployee/>}} />
        <Route path="/auditSnack"render={()=>{api.verify(true);return <AuditSnack/>}} />
        <Route path="/auditOrder"render={()=>{api.verify(true);return <AuditOrder/>}}/>


        <Redirect to={"/"} />
      </Switch>
    );
  }
}

export default Routes;
