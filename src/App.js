import React, { useState } from 'react';
import Board from './Board';
import Square from './Square';
import './App.css';

function App() {

  const [player, setPlayer] = useState("X")

  const squares = [...Array(9)].map( (e, i)=>  <Square id={i} key={i} number={i + 1} value={``} ></Square> )

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