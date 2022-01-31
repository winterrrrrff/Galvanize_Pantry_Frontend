import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import './cart.css';
import Popup from "reactjs-popup";
import * as api from "../../../api";
import { connect } from "react-redux";
import { actionCreators } from "../store/snackStore";

class Cart extends Component {
    constructor(props) {
        super();
        this.state = {
            itemList: [],
            errMsg: "",
        };
    }

    componentDidMount() {
        // api.fetchSnacksList()
        //     .then(snackJson => { this.setState({ itemList: snackJson }) })
        this.setState((state, props) => {
            return {itemList: props.cartItems};
        });
    }

    delete=(i)=>{
        const newItems =[...this.state.itemList]
        newItems.splice(i,1);
        this.setState({
            itemList:newItems
        });
        this.props.updateCart(newItems);
    }
    reduceNum(i){
        const newItems =[...this.state.itemList]
        if (newItems[i].count == 1) {
            alert('Cart: cannot reduce it to 0.');
            return;
        }
        newItems[i].count --;
        this.setState({
            itemList:newItems
        })
    }
    addNum(i){
        const newItems =[...this.state.itemList]
        if (newItems[i].count >= newItems[i].quantity) {
            alert('Cart: there is no enough stock in the inventory.');
            newItems[i].count = newItems[i].quantity;
            return;
        }
        newItems[i].count ++;
        this.setState({
            itemList:newItems
        })
    }

    // ref to https://blog.csdn.net/qq_41725450/article/details/86166676
    // currentTime() {
    //     let now = new Date();
    //     let year = now.getFullYear();
    //     let month = now.getMonth() + 1;
    //     let day = now.getDate();
    //     let clock = year + "-";
    //     if (month < 10)
    //         clock += "0";
    //     clock += month + "-";
    //     if (day < 10)
    //         clock += "0";
    //     clock += day + "";
    //     return (clock);
    // }
    // generateOrderId() {
    //     let now = new Date();
    //     let year = now.getFullYear();
    //     let month = now.getMonth() + 1;
    //     let day = now.getDate();
    //     let hh = now.getHours();
    //     let mm = now.getMinutes();
    //     let ss = now.getSeconds();
    //     let clock = year + "";
    //     if(month < 10)
    //         clock += "0";

    //     clock += month + "";

    //     if(day < 10)
    //         clock += "0";

    //     clock += day + "";

    //     if(hh < 10)
    //         clock += "0";

    //     clock += hh + "";
    //     if(mm < 10) clock += '0';
    //     clock += mm + "";

    //     if(ss < 10) clock += '0';
    //     clock += ss;
    //     return(clock);
    // }
    // mysqlDate(date){
    //     date = date || new Date();
    //     return date.toISOString().split('T')[0];
    // }

    render() {
        let total = 0.0;
        this.state.itemList.map((it, index) => {
            total += it.price * it.count;
        })
        return (
            <div className='shoppingCart'>
                <div className='header'>
                    <div>CART</div>
                </div>
                <div className='body'>
                    {
                        this.state.itemList.map((item, key) => (
                            <div className='table'>
                                <div className='images'>
                                    <img src={item.image} alt="" className="cart-img"/>
                                </div>
                                <div className='list'>
                                    <div className='itemname'>{item.name}</div>
                                    <div className='itemprice'>{item.price}</div>
                                    <div className='itemprice'>{item.quantity} left</div>
                                </div>
                                <div className='list_add_remove'>
                                    <button onClick={()=>this.reduceNum(key)}
                                            disabled={item.count ===1}>-</button>
                                    <div className='itemnumber'>{item.count}</div>
                                    <button onClick={()=>this.addNum(key)}>+</button>
                                </div>
                                <div className='list'>
                                    <div className='delete'>
                                        <button class="myButton" onClick={()=>this.delete(key) }>DELETE</button>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
                <div className='footer'>
                    <Link to="/snack">back to shop</Link>
                    <div className='footer_action'>
                        Total price&nbsp;:&nbsp;<span>{total.toFixed(2)}</span>
                    </div>
                    <Popup
                        trigger={<div className='checkout'><div>Checkout</div></div>}
                        modal
                        nested
                    >
                        {close => (
                            <div className="modal">
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="header"> Confirmation </div>
                                <div className="content">
                                    Do you wanna checkout?
                                </div>
                                <div className="actions">

                                    <Route render={({ history}) => (
                                        <button className="button"
                                                onClick={async() => {
                                                    const checkoutSuccessful = await this.checkout();
                                                    if (checkoutSuccessful) {
                                                        this.props.updateCart([]);
                                                        api.logout();
                                                        history.push('/');
                                                    }
                                                    close();
                                                }}>YES</button>
                                    )}/>
                                    <button
                                        className="button"
                                        onClick={() => {
                                            console.log('modal closed ');
                                            close();
                                        }}
                                    >
                                        NO
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        );
    }

    checkout = async() => {
        if (this.state.itemList.length === 0) {
            alert('Please add at least one item into cart.');
            return;
        }
        var newOrderDetailList = [];
        this.state.itemList.map((item, key) => {
            const orderItem = {
                snack_id: item.id,
                quantity: item.count,
                unit_price: item.price,
                total_price: item.price * item.count
            }
            newOrderDetailList = newOrderDetailList.concat(orderItem);
        });
        const newOrder = {
            status: "Pending",
            orderItems: newOrderDetailList,
        }
        // call api and retrieve the response
        return await this.checkOutRequest(newOrder);
    }

    checkOutRequest = async (newOrder) => {
        return await api.pushOrder(newOrder).then((res) => {
            if (res.success) {
                // console.log("success?");
                // this.props.updateCart([]);
                return true;
            } else {
                alert("error: " + res.error.message);
                return false;
            }
        });
    }
}

const mapStateToProps = (state) => {
    return {
        cartItems: state.cart.get("cartItem"),
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCart(items) {
            dispatch(actionCreators.updateCart(items));
        },
    };
};

// export default Cart;
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
