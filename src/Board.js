import React from 'react';
import './Board.css';

const Board = (props)=>{

    return (
        <div id="background">
            <div id="board">
                {props.children}
            </div>
        </div>
    )
}

export default Board;