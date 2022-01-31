import React, { Component } from 'react';

import { Grid, Typography } from '@material-ui/core';
import 'pages/admin/report/report.css'
import { DisplayTable } from 'pages/admin/report/DisplayTable'
import MultiSelectBox from 'pages/admin/report/MultiSelectBox'
import MultiSelect from "react-multi-select-component";
import { Logo } from "pages/admin/report/reportStyle";
import { Link } from "react-router-dom";
import LogoutButton from "pages/admin/AdminMain/LogoutButton";
import ModernDatepicker from 'react-modern-datepicker';
import Popup from "reactjs-popup";
import * as api from "../../../../api";


const stalecolumns = [
  //{ id: 'picture', label: 'Picture', minWidth: 170 },
  { id: 'id', label: 'ID', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 170 },

  {
    id: 'expire_date',
    label: 'Expire date',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
  { id: 'quantity', label: 'Quantity', minWidth: 170 },

];

class StaleInventoryReport extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: this.props.selected,
      startDate: new Date(), // can be any of these ['dayjs()', '', null, new Date(2018,12,1)]
      stale_inventory: [],
        // //all the snack name and snack category options
      snack: [],
      category: [],
      selected_name: [],
      selected_category: [],
      table_rows: [],
    };
    this.handleGenerateReport = this.handleGenerateReport.bind(this);
    // this.handleInputChange= this.handleInputChange(this);
  }




  componentDidMount() {
    api.fetchStaleInventoryList()
      .then(staleInventoryJson => { this.setState({ stale_inventory: staleInventoryJson }) })
    api.fetchAllCategoryList()
      .then(cateJson => { this.setState({ category: cateJson }) })
    api.fetchAllSnackList()
      .then(snackJson => { this.setState({ snack: snackJson }) })
  }

  createInventoryRow = (i) => {
    let url = i["Snack"]["image_url"];
    let id = i["id"];
    let name = i["Snack"]["name"];
    let category = i["Snack"]["Category"]["name"];
    let expire_date = i["expire_date"];
    let quantity = i["quantity"];
    return { url, id, name, category, expire_date, quantity };
  };

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

  handleGenerateReport = () => {
    let inventory = [];
    let categories = this.state.selected_category.map((item) => item.value.toLowerCase());
    let snacks = this.state.selected_name.map((item) => item.value.toLowerCase());

    if (categories.length !== 0 || snacks.length !== 0)
      this.state.stale_inventory.forEach(item => {
 
        if (categories.includes(item.Snack.Category.name.toLowerCase()) || snacks.includes(item.Snack.name.toLowerCase())) {
          inventory.push(this.createInventoryRow(item))
        }
      })
    else {
      inventory = this.state.stale_inventory.map(item => this.createInventoryRow(item))
    }
    if (this.state.startDate)
      inventory = inventory.filter(item => new Date(item.expire_date) <= new Date(this.state.startDate))
    this.setState({ table_rows: inventory })
    if(inventory.length == 0){
      window.alert("No results found!");
    }
  }


  render() {

    return (
      <div className="stale-inventory">
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
              Current Stale Inventory
                </Typography>
          </Grid>

        </Grid>


        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>

          <Grid item xs={3}>
            <MultiSelectBox content="Snack Name:" callbackFromParent={(data) => { this.setState({ selected_name: data }) }} options={this.creatSnackOption()} name="select_snack" id="selectSnack" />
          </Grid>
          <Grid item xs={3}>

            <MultiSelectBox content="Snack Category:"  callbackFromParent={(data) => { this.setState({ selected_category: data }) }} options={this.creatCateOption()} name="select_category" id="selectCate" />

          </Grid>
          <Grid item xs={3} spacing={1}>
            <Typography variant="h4"
              style={{
                color: "#785cab",
                fontWeight: "bold",
                align: "centre",
                fontSize: "14px",
                marginTop: "2rem"
              }}>
              Expire date before:
                </Typography>
            <ModernDatepicker
              date={this.state.startDate}
              format={'YYYY-MM-DD'}
              showBorder
              className="color"
              id="someId"
              name="startDate"

              //maxDate={dayjs().add('1', 'day')} // can be a javascript date object also (new Date(2018,12,12)) #75b1a9
              //minDate={dayjs().subtract('2', 'day')}// can be a javascript date object also (new Date(2018,12,1))  '#d9b44a'
              onChange={date => this.setState({ startDate: date })}
              // onChange={date => this.handleChange("startDate",date)}
              placeholder={'Select a date'}
              primaryColor={'#785cab'}
              secondaryColor={'#e6a34b'}
              primaryTextColor={'#4f6457'}
              secondaryTextColor={'#acd0c0'}
            />
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
              <Popup
                trigger={<div ><div className='ReportButton' onClick={this.handleGenerateReport}>Generate Report</div></div>}
                modal
                nested
              >
                {close => (
                  <div className="modal" >
                    <button className="close" onClick={close}>
                      &times;
                              </button>
                    <div className="reportheader"> Current Stale Inventory Report </div>

                    <DisplayTable rows={this.state.table_rows} columns={stalecolumns}></DisplayTable>
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
export default StaleInventoryReport;
