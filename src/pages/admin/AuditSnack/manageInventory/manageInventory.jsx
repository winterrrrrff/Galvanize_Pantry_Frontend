import React from "react";
import Popup from "reactjs-popup";
import * as api from "../../../../api";
import "./manageInventory.style.css"
import {Grid} from "@material-ui/core";
import { InventoryList } from "./inventoryList";
import TextField from "@material-ui/core/TextField/TextField";
import {Link} from "react-router-dom";
import LogoutButton from "../../AdminMain/LogoutButton";

class ManageInventory extends React.Component {

    constructor(props) {
        super(props);
        this.getCategoryName = this.getCategoryName.bind(this);
        this.state={
            snack_Id: "none",
            invList: []
        }
        this.toInventList = this.toInventList.bind(this)
        this.submitInvent = this.submitInvent.bind(this)
        this.deleteInvent = this.deleteInvent.bind(this)
        this.updateInvent = this.updateInvent.bind(this)
    }



    getCategoryName(snack) {
        return this.props.category.filter(e => {
            return e.category_id === snack.category_id;
        })
    }
    deleteInvent(id){
        api.deleteInventory(id).then(()=>{
            window.alert("Delete success!");
            this.toInventList(this.state.snack_Id);
        })
    }

    submitInvent(inventories){
        api.updateInventory(inventories).then(()=>{
            this.toInventList(this.state.snack_Id);
            window.alert("Update success!");
        })
    }
    updateInvent(inventories){
        this.setState({
            snack_Id:"none",
            invList:[],
        })
        this.setState({
            snack_Id:this.state.snack_Id,
            invList:inventories,
        })
        this.forceUpdate()
    }




    toInventList(id){
        api.getInventory(id).then(invList =>{
            this.setState({snack_Id:"none", invList:[]});
            this.setState({
                snack_Id:id,
                invList:invList
            })
        })
    }

    render() {
        if(this.state.snack_Id === "none"){
            return (
                <div>
                <div className="user-list">
                    {
                        this.props.snacks.map((snack) => (
                            <Popup trigger={<button className='button-container' onMouseDown={()=>{
                                this.toInventList(snack.snack_Id);
                            }}>
                                < img alt='Snack' src={`${snack.image_url}?${snack.imgDate}`}  width="200px" height="200px" />
                                <h2 style={{color: "#ffffff", fontSize: "120%"}}> {snack.name} </h2>
                                <h2 style={{color: "#ffffff", fontSize: "120%"}}> ID:{snack.snack_Id} </h2>
                                <h2 style={{color: "#ffffff", fontSize: "120%"}}> Category:{this.getCategoryName(snack)[0].name} </h2>
                            </button>} modal
                                   nested>
                            </Popup>
                        ))
                    }

                </div>
                    <Grid container justify="space-evenly" spacing={10} >

                        <Grid item xs={3}>
                            <Link to="/adminMain">
                                <LogoutButton content="Back" />
                            </Link>
                        </Grid>

                        <Grid item xs={3}>
                            <Link to="/">
                                <LogoutButton content="Logout" />
                            </Link>
                        </Grid>

                    </Grid>
                </div>

            );
        }else
        {
            return(
                <div>
                    <div id="column-names-violet">
                        <div>
                            <span id="column" style={{color:"black"}}>ID</span>
                        </div>
                        <div>
                            <span id="column">Price</span>
                        </div>
                        <div>
                            <span id="column">Quantity</span>
                        </div>
                        <div>
                            <span id="column">Expire Date</span>
                        </div>
                        <div>
                            <span id="column" style={{color:"black"}}>CreatedAt</span>
                        </div>
                        <div>
                            <span id="column" style={{color:"black", width:"50px"}}></span>
                        </div>
                    </div>
                    <InventoryList inventory={this.state.invList}
                                   snack_Id={this.state.snack_Id}
                                   back = {()=>{
                                       this.setState({
                                           snack_Id:"none",
                                           invList:[],
                                   })}}
                                   submit={this.submitInvent}
                                   delete={this.deleteInvent}
                                   update = {this.updateInvent}
                    />





                </div>

            )
        }

    };
}

export default ManageInventory;
