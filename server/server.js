require(`dotenv`).config();
const app = require('express')();
const server = require('http').createServer(app);

const session = require('express-session');
const io = require('socket.io')(server);  //const options = {  }; //{ perMessageDeflate: false }
const { redisClient, RedisStore } = require('./redis/redis');

const { initiateBoard } = require('./gameLogic/board');
const { findGame } = require('./gameLogic/findGame');

app.use(
   session({
      store: new RedisStore({client: redisClient}),
      secret: 'catsRCool',
      resave: false
   })
)

io.on('connection', async (socket) => { 
   console.log(`Socket Connected`, socket.id)
   // socket.emit("message", {note: "I am your server"})

   const { game, status } = await findGame(socket, io)
   console.log(game, status)
   if(status){
      const initialGame = await initiateBoard(game)
      /*
      This is only emitting to first player
      Check node course chat app socket code || socket.io documentation to see how to broadcast to everyone in a room
      Or is this a typing issue when people join the room
      console.log who is in a room?
      */
      io.to(game).emit(`start`, { game, ...initialGame } )
   }

   socket.on('click', socket=>{
      console.log(socket)
   })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));