import React from 'react';
import './Square.css';

const Square = (props)=>{

    return  (
        <div className="square" id={props.id} onClick={props.click}>
            <p>{props.number}</p>
            <h1>{props.value}</h1>
        </div>
    )
}

export default Square;