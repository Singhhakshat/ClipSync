const { Server } = require("socket.io");

const app = require('express')();
const httpServer = require('http').createServer(app);
const io = require("socket.io")(httpServer, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"]
    }
});
const PORT = 4000;

io.on("connection", (socket) => {
    let room = null;

    console.log(`a user connected`);

    socket.on('join', (roomName) => {
        room = roomName;
        socket.join(roomName);
        console.log(`user joined room ${roomName}`);
    })

    socket.on('sendData', (data) => {
        io.in(room).emit('getData',data);
        console.log(data);
    })
});

httpServer.listen(PORT, () =>{
    console.log(`server is listening on port ${PORT}`);
});