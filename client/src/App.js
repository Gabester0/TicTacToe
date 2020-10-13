import React, { useState, useEffect, useRef } from 'react';
import Board, { highlightWin, resetHighlight } from './components/board/Board';
import ConfettiCannon from './components/ConfettiCannon';
import { AppDiv, StaticDiv, StyledH5, Btn, Cannon } from './AppStyles';
import { delayFunction } from './utility/utilities';
import io from 'socket.io-client';
import useSocket from 'use-socket.io-client';
const clickAudio = require('./static/wood-click-1.wav');

function App(props) {
  const [socket] = useSocket('http://localhost:5005/', {autoConnect: false});
  const [player, setPlayer] = useState("X");
  const [board, setBoard] = useState( { ...Array(9).fill(null) } ); //server
  const [lastMove, setlastMove] = useState();
  const [xmoves, setXMoves] = useState([]);
  const [omoves, setOMoves] = useState([]);
  const [winner, setWinner] = useState(false);
  const [draw, setDraw] = useState(false);
  const [lastWin, setLastWin] = useState([]);
  const [delay, setDelay] = useState(false);
  const solutions = [ [0,1,2], [3,4,5], [6,7,8], [0,3,6], [1,4,7], [2,5,8], [0,4,8], [2,4,6] ];  //server

  useEffect( ()=>{
    const win = checkWinner();
    if(win) return setWinner(true);
    if(xmoves.length + omoves.length === 9) return setDraw(true);
    if(xmoves.length +omoves.length >= 1) setPlayer( (player) => player === "X" ? "O" : "X") //Conditional logic keeps extra render from toggling player before first move
  }, [board, xmoves, omoves]);

  let gameSocket;
  useEffect( ()=>{
    socket.connect(); // socket = io.connect('http://localhost:5005/');
    socket.on('connection', (socket)=>{
      console.log(`Socket Connected!`, socket.connected)
    })
    socket.on("join", (data)=>{
      console.log(`Server message: ${data.note}`, data.game, data.player, data.status)
    })
  }, [])

  useEffect(()=>{
    socket.emit(`click`, {clicked: lastMove, player: player, id: socket.id})
  }, [lastMove])


  const playAudio = (id, volume)=>{
    const audio = document.getElementById(id);
    if(volume !== undefined) audio.volume = volume;
    audio.play();
  }

  const handleClick = (e)=>{
    const curr = parseInt(e.target.id);
    if(board[curr] === null && !winner){
      setlastMove(curr);
      playAudio(`clickAudio`, .4);
      setBoard({
        ...board,
        [curr]: player
      })
      player === "X" ? setXMoves ([...xmoves, curr]) : setOMoves([...omoves, curr]);
    }
  }

  const checkWinner = () =>{
    const currentMoves = (player === "X") ? xmoves : omoves;
    if(currentMoves.length < 3) return false;
    for(let i =  0; i < solutions.length; i++){
      let match = currentMoves.filter((e)=> solutions[i].includes(e));
      if( match.length === 3 ){
        highlightWin(match, setLastWin, lastWin, player);
        delayFunction(1050, playAudio, "popAudio")
        delayFunction(1225, setDelay, !delay)
        return true
      }
    }
    return false;
  }

  const resetBoard = () => {
    setPlayer("X");
    setBoard( { ...Array(9).fill(null) } );
    setXMoves([]);
    setOMoves([]);
    setWinner(false);
    setDraw(false);
    if(lastWin.length >= 1) resetHighlight(lastWin[lastWin.length - 1]);
    setDelay(false)
  }

  const confettiAnchorRef = useRef();

  return (
    <AppDiv>
      <h1>Tic Tac Toe</h1>
      <StaticDiv>
        <StyledH5 draw={draw} winner={winner} player={(player === "X")}>
          {  draw ? `The game is a draw, please restart` : !winner ? `Current Player: ${player}` : `Player ${player} is the winner!`}
        </StyledH5>
      </StaticDiv>
      <Btn onClick={resetBoard}>Reset game</Btn>
      <Board handleClick={handleClick} board={board} />
      <audio id="clickAudio" preload="auto">
          <source src={clickAudio} />
      </audio>
      <Cannon 
        show={winner}
        src={require('./static/StubbyCannon.svg')} 
        alt="confetti canon"
        ref={confettiAnchorRef} />
      {winner && delay && (
        <ConfettiCannon 
          anchorRef={confettiAnchorRef}
          dotCount={50}
          colors={['red', 'green', 'blue', 'yellow']} />
      )}
        <audio id="popAudio" preload="none">
          <source src={require('./static/vs-pop-1.mp3')} />
      </audio>
    </AppDiv>
  );
}

export default App;