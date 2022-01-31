import React from "react";
import './AuditEmployee.css'
import { UserList } from './editUser/userList'
import DeleteUser from "./deleteUser/deleteUser";
import LogoutButton from "../AdminMain/LogoutButton";
import {Link} from "react-router-dom";
import {Grid} from "@material-ui/core";
import * as api from '../../../api';

const { Component } = React;

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected
    }
  }

  setSelected(selected) {
    if (selected !== this.state.selected) {
      this.setState({ selected });
    }
  }

  handleClick(tab) {
    return () => this.setSelected(tab);
  }

  renderTabList(child) {
    let tab = 0;

    // copy tabs children and add new props to each child
    return React.cloneElement(child, {
      // The children of child(TabList & TabPanel)
      children: React.Children.map(child.props.children, (childTab) => {
        // check is the child is Tab
        if (childTab.type.name === "Tab") {
          // if we select the tab, make it active
          const _isActive = (tab === this.state.selected);
          const _onClick = this.handleClick(tab);
          tab++;
          // update Tab's props
          return React.cloneElement(childTab, { _isActive, _onClick })
        }
        return childTab
      }),
    })
  }

  renderChildren(children) {
    let panel = 0;

    // map each children of Tab
    return React.Children.map(children, (child) => {
      // if child is TabList render TabList
      if (child.type.name === "TabList") {
        return this.renderTabList(child)
      }
      // if child is TabPanel make panel selected and then active panel
      // use panel(index) to specify which panel that is active
      if (child.type.name === "TabPanel") {
        const _isActive = (panel === this.state.selected);
        panel++;
        return React.cloneElement(child, { _isActive })
      }
      return child
    })
  }

  render() {
    return (
        <div className="Tabs">
          { this.renderChildren(this.props.children) }
        </div>
    );
  }
}

// create element - TabList(props = children)
const TabList = ({ children }) => (
    <ul className="TabList">
      { children }
    </ul>
);

// create element - Tab(props = _onClick, _isActive, children)
const Tab = ({_onClick, _isActive, children,}) => (
    <li
        className={ `Tab  ${ _isActive ? "is-active" : "" }` }
        onClick={ _onClick }>
      { children }
    </li>
);

// create element - TabPanel(props = _isActive, children)
const TabPanel = ({_isActive, children,}) => (
    <div className={ `TabPanel  ${ _isActive ? "is-active" : "" }` }>
      { children }
    </div>
);

class AuditEmployee extends Component {

  constructor(props) {
    super(props);
    this.state = {
      users: []
    };

    this.getAllEmployeesAndSetState = this.getAllEmployeesAndSetState.bind(this);
  }

  componentDidMount() {
    this.getAllEmployeesAndSetState();
  }

  getAllEmployeesAndSetState() {
    api.getAllEmployees()
        .then(userJson => {
          userJson.map((e) => {
            if (e.isAdmin) {
              e.isAdmin = "Administrator";
            } else {
              e.isAdmin = "Employee";
            }
          });
          for (let user of userJson) {
            user.imgDate = Date.now()
          }
          this.setState({users: userJson});
        });
  }


  render() {
    const { users } = this.state;
    return (
        <div className="Main">
          <Tabs selected={ 0 }>
            <TabList>
              <Tab>
                <div className="Button">Edit User</div>
              </Tab>
              <Tab>
                <div className="Button">Delete User</div>
              </Tab>
            </TabList>

            <TabPanel>
              <UserList users={users} fetchAndUpdateList={this.getAllEmployeesAndSetState}>

              </UserList>
              <Grid container justify="space-evenly" spacing={10} >


                <Grid item xs={3} spacing={6}>
                  <Link to="/adminMain">
                    <LogoutButton content="Back"/>
                  </Link>
                </Grid>

                <Grid item xs={3}>
                  <Link to="/"   onClick={api.logout}>
                    <LogoutButton content="Logout"/>
                  </Link>

                </Grid>

              </Grid>

            </TabPanel>

            <TabPanel>
              <DeleteUser users={users} fetchAndUpdateList={this.getAllEmployeesAndSetState}>
              </DeleteUser>
              <Grid container justify="space-evenly" spacing={10} >


                <Grid item xs={3} spacing={6}>
                  <Link to="/adminMain">
                    <LogoutButton content="Back" />
                  </Link>
                </Grid>

                <Grid item xs={3}>
                  <Link to="/" onClick={api.logout}>
                    <LogoutButton content="Logout" />
                  </Link>
                </Grid>

              </Grid>

            </TabPanel>
          </Tabs>
        </div>
    );
  }
}
export default AuditEmployee;
