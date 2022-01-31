import React, { Component } from "react";
import { Link } from "react-router-dom";
import { OrderList} from "./Components/OrderList/OrderList";
import { Logo, LoginBtn, BtnGroup,EPanel} from "./orderStyle";
import "./orderStyle.css";
import * as api from "../../../api";
import LogoutButton from "../../../pages/admin/AdminMain/LogoutButton";
import {Grid} from "@material-ui/core";
import Popup from "reactjs-popup";
import {DataGrid} from "@material-ui/data-grid";

class Order extends Component {


  constructor() {
    super();

    const lemon_tea = {
      name: "Lemon Tea",
      price: 41,
      amount: 1,
      id: 2
    };

    const chocolate = {
      name: "Pockey Biscuit",
      price: 39,
      amount: 1,
      id: 1
    };

    const chip = {
      name: "Potato Chip",
      price: 19.9,
      amount: 1,
      id: 3
    };

    this.state = {
      orderList: [
        // {date: "2020/04/19", items: [lemon_tea, chocolate, chip], id:1, status: "Pending"},
        // {date: "2021/01/02", items: [chip, chocolate], id:2, status: "Paid"},
        // {date: "2020/01/02", items: [chip, chocolate, lemon_tea, lemon_tea, lemon_tea], id:3, status: "Paid"}
      ],
      title: 'OrderList',
      status: "All",
      currUserId: ""
    };
  }


  componentDidMount() {
    api.fetchOrderHistory().then().catch()
        .then(orderJson => {
          // console.log(orderJson);
          // this.setState({ orderList: orderJson });
          orderJson.map( order => {
            order["OrderDetails"].map( item => {
              let url = item["Snack"]["image_url"];
              let name = item["Snack"]["name"];
            });
          });
          console.log(orderJson);
          let currId = orderJson ? orderJson[0].user_Id : -1;
          if (currId !== -1) {
            console.log("curr user id: " + currId);
            this.setState({currUserId: currId});
          }
          this.setState({ orderList: orderJson });
        });

  }

  
  setAll = (e) => {
    this.setState({ status: "All" })
  }

  setPend = (e) => {
    this.setState({ status: "Pending" })
  }

  setPaid = (e) => {
    this.setState({ status: "Paid" })
  }
  GetOrderList= (e) => {
    if(this.state.status === "All"){
      return this.state.orderList;
    }else if(this.state.status === "Pending"){
      return this.state.orderList.filter(order => {return order.status === "Pending"});
    }else{
      return this.state.orderList.filter(order => {return order.status === "Paid"});
    }
  }

  render() {
    var temp = this.GetOrderList();

    return (
      <div>
        <div>
          <div className="TopSection">
          <Logo />
          <h1 style={{fontSize: 40, color: 'grey', textAlign: 'center', margin: 10}}> Order History </h1>
            <div>

              {/*<EPanel>*/}
              {/*<BtnGroup>*/}
              {/*  <LoginBtn*/}
              {/*      onMouseDown={this.setAll}*/}
              {/*  > <LogoutButton content="All"> </LogoutButton>*/}
              {/*  </LoginBtn>*/}
              {/*  <LoginBtn*/}
              {/*      onMouseDown={this.setPaid}*/}
              {/*  > <LogoutButton content="Paid"> </LogoutButton>*/}
              {/*  </LoginBtn>*/}
              {/*  <LoginBtn*/}
              {/*      onMouseDown={this.setPend}*/}
              {/*  > <LogoutButton content="Pending"></LogoutButton>*/}
              {/*  </LoginBtn>*/}
              {/*<LoginBtn>*/}
              {/*  <Link to="/employeeMain">*/}
              {/*    <LogoutButton content="back to employee main"></LogoutButton>*/}
              {/*  </Link>*/}
              {/*</LoginBtn>*/}
              {/*</BtnGroup>*/}
              {/*</EPanel>*/}
              <div className="container">
                <LoginBtn
                    onMouseDown={this.setAll}
                > <LogoutButton content="All"> </LogoutButton>
                </LoginBtn>
                <LoginBtn
                    onMouseDown={this.setPaid}
                > <LogoutButton content="Paid"> </LogoutButton>
                </LoginBtn>
                <LoginBtn
                    onMouseDown={this.setPend}
                > <LogoutButton content="Pending"></LogoutButton>
                </LoginBtn>
                <Popup trigger={<div className='single-button'>
                  <LoginBtn
                      onMouseDown={this.setPend}
                  > <LogoutButton content="To Pay"></LogoutButton>
                  </LoginBtn>
                </div>} modal
                       nested>
                  {close => (
                      <div className="modal" style={{backgroundColor: "#e2dbe2", height: 500, width: 900}}>
                        <button className="close" onClick={close}>
                          &times;
                        </button>
                        <div className="content" style={{textAlign: "center", fontSize: "2rem",
                          fontWeight: "bold", color: "rgba(120, 92, 171, 0.7)", padding: "2.5rem"}}>
                          <TableDisplay key={this.state.currUserId} orderList = {this.state.currUserId}>

                          </TableDisplay>
                        </div>
                      </div>
                  )}
                </Popup>
                <LoginBtn>
                  <Link to="/employeeMain">
                    <LogoutButton content="Back"></LogoutButton>
                  </Link>
                </LoginBtn>
              </div>
            </div>
          </div>
          <OrderList orderList = {temp}/>
        </div>
          {/*<div className='bobofooter'>*/}
          {/*<Link to="/employeeMain">*/}
          {/*  <LogoutButton content="back to employee main" />*/}
          {/*</Link>*/}
          {/*</div>*/}
      </div>
    );
  }

}

