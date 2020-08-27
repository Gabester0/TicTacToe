import React from 'react';
import ConfettiDot from './confettiDot/ConfettiDot';
import { randomInRange, randomInHighRange, randomIntRange} from '../utility/utilities';

const ConfettiCannon = ({anchorRef, colors, dotCount})=>(
    <>
        {new Array(dotCount).fill().map( (_, index)=> (
            <ConfettiDot
                key={ index }
                color={ colors[randomIntRange(0, colors.length)] }
                anchorRef={anchorRef}
                initialHorizontal={randomInRange(-250, 250) }
                initialVertical={randomInHighRange(50, 150) }
                rotate={randomInRange(0, 360)}
                size={randomInRange(10, 25)}
            />
        ) )}
    </>
)

export default ConfettiCannon;