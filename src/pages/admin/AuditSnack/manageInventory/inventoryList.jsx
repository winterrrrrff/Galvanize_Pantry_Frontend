import React from 'react';
import "./manageInventory.style.css"
import TextField from "@material-ui/core/TextField/TextField";
import {InventoryEntry} from "./InventoryEntry";
import {Grid} from "@material-ui/core";
export const InventoryList = (props) => {
    let column=true;
    let color = "";

    const handleInventChange = (index,key,value) => {
        let inventories = props.inventory;
        inventories[index][key] = value
        props.update(inventories);
    }
    const handleSubmit = () =>{
        props.submit(props.inventory);
    }
    const handleDelete = (index) =>{
        props.delete(props.inventory[index].id);
    }

    const handleDeleteNew = (index) =>{
        let inventories = props.inventory;
        if (index>-1){
            inventories.splice(index,1);
        }
        props.update(inventories);
    }
    const handleAdd = ()=> {
        let inventories = props.inventory;
        inventories.push({
            snack_Id:props.snack_Id,
            quantity:"0",
            unit_price:"0",
            expire_date:"2021-01-01",
        });
        props.update(inventories);
    }

    return(
        <div className="user-list">
            {
                <div>
                    {   props.inventory.map((invent,index) => {
                        if(column){
                            color = "column-names";
                        } else {
                            color = "column-names-violet";
                        }
                        column = !column;
                        if (invent.id){
                            return(
                                <InventoryEntry colorColumn={color} inventory={invent} index={index}
                                                handleChange={handleInventChange}
                                                handleDelete={handleDelete}/>
                            )
                        } else {
                            return(
                                <InventoryEntry colorColumn={color} inventory={invent} index={index}
                                                handleChange={handleInventChange}/>
                            )
                        }
                    })}
                    <div align={"center"}>
                    <button onClick={handleAdd} style={{ height: 50, width: 800,fontSize:'25px',
                        color:"black"}}>Add Inventories
                    </button>
                    </div>
                    <Grid container justify="space-evenly" spacing={10} >

                        <Grid item xs={3}>
                            <button onClick={handleSubmit} style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 50, width: 300,fontSize:'25px',
                                color:"white"}}>Submit Inventories
                            </button>
                        </Grid>
                        <Grid item xs={3}>
                            <button onClick={props.back} style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 50, width: 300,fontSize:'25px',
                                color:"white"}}>Back To Snack List
                            </button>
                        </Grid>
                    </Grid>
                </div>
            }
        </div>
    );
};


