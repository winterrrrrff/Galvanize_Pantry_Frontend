import React, { Component } from 'react';

import { Grid, Typography } from '@material-ui/core';
import 'pages/admin/report/report.css'
import { DisplayTable } from 'pages/admin/report/DisplayTable'
import MultiSelectBox from 'pages/admin/report/MultiSelectBox'
import { Logo } from "pages/admin/report/reportStyle";
import { Link } from "react-router-dom";
import LogoutButton from "pages/admin/AdminMain/LogoutButton";
import Popup from "reactjs-popup";
import * as api from "../../../../api";



const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "Paid", value: "paid" }

];

const paymentcolumns = [
 // { id: 'pic', label: 'Picture', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'amount', label: 'Amount Summary', minWidth: 170 },


];


class PaymentReport extends Component {

  constructor() {
    super();

    this.state = {
      employee_payment: [],
      selected_employee: [],
      selected_type: [],
      employees: [],
      table_rows: [],
    };

    this.handleGenerateReport = this.handleGenerateReport.bind(this);
  }

  componentDidMount() {
    api.fetchPaymentList()
      .then(paymentJson => { this.setState({ employee_payment: paymentJson }) })
    api.fetchAllEmployeeList()
      .then(userJson => { this.setState({ employees: userJson }) })

  }

  employeeNameOptions() {
    return this.state.employees.map((employee) => {
      return {
        label: employee.name,
        value: employee.name,
      }
    })
  }

  handleGenerateReport() {
    let employees = [];
    let selected_employee = this.state.selected_employee.map(item => item.value.toLowerCase());
    let selected_type = this.state.selected_type.map(item => item.value.toLowerCase());

    this.state.employee_payment.forEach(item => {
      let employee = employees.find(e => e.id === item.Order.User.id && e.status === item.Order.status)
      if (!employee)
        employees.push({ id: item.Order.User.id, name: item.Order.User.name, status: item.Order.status, amount: item.total_price, url: item.Order.User.image_url })
      else
        employee.amount += item.total_price
    })

    let data = [];
    if (selected_employee.length != 0 && selected_type.length != 0){
      employees.forEach(item => {
        if (selected_employee.includes(item.name.toLowerCase()) && selected_type.includes(item.status.toLowerCase())) {
          data.push(item)
        }
      })
    } else if(selected_employee.length == 0 && selected_type.length == 0){
      data = employees
    } else{
      employees.forEach(item => {
        if (selected_employee.includes(item.name.toLowerCase()) || selected_type.includes(item.status.toLowerCase())) {
          data.push(item)
        }
      })
    }
     

    this.setState({ table_rows: data })
    if(data.length == 0){
      window.alert("No results found!");
    }

  }



  render() {
    console.log(this.employeeNameOptions())
    return (
      <div className="payment-report">
        <Grid container justify="flex-end" spacing={10} >


          <Grid item xs={2} spacing={15} >
            <Link to="/">
              <LogoutButton content="Logout" />
            </Link>
          </Grid>

        </Grid>
        <Logo />
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={3}>
          <Grid item xs={5}>
            <Typography variant="h1"
              style={{
                color: "#e6a34b",
                //fontWeight: "bold",
                align_self: "center",
                fontSize: "2rem",
                marginTop: "3rem",
                text_align: "center"
              }}>
              Employee Payment
                </Typography>
          </Grid>

        </Grid>


        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>

          <Grid item xs={3}>
            <MultiSelectBox callbackFromParent={data => this.setState({ selected_employee: data })} content="Employee Name:" options={this.employeeNameOptions()} />

          </Grid>
          <Grid item xs={3}>

            <MultiSelectBox callbackFromParent={data => this.setState({ selected_type: data })} content="Order Status" options={statusOptions} />
          </Grid>

          {/* <Grid item xs={3}> */}

            {/* <MultiSelectBox callbackFromParent={data => this.setState({ selected_type: data })} content="Order Status" options={statusOptions} /> */}
          {/* </Grid> */}

        </Grid>
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h1"
              style={{
                color: "#e6a34b",
                //fontWeight: "bold",
                //align_self: "center",
                fontSize: "15px",
                marginTop: "3rem",
                //text_align: "center"
              }}>
              * If you do not choose any filter, the report will print all the order summaries
                </Typography>
          </Grid>

        </Grid>
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={3}>
          <Grid item xs={3}>

            <div>
              <Popup
                trigger={<div  ><div className='ReportButton' onClick={this.handleGenerateReport}>Generate Report</div></div>}
                modal
                nested
              >
                {close => (
                  <div className="modal" style={{ backgroundColor: "rgba(238,238,238, 1)" }}>
                    <button className="close" onClick={close}>
                      &times;
                              </button>
                    <div className="reportheader"> Employee Payment Report </div>

                    <DisplayTable rows={this.state.table_rows} columns={paymentcolumns}></DisplayTable>
                  </div>
                )}

              </Popup>
            </div>

          </Grid>
          <Grid item xs={3}>


            <Link to="/adminMain">
              <LogoutButton content="Back" />
            </Link>

          </Grid>
        </Grid>

      </div>
    );
  }
}
export default PaymentReport;
