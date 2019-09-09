import {Resource} from "../api/Resource.js";
import {ResourceEnum} from "../enums/ResourceEnum.js";

export class ResourceFactory {

    static forest(){
        return [
            new Resource(ResourceEnum.WOOD, Math.floor(Math.random() * 10000)),
            new Resource(ResourceEnum.ROCK, Math.floor(Math.random() * 500)),
            new Resource(ResourceEnum.IRON, Math.floor(Math.random() * 250)),
            new Resource(ResourceEnum.GOLD, Math.floor(Math.random() * 100)),
            new Resource(ResourceEnum.COAL, Math.floor(Math.random() * 300))
        ];
    }

    static mountain(){
        return [
            new Resource(ResourceEnum.WOOD, Math.floor(Math.random() * 3000)),
            new Resource(ResourceEnum.ROCK, Math.floor(Math.random() * 10000)),
            new Resource(ResourceEnum.IRON, Math.floor(Math.random() * 2500)),
            new Resource(ResourceEnum.GOLD, Math.floor(Math.random() * 1000)),
            new Resource(ResourceEnum.COAL, Math.floor(Math.random() * 4000))
        ];
    }

    static plains(){
        return [
            new Resource(ResourceEnum.WOOD, Math.floor(Math.random() * 100)),
            new Resource(ResourceEnum.ROCK, Math.floor(Math.random() * 300)),
            new Resource(ResourceEnum.IRON, Math.floor(Math.random() * 250)),
            new Resource(ResourceEnum.GOLD, Math.floor(Math.random() * 80)),
            new Resource(ResourceEnum.COAL, Math.floor(Math.random() * 100))
        ];
    }

}