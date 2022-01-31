import React, { Component } from 'react';

import { Grid, Typography } from '@material-ui/core';
import 'pages/admin/report/report.css'
import { EntreQuant } from 'pages/admin/report/QuantTextfield'
import { DisplayTable } from 'pages/admin/report/DisplayTable'
import MultiSelectBox from 'pages/admin/report/MultiSelectBox'
import { Logo } from "pages/admin/report/reportStyle";
import { Link } from "react-router-dom";
import LogoutButton from "pages/admin/AdminMain/LogoutButton";
import Popup from "reactjs-popup";
import * as api from "../../../../api";



const inventorycolumns = [
  //{ id: 'picture', label: 'Picture', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 170 },
  { id: 'quantity', label: 'Quantity', minWidth: 170 },

];

class CurrentInventoryReport extends Component {

  constructor() {
    super();
    this.inputRef = React.createRef();

    this.state = {
      cur_inventory: [],
      categories: [],
      //all the snack name and snack category options
      names: [],
      snack: [],
      category: [],
      selected_name: [],
      selected_category: [],
      table_rows: [],
      quant: 1000000

    };

    this.handleGenerateReport = this.handleGenerateReport.bind(this);
  }

  componentDidMount() {
    // api.fetchAllInventoryList()
    // .then(inventoryJson => { 
    // this.setState({ cur_inventory: inventoryJson }) })
    console.log(this.state.quant);
    api.filterInventoryByQuant(this.state.quant)
    .then(inventoryJson => {
      this.setState({ cur_inventory: inventoryJson })
    })
    
    api.fetchAllCategoryList()
      .then(cateJson => { this.setState({ category: cateJson }) })
    api.fetchAllSnackList()
      .then(snackJson => { this.setState({ snack: snackJson }) })
  }

  creatCateOption = () => {
    return this.state.category.map((c) => {
      let label = c["name"];
      let value = c["name"];

      return { label, value };
    });
  };

  creatSnackOption = () => {
    return this.state.snack.map((s) => {
      let label = s["name"];
      let value = s["name"];

      return { label, value };
    });
  };

  createInventoryRow = (i) => {
    // let picture = i["image_url"];
    // let name = i["name"];
    // let category = i["Category"]["name"];
    // let quantity = i["quantity"];
    let url = i["image"];
    let name = i["name"];
    let category = i["category"];
    let quantity = i["count"];

    return { url, name, category, quantity };
  };

// submitHandler = (e) => {
    
//     // if (this.state.quant<0 || !Number.isInteger(this.state.quant)) {
//     //    if(this.state.quant == null){
//     //     this.setState({ quant: 1000000 })
//     //    }else{
//     //     window.alert("Please type in a valid non-negative number for quantity filter!");
//     //     this.setState({ quant: 1000000 })
        
//     //   }
//     // }
    
//     api.filterInventoryByQuant(this.state.quant)
//       .then(inventoryJson => {
//         this.setState({ cur_inventory: inventoryJson }
//           )
//       })
//   }

  handleGenerateReport = () => {
    let inventory = [];
    let categories = this.state.selected_category.map((item) => item.value.toLowerCase());
    let snacks = this.state.selected_name.map((item) => item.value.toLowerCase());
    if (categories.length !== 0 || snacks.length !== 0)
      this.state.cur_inventory.forEach(item => {
        if (categories.includes(item.category.toLowerCase()) || snacks.includes(item.name.toLowerCase())) {
          inventory.push(this.createInventoryRow(item))
        }
      })
    else { 
      inventory = this.state.cur_inventory.map(item => this.createInventoryRow(item))
    }
    
    if (Number.isInteger(this.state.quant)){
      inventory = inventory.filter(item => item.quantity <= this.state.quant)
      this.setState({ table_rows: inventory })
    }
    // else{
    //   inventory = []
      
    //   }
    if(!Number.isInteger(this.state.quant)){
      this.setState({ table_rows: []})
    }
    if(this.state.quant<0 || !Number.isInteger(this.state.quant)){
      window.alert("Please type in a valid non-negative number for quantity filter!");
    }else if(inventory.length == 0){
      window.alert("No results found!");
    }
    
  }
//quant: parseInt(e.target.value) || '' 
  render() {
    return (
      <div className="current-inventory">
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
              Current Snack Inventory
                </Typography>
          </Grid>

        </Grid>


        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>

          <Grid item xs={3}>
            <MultiSelectBox content="Snack Name:" options={this.creatSnackOption()} callbackFromParent={(data) => { this.setState({ selected_name: data }) }} id="select" />

          </Grid>
          <Grid item xs={3}>

            <MultiSelectBox content="Snack Category:" callbackFromParent={(data) => { this.setState({ selected_category: data }) }} options={this.creatCateOption()} />

          </Grid>
          <Grid item xs={3}>

            <EntreQuant onChange={(e) => { this.setState({ quant: e.target.value === ''? 100000: parseInt(e.target.value) }) }} content="Quantity Less Than:">
            </EntreQuant>
          </Grid>
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
              * If you do not choose any filter, the report will print all the current inventories
                </Typography>
          </Grid>

        </Grid>
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={3}>
          <Grid item xs={3}>
            <div>
            {/* onOpen={() => {this.submitHandler();}} */}
              <Popup 
                trigger={<div ><div  className='ReportButton' onClick={this.handleGenerateReport}>Generate Report</div></div>}
                modal
                nested
                disabled = {this.state.quant<0 || !Number.isInteger(this.state.quant)}
              >
                {close => (
                  <div className="modal" style={{ backgroundColor: "rgba(238,238,238, 1)" }}>
                    <button className="close" onClick={close}>
                      &times;
                              </button>
                    <div className="reportheader" > Current Snack Inventory Report </div>

                    <DisplayTable rows={this.state.table_rows} columns={inventorycolumns}></DisplayTable>
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
export default CurrentInventoryReport;
