import React, { useState, useEffect } from 'react';
import { AppDiv } from './AppStyles';
import LocalGame from './components/LocalGame';
import RandomGame from './components/RandomGame';
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
        <h1>Tic Tac Toe</h1>
        { !localGame && !randomGame && <Menu 
            localGame={chooseLocalGame}
            randomGame={chooseRandomGame}
        />}
        { localGame && <LocalGame menu={showMenu} />}
        { randomGame && <RandomGame menu={showMenu} />}
        </AppDiv>
    );
}

export default App;