import React from 'react';
import "./userListForOrder.style.css";
import Popup from "reactjs-popup";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@material-ui/core/Checkbox";
import {DataGrid} from "@material-ui/data-grid";
import * as api from "../../../api";

class UserListOrder extends React.Component {

    constructor(props) {
        super(props);
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
            status: "All"
        };
    }

    // setAll = (e) => {
    //     this.setState({ status: "All" })
    // };
    //
    // setPend = (e) => {
    //     this.setState({ status: "Pending" })
    // };
    //
    // setPaid = (e) => {
    //     this.setState({ status: "Paid" })
    // };
    //
    // getOrderList() {
    //     if(this.state.status === "All"){
    //         return this.state.orderList;
    //     }else if(this.state.status === "Pending"){
    //         return this.state.orderList.filter(order => {return order.status === "Pending"});
    //     }else{
    //         return this.state.orderList.filter(order => {return order.status === "Paid"});
    //     }
    // };

    // fetchOrderList(id) {
    //     api.fetchOrderHistotyForAdmin(id)
    //         .then(orderJson => {
    //             this.setState({ orderList: orderJson });
    //             console.log(orderJson);
    //             return orderJson;
    //         })
    // }

    render() {
        const { orderList } = this.state;
        return (
            <div className="user-list">
                {this.props.users.map(user => (
                    <Popup trigger={<div className='user-container'>
                        <img style={{height: 200, width: 200}} alt='user' src={user.image_url} />
                        <h2 style={{color: "#ffffff"}}> {user.name} </h2>
                        <h2 style={{color: "#ffffff"}}> {user.email} </h2>
                        <h2 style={{color: "#ffffff"}}> {"Employee"} </h2>
                    </div>} modal
                           nested>
                        {close => (
                            <div className="modal" style={{backgroundColor: "#e2dbe2", height: 500, width: 900}}>
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="content" style={{textAlign: "center", fontSize: "2rem",
                                    fontWeight: "bold", color: "rgba(120, 92, 171, 0.7)", padding: "2.5rem"}}>
                                    <TableDisplay key={user.id} orderList = {user.id}>

                                    </TableDisplay>
                                </div>
                            </div>
                        )}
                    </Popup>
                ))
                }
            </div>
        )
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

export default UserListOrder;
