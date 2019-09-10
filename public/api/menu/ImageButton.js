import {Button} from "./Button.js";

export class ImageButton extends Button {

    constructor(beginX, beginY, sizeX, sizeY, image, amount) {
        super(beginX, beginY, sizeX, sizeY);

        this.image = image;
        this.amount = amount;
    }

    // @Override
    draw(p5){
        if(! this.hover(p5.mouseX, p5.mouseY)){
            if(this.image === undefined){
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