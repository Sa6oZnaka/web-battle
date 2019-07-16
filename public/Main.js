import {GameMap} from "./api/GameMap.js";

function setup() {
    createCanvas(1280, 720);

    let gameMap = new GameMap(10, 10);
    console.log(gameMap.map);
}

function draw() {
    fill(9, 43, 0);
    background(55);
    ellipse(50, 50, 80, 80);

    fill(90, 43, 32);
    stroke(255);
    strokeWeight(5);

    let sizeX = 70,
        sizeY = 70;

    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            if (j % 2 === 0) {
                hexagon(j * (sizeX - sizeX/4), i * sizeY, sizeX, sizeY);
            } else {
                hexagon(j * (sizeX - sizeX/4), i * sizeY + sizeY/2, sizeX, sizeY);
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

window.setup = setup;
window.draw = draw;