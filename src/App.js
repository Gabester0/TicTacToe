import React, { useState } from 'react';
import Board from './Board';
import Square from './Square';
import './App.css';

function App() {

  const [player, setPlayer] = useState(false);
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
  })
  const [winner, setWinner] = useState(false);

  let solution = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];  


  const handleClick = (e)=>{
    checkWinner();
    console.log(e.target.id)
    setPlayer( (current) => !current)
  }

  const checkWinner = () =>{
    console.log(`We have a winner `, winner)
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
      <h5>Current Player: {player ? "X" : "O"}</h5>
      <Board>
        {squares}
      </Board>
    </div>
  );
}

export default App;