require(`dotenv`).config();

const express = require(`express`);
const app = express();
const options = {};
const http = require(`http`);
const io = require(`socket.io`)(http);
const port = process.env.PORT;

app.get(`/`, (req, res)=>{
    res.send(`Hello world`)
    io.on(`connection`, socket => {
        console.log(`Socket Connection: ${socket}`)
    })
});


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})