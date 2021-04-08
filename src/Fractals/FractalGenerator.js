import Vector from './Vector.js'

class FractalTree {
    constructor(origin, baseAngle, baseLength, splitAngle, lenDecayFactor, lineColor, flowerEnabled, flowerSize, flowerColor) {
        this.origin = origin
        this.baseAngle = baseAngle
        this.baseLength = baseLength
        this.splitAngle = splitAngle
        this.lenDecayFactor = lenDecayFactor
        this.flowerEnabled = flowerEnabled
        this.flowerSize = flowerSize
        this.flowerColor = flowerColor
        this.lineColor = lineColor
        this.vectors = []
    }

    drawToDepth(depth, ctx) {
        this.recurse(this.origin, this.baseLength, this.baseAngle, depth, ctx)
        this.vectors.forEach( function(vec, index) {vec.draw(ctx)})
    }

    recurse(startPoint, prevLen, nextAngle, depthLeft) {
        let newLen = prevLen * this.lenDecayFactor
        let vec = new Vector(startPoint, newLen, nextAngle, this.lineColor, 2, depthLeft === 0,
            this.flowerSize, this.flowerColor)
        this.vectors.push(vec)
        
        if (depthLeft > 0) {
            this.recurse(vec.endpoint, newLen, nextAngle - this.splitAngle/2, depthLeft - 1)
            this.recurse(vec.endpoint, newLen, nextAngle + this.splitAngle/2, depthLeft - 1)
        }
    }
}


let tree = null;

export function generateFractalTree(origin, baseAngle, baseLength, splitAngle, lenDecayFactor,
    lineColor, flowerSize, flowerColor) {

    tree = new FractalTree(origin, baseAngle, baseLength, splitAngle, lenDecayFactor,
        lineColor, true, flowerSize, flowerColor)
    return tree;
}

export function setSplitAngle(newValue) {
    tree.splitAngle = newValue
}

export function setLineColor(newColor) {
    tree.lineColor = newColor
}

export function setFlowerSize(newSize) {
    tree.flowerSize = newSize
}

export function setFlowerColor(newColor) {
    tree.flowerColor = newColor
}