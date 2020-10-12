require(`dotenv`).config();
const app = require('express')();
const server = require('http').createServer(app);
const redis = require('redis');
const session = require('express-session');
const io = require('socket.io')(server);  //const options = {  }; //{ perMessageDeflate: false }
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();
const bluebird = require('bluebird'); //Import Bluebird to make redis get/set-Async calls promises
bluebird.promisifyAll(redis.RedisClient.prototype);

const { initiateBoard } = require('./gameLogic/board');
const { findGame, createGame } = require('./gameLogic/games');

app.use(
   session({
      store: new RedisStore({client: redisClient}),
      secret: 'catsRCool',
      resave: false
   })
)

io.on('connection', async (socket) => { 
   console.log(`Socket Connected`, socket.id)
   socket.emit("message", {note: "I am your server"})

   const games = await redisClient.getAsync(`games`).then(res=> res );
   //Handle Creating First Game
   if(games === null){
      await redisClient.setAsync('games', 1)
      await redisClient.setAsync(`1.status`, false) //Set A Game status of false because only one player has joined
      socket.emit("message", {game: 1, player: `X`}) //Communicate to first client Game number and player (X)
   //Handle adding second player, or creating additional games
   }else {
      const latestGame = games.split('')[games.length - 1]
      const latestGameStatus = await redisClient.getAsync(`${latestGame}.status`)
      //Add Player to existing Game
      if(latestGameStatus === `false`){
         await redisClient.setAsync(`${latestGame}.status`, true)
         socket.emit("message", {game: latestGame, player: `O`}) //Communicate to second player Game number and player (O)
      //Handle creating new games after the first new game
      } else {
         const newGame = parseInt(latestGame) + 1
         await redisClient.setAsync('games', `${games}${newGame}`)
         await redisClient.setAsync(`${newGame}.status`, false) //Set A Game status of false because only one player has joined
         socket.emit("message", {game: newGame, player: `X`}) //Communicate to first client Game number and player (X)
      }
   }

   // initiateBoard(redisClient, socket.id);
   socket.on('click', socket=>{
      console.log(socket)
   })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));