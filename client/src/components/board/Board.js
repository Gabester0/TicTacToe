import React from 'react';
import { BoardDiv, Background } from './BoardStyles';
import Square from '../square/Square';

export const highlightWin = (array, setLastWin, lastWin, player)=>{
    setLastWin([...lastWin, array])
    const color = player === "X" ? "#bd0000" : "#4464AD";
    array.map((e)=> document.getElementById(e).style.backgroundColor= color)
  }

export const resetHighlight = (array) => {
    array.map((e)=> document.getElementById(e).style.backgroundColor= "#ffffff")
  }

const Board = (props)=>{
    const squares = [...Array(9)].map( (e, i)=>  (
        <Square 
          id={i} 
          key={i} 
          number={i + 1} 
          value={props.board[i]} 
          click={props.handleClick}
        ></Square>
      ));
    return (
        <Background>
            <BoardDiv id="board">
                {/* {props.children} */}
                {squares}
            </BoardDiv>
        </Background>
    )
}

export default Board;