class TableDisplay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userOrder: [],
      rows: [],
      selectedOrders: []
    };

    this.onRowsSelected = this.onRowsSelected.bind(this);
    this.apiFetchDataHelper = this.apiFetchDataHelper.bind(this);
    this.onMarkBtnClicked= this.onMarkBtnClicked.bind(this);
  }

  displayName(eachOrderList) {
    eachOrderList.items.forEach(value => {
      return value.name;
    })
  }

  calculatePrice(eachOrderList) {
    var total = 0;
    eachOrderList.items.forEach(value => {
      total += value.price * value.amount;
    });
    return total;
  }


  componentDidMount() {
    this.apiFetchDataHelper();
    // api.fetchOrderHistotyForAdmin(this.props.orderList)
    //     .then(orderJson => {
    //         // this.setState({ orderList: orderJson });
    //         // console.log(orderJson);
    //         this.setState({ userOrder: orderJson });
    //         // console.log(this.props.orderList);
    //         // console.log(this.state.userOrder);
    //         return orderJson;
    //     })
  }

  apiFetchDataHelper() {
    return api.fetchOrderHistotyForAdmin(this.props.orderList)
        .then(orderJson => {
          // this.setState({ orderList: orderJson });
          // console.log(orderJson);
          this.setState({
            userOrder: orderJson,
            rows: this.getRows(orderJson)
          });
          // console.log(this.props.orderList);
          // console.log(this.state.userOrder);
          return orderJson;
        });
  }

  getRows(userOrder) {
    let retVal = [];
    userOrder.map(order => {
      let temp = {};
      temp["id"] = order.id;
      temp["date"] = order.createdAt.substring(0, 10);
      temp["status"] = order.status;
      let p = 0;
      let i = "";
      order["OrderDetails"].map(s => {
        p += s["price"];
        i += s["Snack"]["name"];
        i += " x";
        i += s["amount"];
        i += " ";
      });
      temp["items"] = i;
      temp["price"] = p;
      retVal.push(temp);
    })
    console.log(retVal);
    return retVal;

  }


  onRowsSelected = currSelectedRow => {
    // console.log(rows);
    const currSelectedOrders = this.state.selectedOrders;
    const selectedOrderId = currSelectedRow.data.id;
    if(currSelectedRow.isSelected) { //if selected
      currSelectedOrders.push(selectedOrderId);
    } else {                         //if deselected
      const index = currSelectedOrders.indexOf(selectedOrderId);
      if (index > -1) {
        currSelectedOrders.splice(index, 1);
      }
    }

    this.setState({
      selectedOrders: currSelectedOrders
    });
    console.log("hello!!! onRowsSelected()");
  };

  onMarkBtnClicked = () => {
    const currSelectedOrderIds = this.state.selectedOrders;
    api.markOrdersAsPaid(currSelectedOrderIds).then(() => {
      this.apiFetchDataHelper();
      console.log(this.state);
      window.location.reload();
    });
    // this.apiFetchDataHelper();
    // console.log(this.state);
  }

  render() {
    const columns = [
      { field: 'id', headerName: 'ID', width: 70, type:'number', sortable: true },
      { field: 'items', headerName: 'Items', width: 300 },
      { field: 'date', headerName: 'Date', width: 130 },
      { field: 'status', headerName: 'Status', width: 130},
      { field: 'price', headerName: 'Price', description: 'total price for all items', type: 'number', width: 90}
    ];

    // const rows = [
    //     { id: 1, items: "Lemon Tea, Pockey Biscuit, Potato Chip", date: "2020/04/19", status: "pending", price: this.calculatePrice(this.props.orderList[0])},
    //     { items: "Potato Chip, Pockey Biscuit", id: 4, date: "2021/01/02", status: "paid", price: this.calculatePrice(this.props.orderList[1])},
    //     { id: 3, items: "Potato Chip, Pockey Biscuit, Lemon Tea x 3", date: "2020/01/02", status: "paid", price: this.calculatePrice(this.props.orderList[2])}
    // ];
    return (
        <div style={{ height: 400, width: '95%' }}>
          <DataGrid rows={this.state.rows} columns={columns} pageSize={5} checkboxSelection
                    onRowSelected={(currSelectedRow) => { this.onRowsSelected(currSelectedRow);}}
          />
          <div style={{display: "flex", justifyContent: "center"}}>
            <button className="mark"
                    style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 20, width: 100}}
                    onClick={() => {this.onMarkBtnClicked()}}>
              Mark as Paid!
            </button>
          </div>
        </div>

    )
  }
}

export default Order;
