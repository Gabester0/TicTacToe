require(`dotenv`).config();
const app = require('express')();
const server = require('http').createServer(app);

//Import redis and express-session to set-up server data storage
const redis = require('redis');
const session = require('express-session');

//configure options in initiate socket.io
const options = {  }; //{ perMessageDeflate: false }
const io = require('socket.io')(server, options);

//Import connect-redis and initiate local data storage
let RedisStore = require('connect-redis')(session);
let redisClient = redis.createClient();

const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);

//Import custom functions
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
   if(games === null){ //Handle Creating First Game
      await redisClient.setAsync('games', 1)
      await redisClient.setAsync(`1.status`, false) //Set A Game status of false because only one player has joined
      socket.emit("message", {game: 1, player: `X`}) //Communicate to first client Game number and player (X)
   }else { //Handle adding second player, or creating additional games
      const latestGame = games.split('')[games.length - 1]
      const latestGameStatus = await redisClient.getAsync(`${latestGame}.status`)
      if(latestGameStatus === `false`){ //Add Player to existing Game
         await redisClient.setAsync(`${latestGame}.status`, true)
         socket.emit("message", {game: latestGame, player: `O`}) //Communicate to second player Game number and player (O)
      } else { //Handle creating new games after the first new game
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