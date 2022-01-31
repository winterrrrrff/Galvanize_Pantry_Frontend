import React, { Component } from "react";
import { Link } from "react-router-dom";
import { CardList } from './components/card-list/card-list'
import { SearchBox } from './components/search-box/search-box'
import "./RosterLogin.css";
import { Logo } from "../loginStyle";
import * as api from '../../../api';

class RosterLogin extends Component {

  constructor() {
    super();

    this.state = {
      employees: [],
      searchField: '',
      title: 'Employee Roster',
      isLoading: true
    };
  }

  componentDidMount() {
    // fetch('https://jsonplaceholder.typicode.com/users')
    //   .then(response => response.json())
    //   .then(userJson => { this.setState({ employees: userJson }) })
    api.getAllEmployees()
      .then(userJson => {
        // window.alert(JSON.stringify(userJson));
        this.setState({ 
          employees: userJson, 
          isLoading: false
        })
       })

  }

  handleChange = (e) => {
    this.setState(
      {
        searchField: e.target.value,
        title: e.target.value.length === 0 ? 'Employee Roster' : e.target.value
      }
    );
  }

  render() {
    //https://stackoverflow.com/questions/24718709/reactjs-does-render-get-called-any-time-setstate-is-called
    const { employees, searchField, title, isLoading } = this.state;
    const filterEmployees = employees.filter(employee => {
      return employee.name.toLowerCase().includes(searchField.toLowerCase())
    });

    return (
      <div className="RosterLogin">
        <div className="SearchSection">
          <div className="LogoSection">
          <Logo/>
          </div>
          <div className="Sub-searchSection">
          <h1> {title} </h1>
          <SearchBox
            placeholder={"search name here"}
            handleChange={this.handleChange}>
          </SearchBox>
          <div className="backToMainBtn">
          <Link to="/">Back To Main</Link>
          </div>
          </div>
        </div>

        {isLoading &&
        <div className="loaderContainer">
          <div className="loader">
            </div>
        </div>
        }
        <CardList employees={filterEmployees}>  
        </CardList>
      </div>
    );
  }
}

export default RosterLogin;
