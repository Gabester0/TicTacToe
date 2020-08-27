import React, { useState, useEffect, useRef } from 'react';
import Board, { highlightWin, resetHighlight } from './components/board/Board';
import Square from './components/square/Square';
import ConfettiCannon from './components/ConfettiCannon';
import { AppDiv, StaticDiv, StyledH5, Btn, Cannon } from './AppStyles';
import { delayFunction } from './utility/utilities';

function App(props) {
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
      const audio = document.getElementById('clickAudio');
      audio.volume = .075;
      audio.play()
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
        highlightWin(match, setLastWin, player);
        delayFunction(delay, setDelay, 1050)
        return true
      }
    }
    return false;
  }

  useEffect(()=>{
    const popAudio = document.getElementById("popAudio");
    popAudio.volume = 1;
    if(delay) popAudio.play();
  },[delay])

  useEffect( ()=>{
    const win = checkWinner();
    if(win) return setWinner(true);
    if(xmoves.length + omoves.length === 9) return setDraw(true);
    if(xmoves.length +omoves.length >= 1) setPlayer( (player) => player === "X" ? "O" : "X")
  }, [board, xmoves, omoves]);

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
    <AppDiv>
      <h1>Tic Tac Toe</h1>
      <StaticDiv>
        <StyledH5 draw={draw} winner={winner} player={(player === "X")}>
          {  draw ? `The game is a draw, please restart` : !winner ? `Current Player: ${player}` : `Player ${player} is the winner!`}
        </StyledH5>
      </StaticDiv>
      <Btn onClick={resetBoard}>Reset game</Btn>
      <Board>
        {squares}
        <audio id="clickAudio">
            <source src={require('./static/wood-click-1.wav')} />
        </audio>
      </Board>
      <Cannon 
        show={winner}
        src={require('./static/StubbyCannon.svg')} 
        alt="confetti canon"
        ref={confettiAnchorRef} />
      {winner && delay && (
        <ConfettiCannon 
          anchorRef={confettiAnchorRef}
          dotCount={30}
          colors={['red', 'green', 'blue', 'yellow']} />
      )}
        <audio id="popAudio">
          <source src={require('./static/vs-pop-1.mp3')} />
      </audio>
    </AppDiv>
  );
}

export default App;