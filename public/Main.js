import {GameMap} from "./api/GameMap.js";
import {Hex} from "./api/Hex.js";

const socket = io();
const hex = new Hex();

let r = 70,
    sizeX = r * 2,
    sizeY = Math.sqrt(3) * r;

let forestLayer,
    mountainLayer;

let gameMap = new GameMap(15, 10);
gameMap.map = [[]];

let camX = 0,
    camY = 0,
    offSetX = 0,
    offSetY = 0,
    mousePressed = false,
    mouseDragged = false;

new p5(function (p5) {

    p5.preload = function () {
        forestLayer = p5.loadImage("./assets/tree.png");
        mountainLayer = p5.loadImage("./assets/mountain.png");
    };

    p5.setup = function () {
        p5.createCanvas(1280, 720);

        socket.emit('spawn', "/* IDK */");
    };

    let a  = 0;
    p5.draw = function () {
        p5.background(55);

        a ++;
        if(a > 100) {
            console.log(camX);
        }

        for (let i = 0; i < gameMap.map.length; i++) {
            for (let j = 0; j < gameMap.map[0].length; j++) {

                // skip is player's camera can't see the field
                if((i + 2) * sizeY < -camY ||
                    (j + 2) * (sizeX - sizeX/4) < -camX ||
                    (i) * sizeY - p5.height > -camY ||
                    (j) * (sizeX - sizeX/4) - p5.width > -camX){
                    continue;
                }

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
        if (mouseDragged)
            return;

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

        if(r - event.delta / 10 > 25 && r - event.delta / 10 < 150) {
            r -= event.delta / 10;

            let oldSizeX = sizeX;
            let oldSizeY = sizeY;

            sizeX = r * 2;
            sizeY = Math.sqrt(3) * r;

            let diffX = r * 2 / oldSizeX;
            let diffY = Math.sqrt(3) * r / oldSizeY;

            camX -= diffX * (p5.width / 2 - camX) + camX - p5.width/2;
            camY -= diffY * (p5.height / 2 - camY) + camY - p5.height/2;

        }
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
