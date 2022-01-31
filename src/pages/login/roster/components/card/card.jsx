import React from 'react';
import Popup from 'reactjs-popup';
import { Link } from "react-router-dom";
import './card.style.css'
import * as api from '../../../../../api';


export const Card = (props) => {
    return (
        <div className='card-container'>
            <img alt='employee' src={`${props.employee.image_url}`} width="230px" height="230px" 
            style={ {margin: "auto", display: "block"}}/>
            <h2> {props.employee.name} </h2>
            <p> {props.employee.email} </p>
            <Popup
                trigger={<button className="button"> Select </button>}
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
                    {' '}
                    You are logging in as: 
                    <br />
                    {props.employee.name}
                    <br />
                    {props.employee.email}
                    </div>
                    <div className="actions">

                    {/* <Popup
                        trigger={<button className="button"> Yes </button>}
                        position="top center"
                        nested
                    >
                        <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                        magni omnis delectus nemo, maxime molestiae dolorem numquam
                        mollitia, voluptate ea, accusamus excepturi deleniti ratione
                        sapiente! Laudantium, aperiam doloribus. Odit, aut.
                        </span>
                    </Popup> */}
                      <button
                        className="button"
                        onClick={() => {
                        console.log('modal Yes clicked ');
                        api.rosterLogin(props.employee.id).then(()=>{
                            window.location.href = "/snack"
                        });
                        //close()
                        }}
                    >
                        Yes
                        {/* TODO: pass this employee's info to the next page, which is the snack selection page*/}

                      </button>

                    <button
                        className="button"
                        onClick={() => {
                        console.log('modal No clicked ');
                        close();
                        }}
                    >
                        No
                    </button>
                    </div>
                </div>
                )}
            </Popup>
        </div>
    );
}