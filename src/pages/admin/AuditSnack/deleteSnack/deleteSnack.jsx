

import React from "react";
import Popup from "reactjs-popup";

class DeleteSnack extends React.Component {

    constructor(props) {
        super(props);
        this.deleteCurrUser = this.deleteCurrUser.bind(this);
        this.getCategoryName = this.getCategoryName.bind(this);
    }


    deleteCurrUser(index) {
        const {handleDelete} = this.props;
        handleDelete(index);
    }

    getCategoryName(snack){
        return this.props.category.filter(e => {
            return e.category_id === snack.category_id;
        })

    }

    render() {
        return (
            <div className="user-list">
                {
                    this.props.snacks.map((snack) => (
                        <Popup trigger={<div className='user-container'>
                            <img alt='Snack' src={`${snack.image_url}?${snack.imgDate}`}  width="200px" height="200px" />
                            <h2 style={{color: "#ffffff"}}> {snack.name} </h2>
                            <h2 style={{color: "#ffffff"}}> ID:{snack.snack_Id} </h2>
                            <h2 style={{color: "#ffffff"}}> Category:{this.getCategoryName(snack)[0].name} </h2>
                        </div>} modal
                               nested>
                            {close => (
                                <div className="modal" style={{backgroundColor: "#e2dbe2", height: 200, width: 500}}>
                                    <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="content" style={{textAlign: "center", fontSize: "1.5rem",
                                        fontWeight: "bold", color: "rgba(120, 92, 171, 0.7)", padding: "2.5rem"}}>
                                        Are you going to delete this snack?
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <button className="delete"
                                                style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 50, width: 100, textAlign: "center"}}
                                                onClick={
                                                    () => {
                                                        this.deleteCurrUser(snack.snack_Id);
                                                        close();
                                                    }}>
                                            Yes!
                                        </button>
                                        <button className="close"
                                                onClick={close}
                                                style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 50, width: 100}}>
                                            No!
                                        </button>
                                    </div>
                                </div>
                            )}
                        </Popup>
                    ))
                }
            </div>
        );
    };
}

export default DeleteSnack;
