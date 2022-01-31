import React from 'react';
import './OrderList.style.css'
import { Order } from '../Order/Order'

export const OrderList = (props) => {
    return (
        <div className='OrderList'>
            {
                props.orderList.map(order => (
                    <Order key={order.id} order={order}></Order>
                ))
            }
        </div>
    );
}