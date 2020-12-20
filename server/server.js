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
   console.log(`SERVER.js line 25`, game, status)
   if(status){
      const initialGame = await initiateBoard(game)
      io.to(game).emit(`start`, initialGame)
   }

   socket.on('click', async ({ game, client, click })=>{
      const allClients = io.sockets.adapter.rooms[game].sockets
      console.log("received a click", " All Clients: ", allClients)
      const { board, xMoves, oMoves, lastMove } = await handleClick(game, client, click)
      currentMoves = client === `X` ? xMoves : oMoves
      const { winner, match, draw } = await checkWinner(game, currentMoves, xMoves, oMoves)
      if(winner) console.log(`The winner is ${client}!  With the winning moves:`, match)

      if(winner || draw){
         io.to(game).emit(`gameOver`, { game, board, player: client, winner, draw, lastMove, xMoves, oMoves, match })
      } else {
         const newPlayer = await changeTurn(client, game)
         io.to(game).emit(`clicked`, { game, board, player: newPlayer, winner, draw, lastMove, xMoves, oMoves, match })
      }
   })

   socket.on(`initiatePlayAgain`, async({currentGame, client})=>{
      socket.leave(currentGame)
      const { game, status } = await findGame(socket, io)
      console.log(game, status)
      if(status){
         const initialGame = await initiateBoard(game)
         io.to(game).emit(`start`, initialGame)
      }
   })

   socket.on(`quit`,async ({ game })=>{
      const winner = await redisClient.getAsync(`${game}.winner`)
      const draw = await redisClient.getAsync(`${game}.draw`)
      if(winner === 'false' && draw === 'false') socket.to(game).emit(`quit`, game)
   })
   
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));