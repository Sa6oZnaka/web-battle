import {GameMap} from "./api/GameMap.js";
import {Hex} from "./api/Hex.js";

const socket = io();

const hex = new Hex();
const r = 70,
    sizeX = r * 2,
    sizeY = Math.sqrt(3) * r;

let forestLayer,
    mountainLayer;

let gameMap = new GameMap(10, 10);
let camX = 0,
    camY = 0;

let offSetX = 0,
    offSetY = 0;

let pressed = false;

new p5(function (p5) {

    p5.preload = function () {
        forestLayer = p5.loadImage("./assets/tree.png");
        mountainLayer = p5.loadImage("./assets/mountain.png");
    };

    p5.setup = function () {
        p5.createCanvas(1280, 720);

        socket.emit('spawn', "/* IDK */");
    };

    p5.draw = function () {
        p5.background(55);

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {

                let additionalY = 0;
                if (j % 2 !== 0) {
                    additionalY += sizeY / 2;
                }

                if (gameMap.getField(j, i).owner === socket.id) {
                    p5.fill(90, 0, 32);
                } else {
                    p5.fill(8, 62, 0);
                }

                hex.draw(p5, j * (sizeX - sizeX / 4) + camX, i * sizeY + additionalY + camY, sizeX, sizeY);
                if (gameMap.getField(j, i).name === "Forest") {
                    p5.image(forestLayer, j * (sizeX - sizeX / 4) + camX, i * sizeY + additionalY + camY, sizeX, sizeY);
                }
                if (gameMap.getField(j, i).name === "Mountain") {
                    p5.image(mountainLayer, j * (sizeX - sizeX / 4) + camX, i * sizeY + additionalY + camY, sizeX, sizeY);
                }

            }
        }
    };

    p5.mouseClicked = function () {
        let retPos = hex.getHexPos(p5.mouseX - camX, p5.mouseY - camY, r);

        if (retPos.x % 2 !== 0) {
            retPos.y--;
        }
        if (retPos.x >= 0 && retPos.y >= 0) {
            socket.emit('update', {
                "x": retPos.x,
                "y": retPos.y,
                "id": socket.id,
                "type": "Mountain"
            });

            gameMap.map[retPos.y][retPos.x].name = "Mountain";
            gameMap.map[retPos.y][retPos.x].owner = socket.id;
        }
    };

    p5.mousePressed = function () {
        console.log("Pressed!");
        offSetX = p5.mouseX;
        offSetY = p5.mouseY;
        pressed = true;
    };

    p5.mouseDragged = function () {
        camX += (p5.mouseX - offSetX);
        camY += (p5.mouseY - offSetY);

        offSetX = p5.mouseX;
        offSetY = p5.mouseY;
    };

    p5.mouseReleased = function () {
        pressed = false;
    }

});

socket.on('spawn', function (data) {

});

socket.on('update', function (data) {
    gameMap.setField(data.x, data.y, data.id, data.type);
});

socket.on('delete', function (data) {

});

socket.on('init', function (data) {
    gameMap.map = data.gameMap.map;
});
