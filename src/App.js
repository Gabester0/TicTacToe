import React, { useState, useEffect } from 'react';
import Board from './Board';
import Square from './Square';
import './App.css';

function App() {

  const [player, setPlayer] = useState("X");
  //Switch to array, use index to track board position
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

  let solution = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];  

//Change this to a useEffect?
  const handleClick = (e)=>{
    const curr = e.target.id;
    if(board[curr] === null){
      setBoard({
        ...board,
        [curr]: player
      })
    }
  }
  
  useEffect( ()=>{
    checkWinner();
    console.log(`player: `, player, board)
    //Need a function that will update current players moves array
    setPlayer( () => player === "X" ? "O" : "X")
  }, [board]);

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
      <h5>Current Player: {player}</h5>
      <Board>
        {squares}
      </Board>
    </div>
  );
}

export default App;