import {Resource} from "./Resource.js";
import {ResourceEnum} from "../enums/ResourceEnum.js";

export class Building {

    constructor(name, upgrades, required, products) {
        this.name = name;
        this.level = 1;
        this.resources = [
            new Resource(ResourceEnum.FOOD, 0),
            new Resource(ResourceEnum.COAL, 0),
            new Resource(ResourceEnum.WOOD, 0),
            new Resource(ResourceEnum.STONES, 0),
            new Resource(ResourceEnum.IRON, 0),
            new Resource(ResourceEnum.GOLD, 0)
        ];

        this.required = required;
        this.products = products;
        this.upgrades = upgrades;
    }

    addResources(resources) {
        for (let i = 0; i < resources.length; i++) {
            if (this.resources.find(r => r.name === resources[i].name)) {
                this.resources.filter(r => r.name === resources[i].name)[0].amount += resources[i].amount;
            } else {
                this.resources.push(resources[i]);
            }
        }
    }

    removeResources(resources, remove) {
        if (!this.enoughResources(resources, remove)) {
            return;
        }
        for (let i = 0; i < remove.length; i++) {
            resources.filter(r => r.name === remove[i].name)[0].amount -= remove[i].amount;
        }
    }

    enoughResources(resources, required) {
        for (let i = 0; i < required.length; i++) {
            if (resources.find(r => r.name !== required[i].name) || resources.filter(r => r.name === required[i].name)[0].amount >= required[i].amount) {
                return false;
            }
        }
        return true;
    }

    process() {
        if (this.enoughResources(this.resources, this.required[this.level])) {
            this.removeResources(this.resources, this.required[this.level]);
            this.addResources(this.products[this.level]);
        }
    }

    levelUp() {
        if (this.enoughResources(this.resources, this.upgrades[this.level])) {
            this.removeResources(this.upgrades[this.level]);
            this.level++;
        }
    }

    getRequired() {
        return this.required[this.level];
    }

}