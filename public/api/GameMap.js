import {Field} from "./Field.js";

export class GameMap {

    constructor(sizeX, sizeY) {
        this.map = GameMap.init(sizeX, sizeY);
    }

    static init(x, y) {
        let array = [];
        for (let i = 0; i < y; ++i) {
            array[i] = [];
            for (let j = 0; j < x; ++j) {
                array[i][j] = new Field();
            }
        }
        return array;
    }

    getField(x, y) {
        return this.map[y][x];
    }

    setField(x, y, owner, name) {
        this.map[y][x] = new Field(name, owner);
    }

    updateOwner(x, y, owner) {
        this.map[y][x].owner = owner;
    }

    deleteOwner(owner){
        for(let i =0; i < this.map.length; i ++){
            for(let j = 0; j < this.map[0].length; j ++){
                if(this.map[i][j].owner === owner){
                    this.map[i][j].owner = null;
                }
            }
        }
    }

}

