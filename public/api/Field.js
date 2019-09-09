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
        this.builings = [];
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
        this.builings.push(buidling);
    }

    process(){
        for(let i = 0; i < this.builings.length; i ++){
            if(this.builings[i].enoughResources(this.resources, this.builings[i].getRequired())){
                this.resources = this.builings.removeResources(this.builings.getRequired());
            }
        }
    }

}