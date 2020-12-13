require(`dotenv`).config();
const app = require('express')();
const server = require('http').createServer(app);

const session = require('express-session');
const io = require('socket.io')(server);  //const options = {  }; //{ perMessageDeflate: false }
const { redisClient, RedisStore } = require('./redis/redis');

const { initiateBoard } = require('./gameLogic/board');
const { findGame } = require('./gameLogic/findGame');
const { handleClick, checkWinner, changeTurn } = require('./gameLogic/gamePlay');

app.use(
   session({
      store: new RedisStore({client: redisClient}),
      secret: 'catsRCool',
      resave: false
   })
)

io.on('connection', async (socket) => { 
   console.log(`Socket Connected`, socket.id)

   const { game, status } = await findGame(socket, io)
   console.log(game, status)
   if(status){
      const initialGame = await initiateBoard(game)

      io.to(game).emit(`start`, { game, ...initialGame } )
   }

   socket.on('click', async ({ game, client, click })=>{

      const { board, xMoves, oMoves, lastMove, draw } = await handleClick(game, client, click)
      currentMoves = client === `X` ? xMoves : oMoves
      const winner = await checkWinner(game, currentMoves)
      if(winner) console.log(`The winner is ${client}!`)

      if(winner || draw){
         //? Make a gameEnd event to emit instead?
         io.to(game).emit(`click`, { game, board, player: client, winner, draw, lastMove, xMoves, oMoves })
      } else {
         const newPlayer = await changeTurn(client, game)
         io.to(game).emit(`click`, { game, board, player: newPlayer, winner, draw, lastMove, xMoves, oMoves })
      }

   })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));