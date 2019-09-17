import {Building} from "../api/Building.js";
import {BuildingEnum} from "../enums/BuildingEnum.js";
import {Resource} from "../api/Resource.js";
import {ResourceEnum} from "../enums/ResourceEnum.js";

export class BuildingFactory {

    static mine() {
        let upgrades = [
            [new Resource(ResourceEnum.GOLD, 1)],
            [new Resource(ResourceEnum.GOLD, 5), new Resource(ResourceEnum.ROCK, 100), new Resource(ResourceEnum.WOOD, 50)],
            [new Resource(ResourceEnum.GOLD, 15), new Resource(ResourceEnum.ROCK, 200), new Resource(ResourceEnum.WOOD, 100), new Resource(ResourceEnum.IRON, 20)],
            [new Resource(ResourceEnum.GOLD, 50), new Resource(ResourceEnum.WOOD, 400), new Resource(ResourceEnum.IRON, 50)],
            [new Resource(ResourceEnum.GOLD, 200), new Resource(ResourceEnum.WOOD, 800), new Resource(ResourceEnum.IRON, 100)]
        ];

        let required = [
            [new Resource(ResourceEnum.FOOD, 10), new Resource(ResourceEnum.COAL, 5)],
            [new Resource(ResourceEnum.FOOD, 20), new Resource(ResourceEnum.COAL, 10)],
            [new Resource(ResourceEnum.FOOD, 40), new Resource(ResourceEnum.COAL, 20)],
            [new Resource(ResourceEnum.FOOD, 80), new Resource(ResourceEnum.COAL, 40)],
            [new Resource(ResourceEnum.FOOD, 160), new Resource(ResourceEnum.COAL, 80)]
        ];

        let products = [
            [new Resource(ResourceEnum.STONES, 50), new Resource(ResourceEnum.COAL, 10)],
            [new Resource(ResourceEnum.STONES, 100), new Resource(ResourceEnum.COAL, 20), new Resource(ResourceEnum.IRON, 5)],
            [new Resource(ResourceEnum.STONES, 200), new Resource(ResourceEnum.COAL, 40), new Resource(ResourceEnum.IRON, 10), new Resource(ResourceEnum.GOLD, 5)],
            [new Resource(ResourceEnum.STONES, 400), new Resource(ResourceEnum.COAL, 80), new Resource(ResourceEnum.IRON, 20), new Resource(ResourceEnum.GOLD, 10)],
            [new Resource(ResourceEnum.STONES, 800), new Resource(ResourceEnum.COAL, 160), new Resource(ResourceEnum.IRON, 40), new Resource(ResourceEnum.GOLD, 20)]
        ];

        return new Building(BuildingEnum.MINE, upgrades, required, products);
    }


}