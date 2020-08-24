import React, { useState, useEffect, useRef } from 'react';
import Board, { highlightWin, resetHighlight } from './components/board/Board';
import Square from './components/square/Square';
import ConfettiCannon from './components/ConfettiCannon';
import './App.css';

function App() {
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState( { ...[...Array(9)].map( ()=> null ) } );
  const [xmoves, setXMoves] = useState([]);
  const [omoves, setOMoves] = useState([]);
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);
  const [lastWin, setLastWin] = useState([]);
  const [delay, setDelay] = useState(false);
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
    (player === "X") ? (win = checkWinner(xmoves)) : (win = checkWinner(omoves))
    if(win) return setWinner(true);
    if(xmoves.length + omoves.length === 9) return setDraw(true);
    setPlayer( (player) => player === "X" ? "O" : "X")
  }, [board]);

  const checkWinner = (playerMoves) =>{
    if(playerMoves.length < 3) return false;
    for(let i =  0; i < solutions.length; i++){
      let match = playerMoves.filter((e)=> solutions[i].includes(e));
      if( match.length === 3 ){
        highlightWin(match, setLastWin);
        startTimer();
        return true
      }
    }
    return false;
  }

  const startTimer = ()=>{
      const timer = setTimeout(() => {
        setDelay(true)
      }, 1050);
      return () => clearTimeout(timer);
  }

  const resetBoard = () => {
    setPlayer("X");
    setBoard( { ...[...Array(9)].map( ()=> null ) } );
    setXMoves([]);
    setOMoves([]);
    setWinner(false);
    setDraw(false);
    resetHighlight(lastWin);
    setLastWin([]);
    setDelay(false)
  }

  const confettiAnchorRef = useRef();

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
      <div className="staticBox">
        <h5 className={ draw ? `draw` : winner ? `winner` : null}>
          {  draw ? `The game is a draw, please restart` : !winner ? `Current Player: ${player}` : `Player ${player} is the winner!`}
        </h5>
      </div>
      <button onClick={resetBoard}>Reset game</button>
      <Board>
        {squares}
      </Board>
      <img 
        className={winner ? "cannon visible" : "cannon"}
        src={require('./static/Cannon.svg')} 
        alt="confetti canon"
        ref={confettiAnchorRef} />
      {winner && delay && (
        <ConfettiCannon 
          anchorRef={confettiAnchorRef}
          dotCount={30}
          colors={['red', 'green', 'blue', 'yellow']}
        />)}
    </div>
  );
}

export default App;