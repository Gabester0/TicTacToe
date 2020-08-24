import React from 'react';
import ConfettiDot from './ConfettiDot';
import { randomInRange, randomInHighRange, randomIntRange} from '../utility/random';

const ConfettiCannon = ({anchorRef, colors, dotCount})=>(
    <>
        {new Array(dotCount).fill().map( (_, index)=> (
            <ConfettiDot
                key={ index }
                color={ colors[randomIntRange(0, colors.length)] }
                anchorRef={anchorRef}
                initialHorizontal={randomInRange(-250, 250) }
                initialVertical={randomInHighRange(200, 700) }
                rotate={randomInRange(0, 360)}
                size={randomInRange(10, 20)}
            />
        ) )}
    </>
)

export default ConfettiCannon;