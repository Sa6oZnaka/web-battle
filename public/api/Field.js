import {Resource} from "./Resource.mjs";

export class Field {

    constructor(name){
        this.name = name;
        this.owner = null;

        this.resources = [];
        this.generateResources(name);
    }

    generateResources(name){
        if(name === "Forest"){
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

}