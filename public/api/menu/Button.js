export class Button {

    constructor(beginX, beginY, sizeX, sizeY) {
        this.beginX = beginX;
        this.beginY = beginY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    click(mouseX, mouseY) {
        return !this.outOfBonds(mouseX, mouseY);
    }

    hover(x, y) {
        return !this.outOfBonds(x, y);
    }

    outOfBonds(x, y) {
        return x < this.beginX || y < this.beginY || x > this.beginX + this.sizeX || y > this.beginY + this.sizeY;
    }

    draw(p5) {
        if (!this.hover(p5.mouseX, p5.mouseY)) {
            p5.fill(0, 102, 153);
        } else {
            p5.fill(0);
        }
        p5.rect(this.beginX, this.beginY, this.sizeX, this.sizeY);
    }
}