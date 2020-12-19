import React from 'react';
import { BoardDiv, Background } from './BoardStyles';
import Square from '../square/Square';
import clickAudio from '../../static/wood-click-1.wav';

export const highlightWin = (array, setLastWin, lastWin, player)=>{
    setLastWin([...lastWin, array])
    const color = player === "X" ? "#bd0000" : "#4464AD";
    console.log(array, `Highlighting the win`);
    array.map((e)=> {
        console.log(e)
        document.getElementById(e).style.backgroundColor= color
    })
}

export const resetHighlight = (array) => {
    array.map((e)=> document.getElementById(e).style.backgroundColor= "#ffffff")
}

export const playAudio = (id, volume)=>{
    console.log(`Playing Audio`)
    const audio = document.getElementById(id);
    if(volume !== undefined) audio.volume = volume;
    audio.play();
}

const Board = (props)=>{
    const squares = [...Array(9)].map( (e, i)=>  (
        <Square 
          id={i} 
          key={i} 
        //   number={i + 1} 
          value={props.board[i]} 
          click={props.handleClick}
        ></Square>
      ));
    return (
        <>
            <Background>
                <BoardDiv id="board">
                    {/* {props.children} */}
                    {squares}
                </BoardDiv>
            </Background>
            <audio id="clickAudio" preload="auto">
                <source src={clickAudio} />
            </audio>
            <audio id="popAudio" preload="none">
                <source src={require('../../static/vs-pop-1.mp3')} />
            </audio>
        </>
    )
}

export default Board;