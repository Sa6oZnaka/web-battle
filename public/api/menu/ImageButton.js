import {Button} from "./Button.js";

export class ImageButton extends Button {

    constructor(beginX, beginY, sizeX, sizeY, building) {
        super(beginX, beginY, sizeX, sizeY);

        this.building = building;
    }

    // @Override
    draw(p5){
        if(! this.hover(p5.mouseX, p5.mouseY)){
            if(this.building === undefined){
                p5.fill(8, 8, 8);
            }else {
                p5.fill(0, 200, 0);
            }

        }else{
            p5.fill(0, 0, 0, 0.5);
        }
        let size = (p5.width - 20 - this.beginX * 2) / 6;
        p5.strokeWeight(3);
        p5.rect(this.beginX, this.beginY, this.sizeX, this.sizeY);
    }

}