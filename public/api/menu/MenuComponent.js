export class MenuComponent {

    constructor(beginX, beginY, sizeX, sizeY) {
        this.beginX = beginX;
        this.beginY = beginY;
        this.sizeX = sizeX;
        this.sizeY = sizeY;
    }

    click() {
    }

    draw(p5) {
        p5.fill(255);
        p5.rect(this.beginX, this.beginY, this.sizeX, this.sizeY);
    }
}