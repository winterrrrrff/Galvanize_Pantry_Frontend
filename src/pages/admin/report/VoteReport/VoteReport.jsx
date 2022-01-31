import React, { Component } from 'react';

import { Grid, Typography } from '@material-ui/core';
import 'pages/admin/report/report.css'
import { SingleSelect } from 'pages/admin/report/SingleSelect'
import { DisplayTable } from 'pages/admin/report/DisplayTable'
import MultiSelectBox from 'pages/admin/report/MultiSelectBox'
import { Logo } from "pages/admin/report/reportStyle";
import { Link } from "react-router-dom";
import LogoutButton from "pages/admin/AdminMain/LogoutButton";
import Popup from "reactjs-popup";
import * as api from "../../../../api";

const votecolumns = [

  //{ id: 'image', label: 'Image', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'category', label: 'Category', minWidth: 170 },
  { id: 'vote_count', label: 'Vote Count', minWidth: 170 },
  { id: 'vote_status', label: 'Vote Status', minWidth: 170 },

];

class VoteReport extends Component {

  constructor() {
    super();

    this.state = {
      vote_snack: [],
      selected_name: [],
      selected_category: [],
      selected_status: [],
      snack: [],
      category: [],
      table_rows: [],
      table_img:[]
    };
    this.handleGenerateReport = this.handleGenerateReport.bind(this);
  }

  componentDidMount() {
    api.fetchVoteList()
      .then(voteJson => { this.setState({ vote_snack: voteJson }) })
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
    console.log(i)
    return {
      url: i.image_url,
      name: i.name,
      category: i.Category.name,
      vote_count: i.vote_count,
      vote_status: i.status
    }
  }

  createImgRow = (i) => {
    console.log(i)
    return {
      image: i.image_url,
     
    }
  }


  handleGenerateReport = () => {
    let inventory = [];
    let img =[];
    let categories = this.state.selected_category;
    let snacks = this.state.selected_name;
    let status = this.state.selected_status;

    if(categories.length !=0){
       categories = this.state.selected_category.map((item) => item.value.toLowerCase());
    }
    if(snacks.length !=0){
      snacks = this.state.selected_name.map((item) => item.value.toLowerCase());
   }
   if(status.length !=0){
    status = this.state.selected_status.map((item) => item.value.toLowerCase());
 }
    
    // let snacks = this.state.selected_name.map((item) => item.value.toLowerCase());
    // let status = this.state.selected_status.map((item) => item.value.toLowerCase());
    if (categories.length !== 0 && status.length !== 0){
      this.state.vote_snack.forEach(item => {

        if (snacks.includes(item.name.toLowerCase()) || (categories.includes(item.Category.name.toLowerCase()) && status.includes(item.status.toLowerCase()))) {
          inventory.push(this.createInventoryRow(item));
          //img.push(this.createImgRow(item));

        }
      })
    }
    else if(categories.length == 0 && snacks.length == 0 && status.length == 0) {
      inventory = this.state.vote_snack.map(item => this.createInventoryRow(item));
      //img = this.state.vote_snack.map(item => this.createImgRow(item));

    } else{
      this.state.vote_snack.forEach(item => {

        if (categories.includes(item.Category.name.toLowerCase()) || snacks.includes(item.name.toLowerCase()) || status.includes(item.status.toLowerCase())) {
          inventory.push(this.createInventoryRow(item));
          //img.push(this.createImgRow(item));

        }
      })
    }

    // if (status.length > 0) {
    //   //mark
    //   inventory = inventory.filter((item) => status.includes(item.vote_status))
    // }
    console.log(inventory)
    this.setState({ table_rows: inventory })
    //this.setState({ table_img: img })
    if(inventory.length == 0){
      window.alert("No results found!");
    }
  }



  render() {
    return (
      <div className="vote">
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
              Snack Voting
                </Typography>
          </Grid>

        </Grid>


        <Grid container direction="row" justify="center" alignItems="center" spacing={3}>

          <Grid item xs={3}>
            <MultiSelectBox content="Snack Name:" callbackFromParent={(data) => { this.setState({ selected_name: data }) }} options={this.creatSnackOption()} />

          </Grid>
          <Grid item xs={3}>

            <MultiSelectBox content="Snack Category:" callbackFromParent={(data) => { this.setState({ selected_category: data }) }} options={this.creatCateOption()} />
          </Grid>
          <Grid item xs={3}>
            <MultiSelectBox content="Vote Status" callbackFromParent={(data) => { this.setState({ selected_status: data }) }} options={[{ label: 'New', value: 'new' }, { label: 'Existing', value: 'existing' }]} name="select_snack" id="selectSnack" />
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
              * If you do not choose any filter, the report will print all the vote results
                </Typography>
          </Grid>

        </Grid>
        <Grid container direction="column" justify="space-around" alignItems="center" spacing={3}>
          <Grid item xs={3}>

            <div>
              <Popup
                trigger={<div ><div onClick={this.handleGenerateReport} className='ReportButton'>Generate Report</div></div>}
                modal
                nested
              >
                {close => (
                  <div className="modal" style={{ backgroundColor: "rgba(238,238,238, 1)" }}>
                    <button className="close" onClick={close}>
                      &times;
                              </button>
                    <div className="reportheader"> Snack Voting Report </div>

                    <DisplayTable rows={this.state.table_rows} columns={votecolumns} ></DisplayTable>
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
export default VoteReport;
