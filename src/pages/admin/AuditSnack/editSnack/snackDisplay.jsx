import React from 'react';
import './snackDisplay.style.css'
import { SnackEdit } from "./snackEdit";
import Popup from 'reactjs-popup';
export const SnackDisplay = (props) => {
    let category = props.category.filter(e => {
        return e.category_id === props.snack.category_id
    })
    if (category.length === 0){
        category = [{name:null}]
    }

            return (
            <Popup trigger={<div className='user-container'>
                <img alt='snack' src={`${props.snack.image_url}?${props.snack.imgDate}`} key={props.snack.imgDate} width="200px" height="200px"/>
                <h2 style={{color: "#ffffff"}}> {props.snack.name} </h2>
                <h2 style={{color: "#ffffff"}}> ID:{props.snack.snack_Id} </h2>
                <h2 style={{color: "#ffffff"}}> Category:{category[0].name} </h2>
        </div>} modal
               nested>
            {close => (
                <div className="modal" style={{backgroundColor: "#e2dbe2", height: 650, width: 1200}}>
                    <button className="close" onClick={close}>
                            &times;
                    </button>
                    <SnackEdit snack={props.snack} category = {props.category} update={props.update} close={close}>

                    </SnackEdit>
                </div>
            )}
        </Popup>
    );
};

