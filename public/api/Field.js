import {Resource} from "./Resource.js";
import {FieldEnum} from "./FieldEnum.js";

export class Field {

    constructor(name, owner){
        this.name = name;
        this.owner = owner;

        if(name === undefined){
            this.name = Field.randomName();
        }

        this.resources = [];
        this.generateResources(name);
    }

    generateResources(name){
        if(name === FieldEnum.FOREST[0]){
            let resource = new Resource("Wood", Math.floor(Math.random() * 100), 10);
            this.addResource(resource);
        }
    }

    addResource(resource){
        this.resources.push(resource);
    }

    setOwner(owner){
        this.owner = owner;
    }

    static randomName(){
        let name = FieldEnum.PLAINS;
        if (Math.random() < 0.5) {
            name = FieldEnum.FOREST;
        }else if(Math.random() < 0.25){
            name = FieldEnum.MOUNTAIN;
        }
        return name;
    }

}