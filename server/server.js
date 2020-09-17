require(`dotenv`).config();

const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ }; //{ perMessageDeflate: false }
const io = require('socket.io')(server, options);

//Set up Express to store game-state in redis cache via express-session
//https://flaviocopes.com/express-sessions/#:~:text=That's%20what%20sessions%20are.,maintained%20by%20the%20Express%20team.&text=After%20this%20is%20done%2C%20all,routes%20are%20now%20using%20sessions.

io.on('connection', socket => { 
    console.log(`Socket Connected`, socket.id)
    socket.emit("message", {note: "I am your server"})

    socket.on('click', socket=>{
       console.log(socket)
    })
 });


server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));