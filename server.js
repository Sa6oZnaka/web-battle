import {GameMap} from "./public/api/GameMap";

let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static("public"));

let gameMap = new GameMap(500, 500);

io.on('connection', function (socket) {
    console.log(`ID ${socket.id} connected!`);

    socket.emit('init', {
        'gameMap': gameMap
    });

    socket.on('spawn', function (data) {

    });

    socket.on('update', function (data) {
        gameMap.setField(data.x, data.y, socket.id, data.type);

        socket.broadcast.emit('update', data);
    });

    socket.on('updateOwner', function (data) {
        gameMap.updateOwner(data.x, data.y, socket.id);

        socket.broadcast.emit('updateOwner', data);
    });

    socket.on('disconnect', function () {
        console.log(`ID ${socket.id} disconnected!`);
        io.emit('delete', {
            'id': socket.id
        });
    });
});

http.listen(3000, function () {
    console.log("server started on port 3000");
});

