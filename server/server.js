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


const { initiateBoard } = require('./gameLogic/board');

app.use(
   session({
      store: new RedisStore({client: redisClient}),
      secret: 'catsRCool',
      resave: false
   })
)

io.on('connection', (socket) => { 
   console.log(`Socket Connected`, socket.id)
   socket.emit("message", {note: "I am your server"})

   //Need a function to check redis for games looking for game with only 1 player
   //Need a way to store 2 socket connections under 1 key that will identify both clients in 1 game
        //Each client in the game needs to store the hashname and send it with server requests
   //Can use redisClient.hgetall( hashname ) to get all values in a hash (see ln 47)
   
   //hset sets a single hash value, hmset sets multiple values
   redisClient.hmset(socket.id, "id", socket.id)
   initiateBoard(redisClient, socket.id);
   redisClient.hmget(socket.id, `game.player`, `moves.last`, (err, val)=> console.log(val))
   socket.on('click', socket=>{
      console.log(socket)
      //hmget is redis method to get multiple key values listed from hash: https://redis.io/commands/hmget
    //   redisClient.hmget(socket.id, "id", "Test", (err, value)=>{
    //      console.log(Array.from(value[1].split(',')))
    //   })
    // redisClient.hgetall(socket.id, (err, val)=> console.log(val))
   })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));