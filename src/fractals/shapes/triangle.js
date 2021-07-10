import { strict as assert} from 'assert';

class Triangle {

    constructor(color) {
        this.color = color;
        this.rotation = 0;
        this.rotationPoint = [0,0];
        this.sideLength = 0;
    }

    // note: does not assing sideLength since can be non-equilateral
    fromCornerPoints(cornerPoints) {
        assert.equal(cornerPoints.length, 3, "Triangles should have three corners");
        this.cornerPoints = cornerPoints;
        let centerX = (cornerPoints[0][0] + cornerPoints[1][0] + cornerPoints[2][0]) / 3;
        let centerY = (cornerPoints[0][1] + cornerPoints[1][1] + cornerPoints[2][1]) / 3;
        this.centerPoint = [centerX, centerY];
        return this;
    }

    get baseToCenterDist() {
        return this.sideLength * Math.sqrt(3) / 6
    }

    get baseToTopDist() {
        return this.sideLength * Math.sqrt(3) / 2
    }

    // assuming equilateral
    fromCenterPoint(centerPoint, sideLength) {
        const [cx, cy] = centerPoint;
        this.sideLength = sideLength;

        const leftCornerX = cx - sideLength/2;
        const leftCornerY = cy + this.baseToCenterDist;

        const rightCornerX = cx + sideLength/2;
        const rightCornerY = leftCornerY;

        const topCornerX = cx;
        const topCornerY = rightCornerY - this.baseToTopDist;

        this.centerPoint = centerPoint;
        this.rotationPoint = centerPoint;
        this.cornerPoints = [[leftCornerX, leftCornerY], [rightCornerX, rightCornerY], [topCornerX, topCornerY]]

        return this;
    }

    draw(ctx) {
        ctx.save()

        ctx.fillStyle = this.color

        const [x0, y0] = this.cornerPoints[0];
        const [x1, y1] = this.cornerPoints[1];
        const [x2, y2] = this.cornerPoints[2];
        const [rx, ry] = this.rotationPoint;

        // rotate around center
        ctx.translate(rx, ry);
        ctx.rotate(this.rotation);
        ctx.translate(-rx, -ry);

        // draw triangle
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.fill()
        
        ctx.restore()
    }
}

export default Triangle