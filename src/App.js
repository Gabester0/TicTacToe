import React, { useState } from 'react';
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
  })
  const [winner, setWinner] = useState(false);

  const squares = [...Array(9)].map( (e, i)=>  <Square id={i} key={i} number={i + 1} value={board[i]} ></Square> )

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