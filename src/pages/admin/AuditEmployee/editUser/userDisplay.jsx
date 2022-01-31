import React from 'react';
import './userDisplay.style.css'
import { UserEdit } from "./userEdit";
import Popup from 'reactjs-popup';


export const UserDisplay = (props) => {

    return (
//{`http://localhost:4399/api/getUserImg/${props.user.id}?set=set5&size=180x180`}
        //`${props.user.image_url}?set=set5&size=180x180?${props.user.imgDate}`
        <Popup trigger={<div className='user-container'>
            <img alt='user' src= {props.user.image_url} key={props.user.imgDate} width="200px" height="200px" />
            <h2 style={{color: "#ffffff"}}> {props.user.name} </h2>
            <h2 style={{color: "#ffffff"}}> {props.user.email} </h2>
            <h2 style={{color: "#ffffff"}}> {props.user.isAdmin} </h2>
        </div>} modal
               nested>
            {close => (
                <div className="modal" style={{backgroundColor: "#e2dbe2", height: 580, width: 1200}}>
                    <button className="close" onClick={close}>
                            &times;
                    </button>
                    <UserEdit user={props.user} fetchAndUpdateList={props.fetchAndUpdateList} close={close}>
                    </UserEdit>
                </div>
            )}
        </Popup>
    );
};
