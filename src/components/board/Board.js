import React from 'react';
import { BoardDiv, Background } from './BoardStyles';

export const highlightWin = (array, setLastWin, lastWin, player)=>{
    setLastWin([...lastWin, array])
    const color = player === "X" ? "#bd0000" : "#4464AD";
    array.map((e)=> document.getElementById(e).style.backgroundColor= color)
  }

export const resetHighlight = (array) => {
    array.map((e)=> document.getElementById(e).style.backgroundColor= "#ffffff")
    document.getElementById("board").style.opacity = 1;
  }

const Board = (props)=>{
    return (
        <Background>
            <BoardDiv id="board">
                {props.children}
            </BoardDiv>
        </Background>
    )
}

export default Board;