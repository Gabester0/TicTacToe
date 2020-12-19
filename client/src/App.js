import React, { useState } from 'react';
import { AppDiv, StyledH1 } from './AppStyles';
import LocalGame from './LocalGame';
import RandomGame from './RandomGame';
import Menu from './components/menu/Menu';

function App() {

    const [localGame, setLocalGame] = useState(false);
    const [randomGame, setRandomGame] = useState(false);

    const chooseLocalGame =()=>{ if(!localGame && !randomGame) setLocalGame(true) }
    const chooseRandomGame =()=>{ if(!localGame && !randomGame) setRandomGame(true) }
    const showMenu = ()=>{ 
        setLocalGame(false)
        setRandomGame(false)
    }

    return (
        <AppDiv>
        <StyledH1>Tic Tac Toe</StyledH1>
        { !localGame && !randomGame && <Menu 
            localGame={chooseLocalGame}
            randomGame={chooseRandomGame}
        />}
        { localGame && <LocalGame menu={showMenu} />}
        { randomGame && <RandomGame menu={showMenu} />}
        <div>
            <p>&#169; <a href="https://gabrieleipper.com" title="https://gabrieleipper.com">Gabriel Eipper</a> 2020</p>
            <p>Icons made by <a href="https://www.flaticon.com/authors/pixel-perfect" title="Pixel perfect">Pixel perfect</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></p>
        </div>
        </AppDiv>
    );
}

export default App;