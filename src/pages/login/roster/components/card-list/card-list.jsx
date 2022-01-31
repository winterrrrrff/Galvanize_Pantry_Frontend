import React from 'react';
import './card-list.style.css'
import { Card } from '../card/card'

export const CardList = (props) => {
    return (
        <div className='card-list'>
            {
                props.employees.map(employee => (
                    <Card key={employee.id} employee={employee}></Card>
                ))
            }
        </div>
    );
}