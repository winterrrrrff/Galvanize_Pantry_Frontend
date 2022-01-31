import React from 'react';
import './Order.style.css';
import { Item } from '../Item/Item'

export const Order = (props) => {

    let totalPrice = 0;
    {
        props.order.OrderDetails.map(item => (
            totalPrice += item.price * item.amount
        ));
        totalPrice = totalPrice.toFixed(2);
    }



    return (
        <div className='Info'>
            <h1 style={{fontSize: 30}}> {props.order.createdAt.substring(0, 10)} </h1>
            <h1 style={{fontSize: 30}}> Total Amount: ${totalPrice} </h1>
            <h1 style={{fontSize: 30}}> Status: {props.order.status} </h1>
            <div className='Order'>
            {
                props.order.OrderDetails.map(item => (
                    <Item key={item.snack_id} item={item}></Item>
                ))
            }
         </div>
        </div>
    );
}