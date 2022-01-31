import React from 'react';
import "./manageInventory.style.css"
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField/TextField";
import Popup from "reactjs-popup";
export const InventoryEntry = (props) => {
    const color = props.colorColumn;
    const index = props.index;
    const date_to_string = (date) => {
        let year = date.getFullYear();
        let month = date.getMonth()+1;
        let day = date.getDate();
        if (month < 10) {
            month = "0" + month;
        }
        if (day < 10) {
            day = "0" + day;
        }
        return year + "-" + month + "-" + day
    }

    const string_to_date = (string) =>{
        if (!string || string === ""){
            return new Date();
        }
        return new Date(Date.parse(string));
    }
    const [unit_price, setPrice] = React.useState(
        props.inventory.unit_price
    );
    const [quantity, setQuantity] = React.useState(
        props.inventory.quantity
    );
    const [startDate, setStartDate] = React.useState(
        string_to_date(props.inventory.expire_date)
    );
    const setAndPushPrice = (price) =>{
        setPrice(price)
        props.handleChange(index,"unit_price",price)
    }
    const setAndPushQuantity = (quantity) =>{
        setQuantity(quantity)
        props.handleChange(index,"quantity",quantity)
    }
    const setAndPushDate = (date) =>{
        setStartDate(date)
        props.handleChange(index,"expire_date",date_to_string(date))
    }
    if(props.handleDelete){
    return(
        <div>
            <div id={color}>
                <div>
                    <span id="column" style={{color:"black"}}>{props.inventory.id}</span>
                </div>
                <div>
                                    <span id="column">
                                        <TextField
                                            id="column"
                                            style={{width:"150px"}}
                                            placeholder={props.inventory.unit_price}
                                            defaultValue={unit_price}
                                            onChange={(e) => {
                                                setAndPushPrice(e.target.value);
                                            }}
                                            type = "number"
                                        />
                                    </span>
                </div>
                <div>
                                    <span id="column">
                                        <TextField
                                            id="column"
                                            style={{width:"150px"}}
                                            placeholder={props.inventory.quantity}
                                            defaultValue={quantity}
                                            onChange={(e) => {
                                                setAndPushQuantity(e.target.value);
                                            }}
                                            type = "number"
                                        />
                                    </span>
                </div>
                <div>
                                    <span id="column">
                                            <div>
                                                <DatePicker
                                                    id = "expire-date-select"
                                                    selected={startDate}
                                                    onChange={(date)=> {
                                                        setAndPushDate(date)
                                                    }}
                                                />
                                            </div>
                                    </span>
                </div>
                <div>
                    <span id="column" style = {{fontSize:"10px",color:"black"}}>{props.inventory.createdAt}</span>
                </div>
                <div>
                    <Popup trigger={<button style={{width:"50px",height:"20px"}} > delete </button>}modal
                           nested>
                        {close => (
                            <div className="modal" style={{backgroundColor: "#e2dbe2", height: 200, width: 400}}>
                                <button className="close" onClick={close}>
                                    &times;
                                </button>
                                <div className="content" style={{textAlign: "center", fontSize: "2rem",
                                    fontWeight: "bold", color: "rgba(120, 92, 171, 0.7)", padding: "2.5rem"}}>
                                    Are you going to delete this inventory?
                                </div>
                                <div style={{display: "flex", justifyContent: "center"}}>
                                    <button className="delete"
                                            style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 20, width: 80, textAlign: "center"}}
                                            onClick={
                                                () => {
                                                    props.handleDelete(index)
                                                    close();
                                                }}>
                                        Yes!
                                    </button>
                                    <button className="close"
                                            onClick={close}
                                            style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 20, width: 80}}>
                                        No!
                                    </button>
                                </div>
                            </div>
                        )}
                    </Popup>
                </div>
            </div>
        </div>)}
    else{
        return(

            <div>
                <div id={color}>
                    <div>
                        <span id="column" style={{color:"black"}}>{props.inventory.id}</span>
                    </div>
                    <div>
                                    <span id="column">
                                        <TextField
                                            id="column"
                                            style={{width:"150px"}}
                                            placeholder={props.inventory.unit_price}
                                            defaultValue={unit_price}
                                            onChange={(e) => {
                                                setAndPushPrice(e.target.value);
                                            }}
                                            type = "number"
                                        />
                                    </span>
                    </div>
                    <div>
                                    <span id="column">
                                        <TextField
                                            id="column"
                                            style={{width:"150px"}}
                                            placeholder={props.inventory.quantity}
                                            defaultValue={quantity}
                                            onChange={(e) => {
                                                setAndPushQuantity(e.target.value);
                                            }}
                                            type = "number"
                                        />
                                    </span>
                    </div>
                    <div>
                                    <span id="column">
                                            <div>
                                                <DatePicker
                                                    id = "expire-date-select"
                                                    selected={startDate}
                                                    onChange={(date)=> {
                                                        setAndPushDate(date)
                                                    }}
                                                />
                                            </div>
                                    </span>
                    </div>
                    <div>
                        <span id="column" style = {{fontSize:"10px",color:"black"}}>{props.inventory.createdAt}</span>
                    </div>
                    <div>
                        <span id="column" style={{width:"50px",height:"20px"}}/>
                    </div>
                </div>
            </div>
        )
    };
};


