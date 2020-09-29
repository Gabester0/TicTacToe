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

//Set up Express to store game-state in redis cache via express-session
//https://redislabs.com/solutions/use-cases/caching/
//To Start Redis: In File Explorer travel to Programs/redis/64bit and double click on redis-server.exe
//OR
// From server folder command line:
// Enter `../../../../Programs/redis-2.4.5-win32-win64/64bit`
// And Enter `redis-server`
const { moduleTest } = require('./gameLogic/board');

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
   
   redisClient.set(socket.id, `Redis Connected with Socket ID: ${socket.id}`)

   socket.on('click', socket=>{
      console.log(socket)
      redisClient.get(socket.id, (err, value)=>{
         console.log(value)
      })
   })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));