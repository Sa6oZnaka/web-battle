import {GameMap} from "./public/api/GameMap";

let a = new GameMap(10, 10);
console.log(a);


let express = require('express');
let app = express();
let http = require('http').Server(app);
let io = require('socket.io')(http);


app.use(express.static("public"));


io.on('connection', function (socket) {
    console.log(`ID ${socket.id} connected!`);

});

http.listen(3000, function() {
    console.log("server started on port 3000");
});

