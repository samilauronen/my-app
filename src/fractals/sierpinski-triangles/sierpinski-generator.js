import Triangle from "../shapes/triangle";

class SierpinskiTriangles {

    constructor(baseCenterpoint, baseLength, rotationAngle) {
        this.baseLength = baseLength;
        this.baseCenterpoint = baseCenterpoint;
        this.rotationAngle = rotationAngle;
        this.triangles = [];
    }

    update(key, value) {
        switch(key) {
            case "length":
                this.baseLength = value;
                break;
            case "angle":
                this.rotationAngle = value;
                break;
            case "depth":
                this.depth = value;
                break;
            default:
        }
        this.createWithDepth(this.depth);
    }

    createWithDepth(depth) {
        this.triangles = [];

        const baseTriangle = new Triangle("#000000").fromCenterPoint(this.baseCenterpoint, this.baseLength);
        baseTriangle.rotation = this.rotationAngle;

        this.triangles.push(baseTriangle);
        this.recurse(this.baseCenterpoint, this.baseLength, depth);
    }

    recurse(center, sideLength, depthLeft) {

        if (depthLeft === 0) return;

        const color = "#FFFFFF"
        const removalTriangle = new Triangle(color).fromCenterPoint(center, sideLength/2);
        removalTriangle.rotation = this.rotationAngle + Math.PI;
        this.triangles.push(removalTriangle);

        let lcx = center[0] - sideLength/4;
        let lcy = center[1] + sideLength * Math.sqrt(3) / 12;

        let rcx = center[0] + sideLength/4;
        let rcy = lcy;

        let tcx = center[0];
        let tcy = center[1] - sideLength * Math.sqrt(3) / 6;

        this.recurse([lcx, lcy], sideLength/2, depthLeft - 1);
        this.recurse([rcx, rcy], sideLength/2, depthLeft - 1);
        this.recurse([tcx, tcy], sideLength/2, depthLeft - 1);
    }

    draw(ctx) {
        this.triangles.forEach( tr => tr.draw(ctx) );
    }
}

export default SierpinskiTriangles;