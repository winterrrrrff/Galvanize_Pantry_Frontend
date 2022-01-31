import React from "react";
import Popup from "reactjs-popup";
import * as api from "../../../../api";


class DeleteUser extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            allUsers: this.props.users
        };
    }

    deleteUserAndUpdate(user) {
        api.deleteUserById(user.id).then((response) => {
            window.alert(response.data.message);
            this.props.fetchAndUpdateList();
        }).catch((err) => {});
    }


    render() {
        return (
            <div className="user-list">
                {
                    this.props.users.map((user, index) => (
                        <Popup trigger={<div className='user-container'>
                            <img alt='user' src={user.image_url} width="200px" height="200px" />
                            <h2 style={{color: "#ffffff"}}> {user.name} </h2>
                            <h2 style={{color: "#ffffff"}}> {user.email} </h2>
                            <h2 style={{color: "#ffffff"}}> {user.isAdmin} </h2>
                        </div>} modal
                               nested>
                            {close => (
                                <div className="modal" style={{backgroundColor: "#e2dbe2", height: 200, width: 400}}>
                                     <button className="close" onClick={close}>
                                        &times;
                                    </button>
                                    <div className="content" style={{textAlign: "center", fontSize: "2rem",
                                        fontWeight: "bold", color: "rgba(120, 92, 171, 0.7)", padding: "2.5rem"}}>
                                        Are you going to delete this person?
                                    </div>
                                    <div style={{display: "flex", justifyContent: "center"}}>
                                        <button className="delete"
                                                style={{backgroundColor: "rgba(120, 92, 171, 0.7)", height: 50, width: 100, textAlign: "center"}}
                                                onClick={
                                            () => {
                                                this.deleteUserAndUpdate(user);
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

export default DeleteUser;
