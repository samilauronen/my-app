import Line from './line.js'
import Circle from './circle.js'

const LENGTH_DECAY_FACTOR = 0.9;
const LINE_WIDTH = 2;
const BASE_ANGLE = -Math.PI/2;

class FractalTree {
    constructor(origin,baseLength, splitAngle, lineColor, flowerRadius, flowerColor) {
        this.origin = origin;
        this.baseLength = baseLength;
        this.splitAngle = splitAngle;
        this.lineColor = lineColor;
        this.circleRadius = flowerRadius;
        this.circleColor = flowerColor;
        
        this.lines = [];
        this.circles = [];
    }

    createWithDepth(depth) {
        this.lines = [];
        this.circles = [];
        this.depth = depth;
        this.recurse(this.origin, this.baseLength, BASE_ANGLE, depth);
    }

    update(key, value) {
        switch(key) {
            case "flowerSize":
                this.circleRadius = value
                this.circles.forEach( circle => circle.radius = this.circleRadius);
                break;
            case "flowerColor":
                this.circleColor = value
                this.circles.forEach( circle => circle.color = this.circleColor);
                break;
            case "lineColor":
                this.lineColor = value
                this.lines.forEach( line => line.color = this.lineColor);
                break;
            case "length":
                this.baseLength = value;
                this.createWithDepth(this.depth);
                break;
            case "depth":
                this.depth = value;
                this.createWithDepth(this.depth);
                break;
            case "angle":
                this.splitAngle = value;
                this.createWithDepth(this.depth);
                break;
            default:
        }
    }

    draw(ctx) {
        this.lines.forEach( function(line, index) { line.draw(ctx) } );
        this.circles.forEach( function(circle, index) { circle.draw(ctx)} );
    }

    recurse(startPoint, prevLen, newAngle, depthLeft) {
        let newLen = prevLen * LENGTH_DECAY_FACTOR;
        let line = new Line(startPoint, newLen, newAngle, this.lineColor, LINE_WIDTH)
        this.lines.push(line)
        
        if (depthLeft > 0) {
            this.recurse(line.endpoint, newLen, newAngle - this.splitAngle/2, depthLeft - 1);
            this.recurse(line.endpoint, newLen, newAngle + this.splitAngle/2, depthLeft - 1);
        } else if (depthLeft === 0) { // last iteration, create circle
            let circle = new Circle(line.endpoint, this.circleRadius, this.circleColor);
            this.circles.push(circle);
        }
    }
}

export default FractalTree;