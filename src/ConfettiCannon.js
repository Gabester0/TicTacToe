import React from 'react';
import ConfettiDot from './ConfettiDot';

const randomInRange = (min, max)=>{
    return Math.random() * (max - min) + min;
}

const ConfettiCannon = ({anchorRef, dotCount})=>(
    <>
        {new Array(dotCount).fill().map( (_, index)=> (
            <ConfettiDot
                key={index}
                anchorRef={anchorRef}
                initialHorizontal={randomInRange(-250, 250) }
                //Can't go as tall as 1400 pixels if fading doesn't remove from UI
                initialVertical={randomInRange(700, 1400) }
            />
        ) )}
    </>
)

export default ConfettiCannon;