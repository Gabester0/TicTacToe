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

io.on('connection', socket => { 
   console.log(`Socket Connected`, socket.id)
   socket.emit("message", {note: "I am your server"})
   
   //hset sets a single hash value, hmset sets multiple values
   redisClient.hmset(socket.id, "id", socket.id, "Test", "1,2,3" )
   initiateBoard(redisClient, socket.id);
   socket.on('click', socket=>{
      console.log(socket)
      //hmget is redis method to get multiple key values listed from hash: https://redis.io/commands/hmget
      redisClient.hmget(socket.id, "id", "Test", (err, value)=>{
         console.log(Array.from(value[1].split(',')))
      })
   })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));