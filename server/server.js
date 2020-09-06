const express = require(`express`);
const app = express();
require(`dotenv`).config();
const options = {}
const io = require(`socket.io`)(app, options)
const port = process.env.PORT;

app.get(`/`, (req, res)=>{
    res.send(`Hello world`)
});

app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})