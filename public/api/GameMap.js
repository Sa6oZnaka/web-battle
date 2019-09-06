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

    outOfBonds(x, y) {
        return x < 0 || y < 0 || x > this.map[0].length || y > this.map.length;
    }

    getNeighbors(x, y){
        let neighbors = [];

        if(x % 2 === 0){
            if(! this.outOfBonds(x + 1, y - 1))neighbors.push(this.map[y - 1][x + 1]);
            if(! this.outOfBonds(x - 1, y - 1))neighbors.push(this.map[y - 1][x - 1]);
        }else{
            if(! this.outOfBonds(x + 1, y + 1))neighbors.push(this.map[y + 1][x + 1]);
            if(! this.outOfBonds(x - 1, y + 1))neighbors.push(this.map[y + 1][x - 1]);
        }

        if(! this.outOfBonds(x, y - 1))neighbors.push(this.map[y - 1][x]);
        if(! this.outOfBonds(x, y + 1))neighbors.push(this.map[y + 1][x]);
        if(! this.outOfBonds(x - 1, y))neighbors.push(this.map[y][x - 1]);
        if(! this.outOfBonds(x + 1, y))neighbors.push(this.map[y][x + 1]);

        return neighbors;
    }

}

