import {Field} from "./Field.js";

export class GameMap {

    constructor(sizeX, sizeY){
        this.map = GameMap.init(sizeX, sizeY);
    }

    static init(x, y){
        let array = [];
        for (let i = 0; i < y; ++i) {
            array[i] = [];
            for (let j = 0; j < x; ++j) {
                array[i][j] = new Field("Forest");
            }
        }
        return array;
    }

    getField(x, y){
        return this.map[y][x];
    }

}

