import React, { useState, useEffect } from 'react';
import Board from './Board';
import Square from './Square';
import ConfettiDot from './ConfettiDot';
import './App.css';

function App() {
//First Turn
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState( { ...[...Array(9)].map( ()=> null ) } );
  const [xmoves, setXMoves] = useState([]);
  const [omoves, setOMoves] = useState([]);
  const [winner, setWinner] = useState(false);
  const [lastWin, setLastWin] = useState([]);

  const solutions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

  const handleClick = (e)=>{
    const curr = parseInt(e.target.id);

    if(board[curr] === null && !winner){
      setBoard({
        ...board,
        [curr]: player
      })
      player === "X" ? setXMoves ([...xmoves, curr]) : setOMoves([...omoves, curr]);
    }
  }

  useEffect( ()=>{
    let win;
    if(player === "X"){
      win = checkWinner(xmoves)  
    } 
    if(player === "O"){
      win = checkWinner(omoves);
    }
    if(win){
      setWinner(true);
      alert(`Player ${player} is the winner!`)
      return
    }
    if(xmoves.length + omoves.length === 9){
      handleDraw();
      return
    }
    setPlayer( (player) => player === "X" ? "O" : "X")
  }, [board]);

  const highlightWin = (array)=>{
    setLastWin([...array])
    array.map((e)=> document.getElementById(e).style.backgroundColor= "blue")
  }
  
  const resetHighlight = (array) => {
    array.map((e)=> document.getElementById(e).style.backgroundColor= "#efefef")
  }

  const checkWinner = (playerMoves) =>{
    if(playerMoves.length < 3) {
      console.log(`Not enough tokens for a win`)
      return false;
    }
    for(let i =  0; i < solutions.length; i++){
      let match = playerMoves.filter((e)=> solutions[i].includes(e));
      if( match.length === 3 ){
        console.log(solutions[i], match, `We have a match/winner`);
        highlightWin(match);
        return true
      }
    }
    console.log('No winner')
    return false;
  }

  const handleDraw = ()=>{
    alert(`It's a draw.  No moves left`)
  }

  const resetBoard = () => {
    //First Turn
    setPlayer("X");
    setBoard( { ...[...Array(9)].map( ()=> null ) } );
    setXMoves([]);
    setOMoves([]);
    setWinner(false);
    resetHighlight(lastWin);
    setLastWin([]);
  }

  const squares = [...Array(9)].map( (e, i)=>  (
    <Square 
      id={i} 
      key={i} 
      number={i + 1} 
      value={board[i]} 
      click={handleClick}
    ></Square>
  ));

  return (
    <div className='App'>
      <h1>Tic Tac Toe Game!</h1>
      <h5 style={winner ? {fontSize: 50 + `px`} : null}>
        {!winner ? `Current Player: ${player}` : `Player ${player} is the winner!`}
      </h5>
      <button onClick={resetBoard}>Reset game</button>
      <Board>
        {squares}
      </Board>
      {winner && <ConfettiDot />}
    </div>
  );
}

export default App;