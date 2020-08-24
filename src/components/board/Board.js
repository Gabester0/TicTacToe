import React from 'react';
import './Board.css';

export const highlightWin = (array, lastWin)=>{
    lastWin([...array])
    array.map((e)=> document.getElementById(e).style.backgroundColor= "blue")
    document.getElementById("board").style.opacity = 0.55;
  }

export const resetHighlight = (array) => {
    array.map((e)=> document.getElementById(e).style.backgroundColor= "#efefef")
    document.getElementById("board").style.opacity = 1;
  }

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