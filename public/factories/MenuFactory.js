import {Menu} from "../api/menu/Menu.js";
import {TextButton} from "../api/menu/TextButton.js";
import {ImageButton} from "../api/menu/ImageButton.js";
import {MenuComponent} from "../api/menu/MenuComponent.js";
import {AmountAdjuster} from "../api/menu/AmountAdjuster.js";
import {BuildingFactory} from "./BuildingFactory.js";

export class MenuFactory {

    static fieldMenu(name, buildings, textures) {

        let components = new Map();
        components.set("menu", new MenuComponent(160, 90, 960, 540));
        components.set("backButton", new TextButton(160, 90, 120, 50, "Back"));
        for (let i = 0; i < 6; i++) {
            if (buildings[i] !== undefined) {
                components.set("button" + i, (new ImageButton(160 * (i + 1), 90 + 180, 155, 200, buildings[i].name, buildings[i].level, textures.get(buildings[i].name))));
            } else {
                components.set("button" + i, (new ImageButton(160 * (i + 1), 90 + 180, 155, 200)));
            }
        }

        return new Menu(name, components);
    }

    static newBuildingMenu(textures) {

        let buildings = [BuildingFactory.mine(), BuildingFactory.sawmill()];

        let components = new Map();
        components.set("menu", new MenuComponent(160, 90, 960, 540));
        components.set("backButton", new TextButton(160, 90, 120, 50, "Back"));
        for (let i = 0; i < 6; i++) {
            if (buildings[i] !== undefined) {
                components.set("button" + i, (new ImageButton(160 * (i + 1), 90 + 180, 155, 200, buildings[i].name, buildings[i].level, textures.get(buildings[i].name))));
            } else {
                components.set("button" + i, (new ImageButton(160 * (i + 1), 90 + 180, 155, 200)));
            }
        }

        return new Menu(2, components);
    }

    static buildingMenu(name, buildings, textures) {

        let components = new Map();
        components.set("menu", new MenuComponent(160, 90, 960, 540));
        components.set("backButton", new TextButton(160, 90, 120, 50, "Back"));

        for (let i = 0; i < 6; i++) {
            if (buildings.resources[i] !== undefined) {
                components.set("button" + i, (new ImageButton(160 * (i + 1), 90 + 180, 155, 200, buildings.resources[i].name, buildings.resources[i].amount, textures.get(buildings.resources[i].name))));
                components.set("adjuster" + i, (new AmountAdjuster(160 * (i + 1), 90 + 400, 155, 200, buildings.resources[i])));
            } else {
                components.set("button" + i, (new ImageButton(160 * (i + 1), 9, 155, 200)));
            }
        }

        return new Menu(name, components);
    }
}