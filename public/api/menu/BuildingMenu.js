import {TextButton} from "./TextButton.js";
import {ImageButton} from "./ImageButton.js";
import {AmountAdjuster} from "./AmountAdjuster.js";

export class BuildingMenu extends TextButton {

    constructor(name, beginX, beginY, sizeX, sizeY, building, pos) {
        super(beginX, beginY, sizeX, sizeY);

        this.name = name;
        this.pos = pos;
        this.button = new TextButton(this.beginX, this.beginY, 120, 50, "Back");
        this.buttonBar = [];
        for (let i = 0; i < 6; i++) {
            if (building.resources[i] !== undefined) {
                this.buttonBar.push(new ImageButton(this.beginX * (i + 1), this.beginY + 180, 155, 200, building.resources[i].name, buildings.resources[i].amount));
            } else {
                this.buttonBar.push(new ImageButton(this.beginX * (i + 1), this.beginY + 180, 155, 200));
            }
        }
        this.amountAdjuster = new AmountAdjuster(this.beginX, this.beginY + 400, 155, 18, 200);
        this.putButton = new TextButton(this.beginX, this.beginY + 418, 155, 18, "Put");
    }

    // @Override
    click(mouseX, mouseY) {
        if (this.button.click(mouseX, mouseY)) {
            this.opened = false;
        }
        this.amountAdjuster.click(mouseX, mouseY);
    }

    // @Override
    draw(p5) {

        // background
        p5.fill(255);
        p5.strokeWeight(4);
        p5.rect(this.beginX, this.beginY, this.sizeX, this.sizeY);

        // back button
        this.button.draw(p5);

        // name
        p5.textSize(90);
        p5.fill(0, 102, 153);
        p5.text(this.name, this.beginX + 50, this.beginY + 150);

        // squares
        for (let i = 0; i < this.buttonBar.length; i++) {
            this.buttonBar[i].draw(p5);
        }

        this.amountAdjuster.draw(p5);
        this.putButton.draw(p5);
    }

}