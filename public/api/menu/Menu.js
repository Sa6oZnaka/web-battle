export class Menu {

    constructor(name, components) {
        this.name = name;
        this.components = components;
    }

    click(mouseX, mouseY) {
        this.components.forEach(function (value) {
            value.click(mouseX, mouseY);
        });
    }

    draw(p5) {
        this.components.forEach(function (value) {
            value.draw(p5);
        });
        p5.textSize(90);
        p5.fill(0, 102, 153);
        p5.text(this.name, 160, 240);
    }

}