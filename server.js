import {GameMap} from "./public/api/GameMap";
import {Player} from "./public/api/Player.js";

let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.use(express.static("public"));

let gameMap = new GameMap(500, 500);
let players = new Map();

io.on('connection', function (socket) {
    console.log(`ID ${socket.id} connected!`);

    socket.emit('init', {
        'gameMap': gameMap,
        'players' : JSON.stringify(Array.from(players))
    });

    socket.on('spawn', function (username) {
        console.log("Spawn called!");

        let color = [];
        color.push(Math.floor(Math.random() * 255));
        color.push(Math.floor(Math.random() * 255));
        color.push(Math.floor(Math.random() * 255));

        let player = new Player(color);
        players.set(socket.id, player);

        let data = {
            'id' : socket.id,
            'color' : color
        };

        io.emit('spawn', data);
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

        players.delete(socket.id);
        gameMap.deleteOwner(socket.id);

        io.emit('delete', {
            'id': socket.id
        });
        console.log(`ID ${socket.id} disconnected!`);
    });
});

http.listen(3000, function () {
    console.log("server started on port 3000");
});

