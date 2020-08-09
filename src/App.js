import React, { useState, useEffect } from 'react';
import Board from './Board';
import Square from './Square';
import './App.css';

function App() {

  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState({ 
    "0" : null,
    "1" : null,
    "2" : null,
    "3" : null,
    "4" : null,
    "5" : null,
    "6" : null,
    "7" : null,
    "8" : null,
  });
  const [xmoves, setxMoves] = useState([]);
  const [omoves, setoMoves] = useState([]);
  const [winner, setWinner] = useState(false);

  const solutions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];

  const handleClick = (e)=>{
    const curr = e.target.id;

    if(board[curr] === null){
      setBoard({
        ...board,
        [curr]: player
      })
      player === "X" ? setxMoves ([...xmoves, curr]) : setoMoves([...omoves, curr]);     
    }
  }

  useEffect( ()=>{
    if(xmoves.length + omoves.length === 9){
      handleDraw();
      return
    }
    player === "X" ? checkWinner(xmoves) : checkWinner(omoves);
    console.log(`player: `, player, `  xmoves + omoves `, xmoves, omoves, board)
    setPlayer( () => player === "X" ? "O" : "X")
  }, [board]);

  const checkWinner = (playerMoves) =>{
    if(playerMoves.length < 3) {
      console.log(`Not enough tokens for a win`)
      return false;
    }
    /*
    Iterate through solutions
    Check if playerMoves (xmoves or omoves) contains solutions[i]
    *! .includes won't work for this.  Only accepts a single integer value */
   //? Check if the gist you saved to github from recent code Challenge could be used for checkWinner?
/*  if included setWinner(true) & return true
    else return false
    */
    console.log(`Checking for a winner `, winner)
  }

  const handleDraw = ()=>{
    console.log(`It's a draw.  No moves left`)
  }

  const squares = [...Array(9)].map( (e, i)=>  (
    <Square 
      id={i} 
      key={i} 
      number={i + 1} 
      value={board[i]} 
      click={handleClick}
    ></Square> ))

  return (
    <div className='App'>
      <h1>Tic Tac Toe Game!</h1>
      <h5>Current Player: {player}</h5>
      <Board>
        {squares}
      </Board>
    </div>
  );
}

export default App;