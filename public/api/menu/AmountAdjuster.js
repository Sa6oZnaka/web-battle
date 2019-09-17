import {Button} from "./Button.js";
import {Slider} from "./Slider.js";
import {TextButton} from "./TextButton.js";

export class AmountAdjuster extends Button{

    constructor(beginX, beginY, sizeX, sizeY, resource){
        super(beginX, beginY, sizeX, sizeY);

        this.resourceName = resource.name;
        this.putSlider = new Slider(beginX, beginY + 5, sizeX, 18, 200);
        this.putButton = new TextButton(beginX, beginY + 23, sizeX, 18, "Put");
        this.takeSlider = new Slider(beginX, beginY + 50, sizeX, 18, resource.amount);
        this.takeButton = new TextButton(beginX, beginY + 68, sizeX, 18, "Take");
    }

    click(mouseX, mouseY) {
        this.takeSlider.click(mouseX, mouseY);
        this.putSlider.click(mouseX, mouseY);
        if(this.takeButton.click(mouseX, mouseY)){
            this.putSlider.add(this.takeSlider.amount);
            this.takeSlider.remove(this.takeSlider.amount);
        }
        if(this.putButton.click(mouseX, mouseY)){
            this.takeSlider.add(this.putSlider.amount);
            this.putSlider.remove(this.putSlider.amount);
        }
    }

    draw(p5) {

        p5.textSize(18);
        p5.fill(0, 102, 153);
        p5.text(this.resourceName, this.beginX, this.beginY);

        this.putSlider.draw(p5);
        this.takeSlider.draw(p5);
        this.putButton.draw(p5);
        this.takeButton.draw(p5);
    }

}