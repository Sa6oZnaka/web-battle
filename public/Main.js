import {GameMap} from "./api/GameMap.js";

function setup() {
    let gameMap = new GameMap(10, 10);
    console.log(gameMap.map);
}

function draw() {
    background(55);
    ellipse(50, 50, 80, 80);
}

window.setup = setup;
window.draw = draw;