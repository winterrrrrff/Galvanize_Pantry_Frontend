import React, { Component } from "react";
import { Link } from "react-router-dom";
import './vote.css';
import Popup from "reactjs-popup";
import * as api from "../../../api"
import axios from "axios";
class Vote extends Component {
    constructor(props) {
        super();
        this.state = {itemList: [
            ]};
    }

    componentDidMount() {
        api.fetchSnacksList().then(
            snackItems => {this.setState({itemList:snackItems})}
        )
    }

    addNum(i){
        const newItems =[...this.state.itemList]
        newItems[i].vote = true;
        this.setState({
            itemList:newItems
        })
        // close();
    }



    // readyName(){
    //     window.onload = function(){
    //         var newName = document.getElementById("newSnackName").value;
    //         var newCategory = document.getElementById("newSnackName");
    //         return newName.value;
    //     }
    // }
    success() {
        if(document.getElementById("newSnackName").value==="") {
            document.getElementById('voteNew').disabled = true;
        } else {
            document.getElementById('voteNew').disabled = false;
        }
    }

    render() {
        return (
            <div className='shoppingCart'>
                <div className='header'>
                    <div>VOTE</div>
                </div>
                <div className='body'>
                    {
                        this.state.itemList.map((item, key) => (
                            <div className='table'>
                                <div className='images'>
                                    <img src={item.image_url} alt="" className="cart-img"/>
                                </div>
                                <div className='list'>
                                    <div className='itemname'>{item.name}</div>
                                    <div className='itemprice'>{item.price}</div>
                                </div>
                                <div className='list'>
                                    <Popup
                                        trigger={<div className='delete'>
                                            <button className="myButton"
                                            >VOTE</button></div>}
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
                                                    You are going to vote <div className='itemname'>{item.name}</div>
                                                    <br />
                                                    If you click on YES, you will vote successfully.
                                                </div>
                                                <div className="actions">
                                                    {/*<Link to="/employeeMain">*/}
                                                    <button className="button"
                                                            onClick={() =>{
                                                        const newItems =[...this.state.itemList]
                                                        newItems[key].vote_count +=1;
                                                        this.setState({
                                                            itemList:newItems})
                                                        const updatedVote = {
                                                            snack_Id:newItems[key].snack_Id,
                                                            vote_count:newItems[key].vote_count
                                                        }
                                                        console.log(updatedVote);
                                                        api.updateVoteCount(updatedVote);
                                                        close();
                                                    }}>YES
                                                    </button>
                                                    {/*<button onClick={() => this.addNum(key)}>YES*/}
                                                    {/*</button>*/}
                                                    {/*</Link>*/}
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
                                    {/*<div className='delete'>*/}
                                    {/*    <button class="myButton" onClick={()=>this.addNum(key) }>VOTE</button>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                        ))
                    }
                    <div className='table'>
                        <div className='list'>
                            <div className='itemname'>Vote for your new recommendation!</div>
                            <div className='itemname'>
                                <textarea class="input" id="newSnackName" onKeyUp={()=>{
                                    if(this.value==="") {
                                        document.getElementById('voteNew').disabled = true;
                                    } else {
                                        document.getElementById('voteNew').disabled = false;
                                    }
                                }}
                                placeholder="Enter your snack..."/>
                                {/*let newName = document.getElementById("newSnackName").value*/}
                                {/*console.log(newName);*/}
                            </div>
                        </div>
                        <div className='list'>
                            <div className='itemname'>Select your snack category:</div>
                        <select className='select_cate' id="test_select">
                            <option value="">---please select---</option>
                            <option value="1">Biscuits</option>
                            <option value="2">Chips</option>
                            <option value="3">Crackers</option>
                            <option value="4">Jerkies</option>
                            <option value="5">Nuts</option>
                            <option value="6">Popcorn</option>
                            <option value="7">Energy Bar</option>
                            <option value="8">Candies</option>
                            <option value="9">Beverages</option>
                            <option value="10">Dairy</option>

                        </select>
                        </div>
                        <Popup
                            trigger={<div className='delete'>
                                <button className="myButton" id="voteNew"
                                        // onClick={()=>{
                                        //    if (document.getElementById('newSnackName').value.length) {
                                        //        return
                                        //    }
                                        // }}
                                        disabled>
                                    VOTE</button></div>}
                            modal
                            nested
                        >
                            {
                                (close) => (
                                <div className="modal">
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="header"> Confirmation </div>
                                    <div className="content">
                                        {' '}
                                        Are you going to vote? <div className='itemname'>
                                        {/*{*/}
                                        {/*    newName = document.getElementById("newSnackName").value*/}
                                        {/*}*/}
                                    </div>
                                        <br />
                                        If you click on YES, you will vote successfully.
                                    </div>
                                    <div className="actions">
                                        {/*<Link to="/employeeMain">*/}
                                        <button className="button"
                                            onClick={() =>{
                                            // const newItems =[...this.state.itemList]
                                            // newItems[key].vote = true;
                                            let newSnack =   {
                                                "name":document.getElementById("newSnackName").value,
                                                "category": document.getElementById("test_select").selectedIndex
                                            };
                                            console.log(newSnack);
                                            api.createVoteSnack(newSnack);
                                            // newItems.push(newSnack);
                                            // this.setState({
                                            //     itemList:newItems})
                                            close();
                                        }}>YES
                                        </button>
                                        {/*<button onClick={() => this.addNum(key)}>YES*/}
                                        {/*</button>*/}
                                        {/*</Link>*/}
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
                    <div className='table'>
                        <Link to="/employeeMain">back to employee main</Link>
                    </div>
                </div>
                {/*<div className='footer'>*/}
                {/*    <Link to="/employeeMain">back to employee main</Link>*/}
                {/*</div>*/}
            </div>
        );
    }
}
export default Vote;