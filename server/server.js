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

   socket.on(`initiatePlayAgain`, async({game, client})=>{
      console.log(`Player ${client} from ${game} game initiated play again.`)
      //Set this clients playAgain status to true
      await redisClient.setAsync(`${game}.${client}PlayAgain`, true)

      //Check other clients playAgain status
      const otherPlayer = client === `X` ? `O` : `X`;
      const otherPlayerReady = await redisClient.getAsync(`${game}.${otherPlayer}PlayAgain`)

      if(otherPlayerReady){
         //call resetBoard
      } else {
         //emit to room invitation to playAgain
// On client: store playAgain status
// Show we are waiting for other player if player clicked playAgain

// Or, if user clicks play again button, can we just leave room and findGame again?
// Probably just as simple as calling socket.leave('room') and then calling findGame()
// This way nobody has to wait for the other player and can just be dropped in next available game
      }
      // await redisClient.setAsync(`${game}.xPlayAgain`, false)
      // await redisClient.setAsync(`${game}.oPlayAgain`, false)
      // io.to(game).emit(``)
      //How do I handle inviting the other player to play again?  Emit to just other player?
   })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));