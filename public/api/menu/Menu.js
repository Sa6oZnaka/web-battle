import {Button} from "./Button.js";
import {ImageButton} from "./ImageButton.js";
import {BuildingFactory} from "../../factories/BuildingFactory.js";

export class Menu extends Button{

    constructor(name, beginX, beginY, sizeX, sizeY, buildings, pos){
        super(beginX, beginY, sizeX, sizeY);

        this.name = name;
        this.opened = true;

        this.button = new Button(this.beginX, this.beginY, 120, 50);
        this.buttonBar = [
            new ImageButton(this.beginX * 1, this.beginY + 180, 155, 200, buildings[0]),
            new ImageButton(this.beginX * 2, this.beginY + 180, 155, 200, buildings[1]),
            new ImageButton(this.beginX * 3, this.beginY + 180, 155, 200, buildings[2]),
            new ImageButton(this.beginX * 4, this.beginY + 180, 155, 200, buildings[3]),
            new ImageButton(this.beginX * 5, this.beginY + 180, 155, 200, buildings[4]),
            new ImageButton(this.beginX * 6, this.beginY + 180, 155, 200, buildings[5])
        ];
        this.pos = pos;
    }

    // @Override
    click(mouseX, mouseY, buildings) {
        if(this.button.click(mouseX, mouseY)){
            this.opened = false;
        }
    }

    // @Override
    draw(p5){

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
        for(let i = 0; i < this.buttonBar.length; i ++){
            this.buttonBar[i].draw(p5);
        }
    }

}