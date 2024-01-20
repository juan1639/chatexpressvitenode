import express from "express";
import http from 'http';
import { Server as SocketServer } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new SocketServer(server);

/* const io = new SocketServer(server, {
    cors: {
        origin: 'http://localhost:5173'
    }
}); */

io.on('connection', socket => {

    console.log('cliente conectado', socket.id);

    socket.on('message', (data) => {

        console.log(data);
        socket.broadcast.emit('message', data);

    });
});

server.listen(3000);
console.log('server on port', 3000);

