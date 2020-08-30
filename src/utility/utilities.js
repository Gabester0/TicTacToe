export const randomInRange = (min, max)=> Math.random() * (max - min) + min;

export const randomInHighRange = (min, max)=>{
    return randomInRange(.5, 1) * (max - min) + min;
}

export const randomIntRange = (min, max) => Math.floor(randomInRange(min, max));

export const randomFromArray = array => array[randomIntRange(0, array.length)] 

export const flipCoin = () => Math.round( Math.random() ) === 1;

export const delayFunction = (time, delayedFunction, argument)=>{
    let timer = setTimeout(() => {
      delayedFunction(argument)
    }, time);
    return () => clearTimeout(timer);
}