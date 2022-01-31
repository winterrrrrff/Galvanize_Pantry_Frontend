import React from 'react';
import './Item.style.css'
import snack1 from 'statics/1.png'
import snack2 from 'statics/2.png'
import snack3 from 'statics/3.png'

const snacks = [
    null, snack1, snack2, snack3
]
export const Item = (props) => {
    let snackImg = snacks[1];
    return (
        <div className='item-container'>
            <img style={{height: 300, width: 280}} alt='item' src={props.item.Snack.image_url} />
            <h2 style={{fontSize: 30}}> {props.item.Snack.name} </h2>
            <h2 style={{fontSize: 30}}> {"$ " +props.item.price} </h2>
            <h2 style={{fontSize: 30}}> {'X ' + props.item.amount} </h2>
        </div>
    );
}