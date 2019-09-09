import {GameMap} from "./api/GameMap.js";
import {Hex} from "./api/Hex.js";
import {FieldEnum} from "./enums/FieldEnum.js";

const socket = io();
const hex = new Hex();
const room = 'room1';

let r = 70,
    sizeX = r * 2,
    sizeY = Math.sqrt(3) * r;

let gameMap = new GameMap(0, 0);
let players = new Map();

// mouse movement
let camX = 0,
    camY = 0,
    offSetX = 0,
    offSetY = 0,
    mousePressed = false,
    mouseDragged = false;

// textures
let forestLayer,
    mountainLayer;

new p5(function (p5) {

    p5.preload = function () {
        forestLayer = p5.loadImage("./assets/tree.png");
        mountainLayer = p5.loadImage("./assets/mountain.png");
    };

    p5.setup = function () {
        p5.createCanvas(1280, 720);

        //socket.emit('spawn', "");
    };

    p5.draw = function () {
        p5.background(55);

        for (let i = 0; i < gameMap.map.length; i++) {
            for (let j = 0; j < gameMap.map[0].length; j++) {

                // skip is player's camera can't see the field
                if ((i + 2) * sizeY < -camY ||
                    (j + 2) * (sizeX - sizeX / 4) < -camX ||
                    (i) * sizeY - p5.height > -camY ||
                    (j) * (sizeX - sizeX / 4) - p5.width > -camX) {
                    continue;
                }

                let additionalY = 0;
                if (j % 2 !== 0) {
                    additionalY += sizeY / 2;
                }

                p5.strokeWeight(0.5);
                p5.fill(7, 7, 7);
                p5.fill(8, 62, 0);

                hex.draw(p5, j * (sizeX - sizeX / 4) + camX, i * sizeY + additionalY + camY, sizeX, sizeY);
                if (gameMap.getField(j, i).name === FieldEnum.FOREST) {
                    p5.image(forestLayer, j * (sizeX - sizeX / 4) + camX, i * sizeY + additionalY + camY, sizeX, sizeY);
                }
                if (gameMap.getField(j, i).name === FieldEnum.MOUNTAIN) {
                    p5.image(mountainLayer, j * (sizeX - sizeX / 4) + camX, i * sizeY + additionalY + camY, sizeX, sizeY);
                }

                if (gameMap.getField(j, i).owner !== null) {
                    let c = players.get(gameMap.getField(j, i).owner).color;
                    p5.fill(c[0], c[1], c[2], 80);
                    hex.draw(p5, j * (sizeX - sizeX / 4) + camX, i * sizeY + additionalY + camY, sizeX, sizeY);
                }
            }
        }

    };

    p5.mouseClicked = function () {
        if (mouseDragged)
            return;

        let retPos = hex.getHexPos(p5.mouseX - camX, p5.mouseY - camY, r);

        if (retPos.x % 2 !== 0) {
            retPos.y--;
        }

        if (! gameMap.outOfBonds(retPos.x, retPos.y)) {
            socket.emit('updateOwner', {
                "x": retPos.x,
                "y": retPos.y,
                "id": socket.id,
                "room": room
            });
            gameMap.map[retPos.y][retPos.x].owner = socket.id;
        }
    };

    p5.mousePressed = function () {
        offSetX = p5.mouseX;
        offSetY = p5.mouseY;

        mousePressed = true;
        mouseDragged = false;
    };

    p5.mouseDragged = function () {
        mouseDragged = true;

        camX += (p5.mouseX - offSetX);
        camY += (p5.mouseY - offSetY);

        offSetX = p5.mouseX;
        offSetY = p5.mouseY;
    };

    p5.mouseReleased = function () {
        mousePressed = false;
    };

    p5.mouseWheel = function (event) {

        if (r - event.delta / 10 > 25 && r - event.delta / 10 < 150) {
            r -= event.delta / 10;

            let oldSizeX = sizeX;
            let oldSizeY = sizeY;

            sizeX = r * 2;
            sizeY = Math.sqrt(3) * r;

            let diffX = r * 2 / oldSizeX;
            let diffY = Math.sqrt(3) * r / oldSizeY;

            camX -= diffX * (p5.mouseX - camX) + camX - p5.mouseX;
            camY -= diffY * (p5.mouseY - camY) + camY - p5.mouseY;

        }
    }

});

socket.on('spawn', function (data) {
    gameMap.map = data.gameMap.map;
    players = new Map(JSON.parse(data.players));
});

socket.on('newPlayer', function (data) {
    players.set(data.id, data.player);
});

socket.on('update', function (data) {
    gameMap.setField(data.x, data.y, data.id, data.type);
});

socket.on('updateOwner', function (data) {
    gameMap.updateOwner(data.x, data.y, data.id);
});

socket.on('delete', function (data) {
    gameMap.deleteOwner(data.id);
});

socket.on('init', function (data) {
    socket.emit('spawn', "Username", room);
});
