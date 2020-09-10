require(`dotenv`).config();

const express = require(`express`);
const app = express();
const options = {};
const http = require(`http`).Server(app);
const io = require("socket.io").listen(http);//, { perMessageDeflate: false }
const port = process.env.PORT;
const cors = require('cors');
app.use(cors);

app.get(`/`, (req, res)=>{
    res.send(`Hello world`)

    io.on(`connection`, socket=> {
        console.log(`Socket Connected`, socket)
        io.emit("message", {note: "I am your server"})
    })
});


app.listen(port, ()=>{
    console.log(`Server is listening on port ${port}`)
})