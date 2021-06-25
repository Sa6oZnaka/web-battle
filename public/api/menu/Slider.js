import {TextButton} from "./TextButton.js";

export class Slider extends TextButton {

    constructor(beginX, beginY, sizeX, sizeY, maxAmount) {
        super(beginX, beginY, sizeX, sizeY);

        this.maxAmount = maxAmount;
        this.amount = Math.floor(maxAmount / 2);
    }

    // @Override
    click(mouseX, mouseY) {
        if (!this.outOfBonds(mouseX, mouseY))
            this.amount = Math.round((mouseX - this.beginX) / (this.sizeX / this.maxAmount));
    }

    remove(amount){
        this.maxAmount -= amount;
        this.amount = Math.floor(this.maxAmount / 2);
    }

    add(amount){
        this.maxAmount += amount;
        this.amount = Math.floor(this.maxAmount / 2);
    }

    // @Override
    draw(p5) {
        p5.fill(160, 160, 160);
        p5.rect(this.beginX, this.beginY, this.sizeX, this.sizeY);

        p5.fill(0);
        p5.rect(this.beginX, this.beginY, (this.sizeX / this.maxAmount) * this.amount, this.sizeY);

        p5.textSize(this.sizeY);
        p5.fill(255);
        p5.text(this.amount, this.beginX, this.beginY + this.sizeY * 0.8);
    }

}