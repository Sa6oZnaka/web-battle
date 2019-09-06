import {GameMap} from "./GameMap.js";

export class Room {

    constructor(name, mapSizeX, mapSizeY){
        this.name = name;
        this.players = new Map();
        this.gameMap = new GameMap(mapSizeY, mapSizeX);
    }

    connect(id, player){
        this.players.set(id, player);
    }

    leave(id){
        this.players.delete(id);
    }

}