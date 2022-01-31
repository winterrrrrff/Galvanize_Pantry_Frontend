import React from 'react';
import './userList.style.css'
import { UserDisplay } from "./userDisplay";

export const UserList = (props) => {

    return(
        <div className="user-list">
            {
                props.users.map(user => (
                    <UserDisplay user={user} fetchAndUpdateList={props.fetchAndUpdateList}>

                    </UserDisplay>
                ))
            }
        </div>
    );
};


