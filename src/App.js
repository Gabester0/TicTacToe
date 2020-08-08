import React from 'react';
import Board from './Board';
import Square from './Square';
import './App.css';

function App() {


  const squares = [...Array(9)].map( (e, i)=>  <Square id={i} key={i} value={i} ></Square> )

  return (
    <div className='App'>
      <h1>Tic Tac Toe Game!</h1>
      <Board>
        {squares}
      </Board>
    </div>
  );
}

export default App;