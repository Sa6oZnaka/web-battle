import {GameMap} from "./api/GameMap.js";

let socket = io();
let gameMap = new GameMap(10, 10);

const r = 70,
    sizeX = r * 2,
    sizeY = Math.sqrt(3) * r;

let img;

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
                if(j % 2 !== 0){
                    additionalY += sizeY / 2;
                }

                hexagon(p5, j * (sizeX - sizeX / 4), i * sizeY + additionalY, sizeX, sizeY);
                if(gameMap.getField(j, i).name === "Forest") {
                    p5.image(img, j * (sizeX - sizeX / 4), i * sizeY + additionalY, sizeX, sizeY);
                }

            }
        }
    };

    p5.mouseClicked = function () {
        let retPos = getHex(p5.mouseX, p5.mouseY);
        console.log(retPos);
        if (retPos.x % 2 !== 0) {
            retPos.y--;
        }
        if (retPos.x >= 0 && retPos.y >= 0) {
            socket.emit('update', {
                "x" : retPos.x,
                "y" : retPos.y,
                "type" : "Iron"
            });
            gameMap.map[retPos.y][retPos.x].name = "Iron";
        }
    }

});

function hexagon(p5, x, y, sizeX, sizeY) {
    p5.push();
    p5.translate(x, y);
    p5.beginShape();
    p5.vertex(sizeX / 4, 0);
    p5.vertex(sizeX - sizeX / 4, 0);
    p5.vertex(sizeX, sizeY / 2);
    p5.vertex(sizeX - sizeX / 4, sizeY);
    p5.vertex(sizeX / 4, sizeY);
    p5.vertex(0, sizeY / 2);
    p5.endShape(p5.CLOSE);
    p5.pop();
}

function getHex(x, y) {
    let retPos = {};
    let xa, ya, xpos, xx, yy, r2, h2;
    r2 = r / 2;
    h2 = sizeY / 2;
    xx = Math.floor(x / r2);
    yy = Math.floor(y / h2);
    xpos = Math.floor(xx / 3);
    xx %= 6;
    if (xx % 3 === 0) {      // column with diagonals
        xa = (x % r2) / r2;  // to find the diagonals
        ya = (y % h2) / h2;
        if (yy % 2 === 0) {
            ya = 1 - ya;
        }
        if (xx === 3) {
            xa = 1 - xa;
        }
        if (xa > ya) {
            retPos.x = xpos + (xx === 3 ? -1 : 0);
            retPos.y = Math.floor(yy / 2);
            return retPos;
        }
        retPos.x = xpos + (xx === 0 ? -1 : 0);
        retPos.y = Math.floor((yy + 1) / 2);
        return retPos;
    }
    if (xx < 3) {
        retPos.x = xpos + (xx === 3 ? -1 : 0);
        retPos.y = Math.floor(yy / 2);
        return retPos;
    }
    retPos.x = xpos + (xx === 0 ? -1 : 0);
    retPos.y = Math.floor((yy + 1) / 2);

    return retPos;
}



socket.on('spawn', function (data) {
    gameMap = data;
});

socket.on('update', function (data) {
    gameMap.setField(data.x, data.y, socket.id, "Iron");
});

socket.on('delete', function (data) {
    //vehs.delete(data.id);
});

socket.on('init', function (data) {
    console.warn(data.gameMap);
    gameMap.map = data.gameMap.map;
    console.log(gameMap);
});
