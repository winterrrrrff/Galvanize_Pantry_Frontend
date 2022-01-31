import React from 'react';
import './snackList.style.css'
import { SnackDisplay } from "./snackDisplay";
import { Logo } from "pages/admin/report/reportStyle";
import { Grid } from '@material-ui/core';

export const SnackList = (props) => {
    return(
        <div className="user-list">
            {
                props.snacks.map((snack) => (
                    <SnackDisplay key={snack.id} snack={snack} category={props.category} update={props.update}/>
                ))
            }
        </div>
    );
};


