require(`dotenv`).config();

const app = require('express')();
const server = require('http').createServer(app);
const options = { /* ... */ }; //{ perMessageDeflate: false }
const io = require('socket.io')(server, options);

// app.get(`/`, (req, res)=>{
//     res.send(`Hello world from ${process.env.PORT}`)
// });

io.on('connection', socket => { 
    console.log(`Socket Connected`, socket.id)
    socket.emit("message", {note: "I am your server"})
 });

 io.on('click', (data)=>{
    console.log(`Player ${data.player} clicked ${data.clicked} `)
 })

server.listen(process.env.PORT, ()=> console.log(`Server is listening on ${process.env.PORT}`));