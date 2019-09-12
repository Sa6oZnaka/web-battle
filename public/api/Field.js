import {FieldEnum} from "../enums/FieldEnum.js";
import {ResourceFactory} from "../factories/ResourceFactory.js";

export class Field {

    constructor(name) {
        if (name === undefined) {
            this.name = Field.randomName();
        } else {
            this.name = name;
        }

        this.owner = null;
        this.resources = [];
        this.generateResources();
        this.buildings = [];
    }

    generateResources() {
        if(this.name === FieldEnum.FOREST){
            this.resources = ResourceFactory.forest();
        }
        else if(this.name === FieldEnum.MOUNTAIN){
            this.resources = ResourceFactory.mountain();
        }
        else if(this.name === FieldEnum.PLAINS){
            this.resources = ResourceFactory.plains();
        }
    }

    static randomName() {
        let name = FieldEnum.PLAINS;
        if (Math.random() < 0.5) {
            name = FieldEnum.FOREST;
        } else if (Math.random() < 0.25) {
            name = FieldEnum.MOUNTAIN;
        }
        return name;
    }

    addBuidling(buidling){
        this.buildings.push(buidling);
    }

    process(){
        for(let i = 0; i < this.buildings.length; i ++){
            if(this.buildings[i].enoughResources(this.resources, this.buildings[i].getRequired())){
                this.resources = this.buildings.removeResources(this.buildings.getRequired());
            }
        }
    }

}