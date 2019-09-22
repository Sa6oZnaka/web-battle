import {TextButton} from "./TextButton.js";
import {ImageButton} from "./ImageButton.js";
import {Button} from "./Button.js";

export class SelectMenu extends Button {

    constructor(name, beginX, beginY, sizeX, sizeY, buildings, pos) {
        super(beginX, beginY, sizeX, sizeY);

        this.name = name;
        this.opened = true;

        this.button = new TextButton(this.beginX, this.beginY, 120, 50, "Back");
        this.buttonBar = [];
        for (let i = 0; i < 6; i++) {
            if (buildings[i] !== undefined) {
                this.buttonBar.push(new ImageButton(this.beginX * (i + 1), this.beginY + 180, 155, 200, buildings[i].name, buildings[i].level));
            } else {
                this.buttonBar.push(new ImageButton(this.beginX * (i + 1), this.beginY + 180, 155, 200));
            }
        }
        this.pos = pos;
    }

    // @Override
    click(mouseX, mouseY) {
        if (this.button.click(mouseX, mouseY)) {
            this.opened = false;
        }
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
    }

}