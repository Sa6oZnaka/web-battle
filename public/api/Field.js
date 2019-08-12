import {Resource} from "./Resource.js";

export class Field {

    constructor(name, owner){
        this.name = name;
        this.owner = owner;

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