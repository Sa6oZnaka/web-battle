import {Player} from "./public/api/Player.js";
import {Room} from "./public/api/Room.js";


import { createServer } from "http";
import { Server } from "socket.io";
import express from 'express';

const app = express(); 
const server = createServer(app); 
const socketio = new Server(server);


app.use(express.static("public"));

const mapSizeX = 100,
    mapSizeY = 100;

let rooms = [];

io.on('connection', function (socket) {
    console.log(`ID ${socket.id} connected!`);

    socket.on('joinRoom', function (room) {
        if (!rooms.includes(room)) {
            rooms.push(new Room(room, mapSizeX, mapSizeY));
        }
        console.log(socket.id + " Joined " + room);
        socket.join(room);
    });

    socket.emit('init', {});

    socket.on('spawn', function (username, room) {

        if (!rooms.find(r => r.name === room)) {
            rooms.push(new Room(room, mapSizeX, mapSizeY));
            console.log("Room " + room + " created!");
        }
        socket.join(room);
        console.log(socket.id + " Joined " + room);

        let color = [];
        color.push(Math.floor(Math.random() * 255));
        color.push(Math.floor(Math.random() * 255));
        color.push(Math.floor(Math.random() * 255));

        let player = new Player(color);
        rooms.filter(r => r.name === room)[0].connect(socket.id, player);

        let data = {
            'id': socket.id,
            'color': color,
            'gameMap': rooms.filter(r => r.name === room)[0].gameMap,
            'players': JSON.stringify(Array.from(rooms.filter(r => r.name === room)[0].players))
        };

        let data2 = {
            'id': socket.id,
            'player': player
        };

        socket.broadcast.to(room).emit('newPlayer', data2);
        socket.emit('spawn', data);
    });

    socket.on('update', function (data) {
        if (rooms
            .filter(r => r.players.has(socket.id))[0]
            .gameMap.setField(data.x, data.y, socket.id, data.type))

            socket.broadcast.to(data.room).emit('update', data);
    });

    socket.on('updateBuildings', function (data) {
        if(! rooms.find(r => r.players.has(socket.id))) return;
        rooms
            .filter(r => r.players.has(socket.id))[0]
            .gameMap.map[data.y][data.x].buildings = data.buildings;

        socket.broadcast.to(data.room).emit('updateBuildings', data);
    });

    socket.on('updateOwner', function (data) {
        if(! rooms.find(r => r.players.has(socket.id))) return;
        if (rooms
            .filter(r => r.players.has(socket.id))[0]
            .gameMap.updateOwner(data.x, data.y, socket.id))

            socket.broadcast.to(data.room).emit('updateOwner', data);
    });

    socket.on('disconnect', function () {

        let r = rooms.filter(r => r.players.has(socket.id))[0];
        if(r === undefined) return;
        r.leave(socket.id);
        r.gameMap.deleteOwner(socket.id);

        socket.broadcast.to(r.name).emit('delete', {
            'id': socket.id
        });
        console.log(`ID ${socket.id} disconnected!`);
    });
});

let port = process.env.PORT || 3000;
http.listen(port, function () {
    console.log("server started on port " + port);
});

