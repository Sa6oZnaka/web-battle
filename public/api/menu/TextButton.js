import {Button} from "./Button.js";

export class TextButton extends Button {

    constructor(beginX, beginY, sizeX, sizeY, text) {
        super(beginX, beginY, sizeX, sizeY, text);

        this.text = text;
    }

    draw(p5) {
        p5.fill(255);
        p5.rect(this.beginX, this.beginY, this.sizeX, this.sizeY);

        p5.textSize(this.sizeY);
        if (!this.hover(p5.mouseX, p5.mouseY)) {
            p5.fill(0, 102, 153);
        } else {
            p5.fill(0);
        }
        p5.text(this.text, this.beginX, this.beginY + this.sizeY * 0.8);
    }
}