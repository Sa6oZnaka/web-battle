import {TextButton} from "./TextButton.js";

export class ImageButton extends TextButton {

    constructor(beginX, beginY, sizeX, sizeY, name, amount) {
        super(beginX, beginY, sizeX, sizeY);

        this.name = name;
        this.amount = amount;
    }

    // @Override
    draw(p5) {
        if (this.name === undefined) {
            p5.fill(255);
        } else {
            p5.fill(0, 200, 0);
        }
        p5.strokeWeight(3);
        p5.rect(this.beginX, this.beginY, this.sizeX, this.sizeY);
        if (this.hover(p5.mouseX, p5.mouseY)) {
            p5.fill(0, 150);
            p5.rect(this.beginX, this.beginY, this.sizeX, this.sizeY);
        }
    }

}