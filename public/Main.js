import {GameMap} from "./api/GameMap.js";

function setup() {
    createCanvas(1280, 720);

    console.log(gameMap.map);
}

let gameMap = new GameMap(10, 10);

let r = 70,
    sizeX = r * 2,
    sizeY = Math.sqrt(3) * r;

function draw() {
    background(55);

    fill(90, 43, 32);
    stroke(77);
    strokeWeight(2);

    gameMap.map[2][3].name = "Iron";

    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            if (gameMap.getField(j, i).name === "Forest") {
                fill(90, 4, 0);
            } else {
                fill(0, 0, 0);
            }

            if (j % 2 === 0) {
                hexagon(j * (sizeX - sizeX / 4), i * sizeY, sizeX, sizeY);
            } else {
                hexagon(j * (sizeX - sizeX / 4), i * sizeY + sizeY / 2, sizeX, sizeY);
            }
        }
    }
}

function hexagon(x, y, sizeX, sizeY) {
    push();
    translate(x, y);
    beginShape();
    vertex(sizeX / 4, 0);
    vertex(sizeX - sizeX / 4, 0);
    vertex(sizeX, sizeY / 2);
    vertex(sizeX - sizeX / 4, sizeY);
    vertex(sizeX / 4, sizeY);
    vertex(0, sizeY / 2);
    endShape(CLOSE);
    pop();
}

function mouseClicked() {

    let x = Math.floor(mouseX / sizeX);
    let y = Math.floor(mouseY / sizeY);

    let retPos = getHex(mouseX, mouseY);
    console.log(retPos);
    if (retPos.x % 2 !== 0) {
        retPos.y--;
    }
    if (retPos.x >= 0 && retPos.y >= 0) {
        gameMap.map[retPos.y][retPos.x].name = "Iron";
    }
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

window.setup = setup;
window.draw = draw;
window.onmousedown = mouseClicked;
