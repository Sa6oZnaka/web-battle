import {GameMap} from "./api/GameMap.js";
import {Hex} from "./api/Hex.js";
import {FieldEnum} from "./enums/FieldEnum.js";
import {Menu} from "./api/menu/Menu.js";
import {BuildingFactory} from "./factories/BuildingFactory.js";
import {BuildingMenu} from "./api/menu/BuildingMenu.js";

const socket = io();
const hex = new Hex();
const room = 'room1';
const canvasX = 1280,
    canvasY = 720;

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

// menu
let mSizeX = canvasX * 0.75, mSizeY = canvasY * 0.75;
let beginX = (canvasX - mSizeX) / 2,
    beginY = (canvasY - mSizeY) / 2;
let menu = new Menu("Test", beginX, beginY, mSizeX, mSizeY, [], null);
menu.opened = false;

new p5(function (p5) {

    p5.preload = function () {
        forestLayer = p5.loadImage("./assets/tree.png");
        mountainLayer = p5.loadImage("./assets/mountain.png");
    };

    p5.setup = function () {
        p5.createCanvas(canvasX, canvasY);
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

        if (menu.opened) {
            menu.draw(p5);
        }

    };

    p5.mouseClicked = function () {
        if (menu.opened) {

            menu.click(p5.mouseX, p5.mouseY);

            if (menu.buttonBar[0].click(p5.mouseX, p5.mouseY) && menu.buttonBar[0].name !== undefined) {
                menu = new BuildingMenu(gameMap.map[menu.pos.y][menu.pos.x].buildings[0].name, beginX, beginY, mSizeX, mSizeY, gameMap.map[menu.pos.y][menu.pos.x].buildings[0], menu.pos);
                menu.opened = true;
            } else if (menu.buttonBar[gameMap.map[menu.pos.y][menu.pos.x].buildings.length].click(p5.mouseX, p5.mouseY) && menu instanceof Menu) {
                gameMap.map[menu.pos.y][menu.pos.x].buildings.push(BuildingFactory.mine());
                menu.buttonBar[gameMap.map[menu.pos.y][menu.pos.x].buildings.length - 1].name = gameMap.map[menu.pos.y][menu.pos.x].buildings[gameMap.map[menu.pos.y][menu.pos.x].buildings.length - 1].name;

                socket.emit('updateBuildings', {
                    "x": menu.pos.x,
                    "y": menu.pos.y,
                    "id": socket.id,
                    "buildings": gameMap.map[menu.pos.y][menu.pos.x].buildings,
                    "room": room
                });
            }
        } else {
            if (mouseDragged)
              return;

            let retPos = hex.getHexPos(p5.mouseX - camX, p5.mouseY - camY, r);
            if (retPos.x % 2 !== 0) {
                retPos.y--;
            }

            if (!gameMap.outOfBonds(retPos.x, retPos.y)) {
                if (gameMap.map[retPos.y][retPos.x].owner === socket.id) {
                    menu = new Menu(gameMap.map[retPos.y][retPos.x].name, beginX, beginY, mSizeX, mSizeY, gameMap.map[retPos.y][retPos.x].buildings, retPos);
                } else {
                    socket.emit('updateOwner', {
                        "x": retPos.x,
                        "y": retPos.y,
                        "id": socket.id,
                        "room": room
                    });
                    gameMap.map[retPos.y][retPos.x].owner = socket.id;
                }
            }
        }
    };

    p5.mousePressed = function () {
        offSetX = p5.mouseX;
        offSetY = p5.mouseY;

        mousePressed = true;
        mouseDragged = false;
    };

    p5.mouseDragged = function () {
        if (menu.opened) return;

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

        if (menu.opened) return;

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

socket.on('updateBuildings', function (data) {
    gameMap.map[data.y][data.x].buildings = data.buildings;
});

socket.on('delete', function (data) {
    gameMap.deleteOwner(data.id);
});

socket.on('init', function (data) {
    socket.emit('spawn', "Username", room);
});
