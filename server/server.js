require(`dotenv`).config();
const app = require('express')();
const server = require('http').createServer(app);

const session = require('express-session');
const io = require('socket.io')(server);  //const options = {  }; //{ perMessageDeflate: false }
const { redisClient, RedisStore } = require('./redis/redis');

const { initiateBoard } = require('./gameLogic/board');
const { findGame } = require('./gameLogic/findGame');
const { handleClick, checkWinner } = require('./gameLogic/gamePlay');

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

   socket.on('click', ({ game, client, click })=>{
      console.log(game, client, click)
      const { updatedBoard, currentMoves } = handleClick(game, client, click)
      //Next step: Process clicks
      ////    --Implement Server-side version of handleClick function from LocalGame.js (client)
      //    --Implement Server-side version of checkWinner function from LocalGame.js (client)
      console.log(updatedBoard, currentMoves)
      const winner = checkWinner(currentMoves)
   })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));