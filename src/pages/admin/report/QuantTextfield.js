import React from 'react';
import './report.css'
import TextField from '@material-ui/core/TextField';

export const EntreQuant = (props) => {
    return (
        <div className="entre-quant">
            <div id="quantity-container">
                
                <div>
                    <TextField
                        id="filled-quantity"
                        label={props.content}
                        variant="filled"
                        onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    );
};