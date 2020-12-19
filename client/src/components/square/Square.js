import React from 'react';
import { SquareDiv } from './SquareStyles';

const Square = (props)=>{

    return  (
        <SquareDiv className="square" id={props.id} onClick={props.click}>
            {/* <p>{props.number}</p> */}
            <h1>{props.value}</h1>
        </SquareDiv>
    )
}

export default Square;