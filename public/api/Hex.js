export class Hex {

    draw(p5, x, y, sizeX, sizeY) {
        p5.push();
        p5.translate(x, y);
        p5.beginShape();
        p5.vertex(sizeX / 4, 0);
        p5.vertex(sizeX - sizeX / 4, 0);
        p5.vertex(sizeX, sizeY / 2);
        p5.vertex(sizeX - sizeX / 4, sizeY);
        p5.vertex(sizeX / 4, sizeY);
        p5.vertex(0, sizeY / 2);
        p5.endShape(p5.CLOSE);
        p5.pop();
    }

    getHexPos(x, y, r) {
        let sizeY = Math.sqrt(3) * r;

        let retPos = {};
        let xa, ya, xpos, xx, yy, r2, h2;
        r2 = r / 2;
        h2 = sizeY / 2;
        xx = Math.floor(x / r2);
        yy = Math.floor(y / h2);
        xpos = Math.floor(xx / 3);
        xx %= 6;
        if (xx % 3 === 0) {      // column with diagonals
            xa = (x % r2) / r2;  // to find the diagonals
            ya = (y % h2) / h2;
            if (yy % 2 === 0) {
                ya = 1 - ya;
            }
            if (xx === 3) {
                xa = 1 - xa;
            }
            if (xa > ya) {
                retPos.x = xpos + (xx === 3 ? -1 : 0);
                retPos.y = Math.floor(yy / 2);
                return retPos;
            }
            retPos.x = xpos + (xx === 0 ? -1 : 0);
            retPos.y = Math.floor((yy + 1) / 2);
            return retPos;
        }
        if (xx < 3) {
            retPos.x = xpos + (xx === 3 ? -1 : 0);
            retPos.y = Math.floor(yy / 2);
            return retPos;
        }
        retPos.x = xpos + (xx === 0 ? -1 : 0);
        retPos.y = Math.floor((yy + 1) / 2);

        return retPos;
    }
}