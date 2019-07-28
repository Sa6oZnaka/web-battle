import {GameMap} from "./api/GameMap.js";
import {Hex} from "./api/Hex.js";

let socket = io();
let gameMap = new GameMap(10, 10);

const r = 70,
    sizeX = r * 2,
    sizeY = Math.sqrt(3) * r;

let img;
let hex = new Hex();

new p5(function (p5) {

    p5.preload = function () {
        img = p5.loadImage("./assets/tree.png");
    };

    p5.setup = function () {
        p5.createCanvas(1280, 720);

        socket.emit('spawn', "/* IDK */");

        console.log(gameMap.map);
    };

    p5.draw = function () {
        p5.background(55);

        p5.fill(90, 43, 32);
        p5.stroke(0);
        p5.strokeWeight(2);

        gameMap.map[2][3].name = "Iron";

        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {

                let additionalY = 0;
                if (j % 2 !== 0) {
                    additionalY += sizeY / 2;
                }

                if (gameMap.getField(j, i).owner === socket.id) {
                    p5.fill(90, 0, 32);
                } else {
                    p5.fill(90, 43, 32);
                }

                hex.draw(p5, j * (sizeX - sizeX / 4), i * sizeY + additionalY, sizeX, sizeY);
                if (gameMap.getField(j, i).name === "Forest") {
                    p5.image(img, j * (sizeX - sizeX / 4), i * sizeY + additionalY, sizeX, sizeY);
                }

            }
        }
    };

    p5.mouseClicked = function () {
        let retPos = hex.getHexPos(p5.mouseX, p5.mouseY, r);

        if (retPos.x % 2 !== 0) {
            retPos.y--;
        }
        if (retPos.x >= 0 && retPos.y >= 0) {
            socket.emit('update', {
                "x": retPos.x,
                "y": retPos.y,
                "id": socket.id,
                "type": "Iron"
            });

            console.error(socket.id);
            gameMap.map[retPos.y][retPos.x].name = "Iron";
            gameMap.map[retPos.y][retPos.x].owner = socket.id;
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
