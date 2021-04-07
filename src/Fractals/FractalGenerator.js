import Vector from './Vector.js'

class FractalTree {
    constructor(origin, baseAngle, baseLength, splitAngle, lenDecayFactor) {
        this.origin = origin
        this.baseAngle = baseAngle
        this.baseLength = baseLength
        this.splitAngle = splitAngle
        this.lenDecayFactor = lenDecayFactor
        this.vectors = []
    }

    drawToDepth(depth, ctx) {
        this.recurse(this.origin, this.baseLength, this.baseAngle, depth, ctx)
        this.vectors.forEach( function(vec, index) {vec.draw(ctx)})
    }

    recurse(startPoint, prevLen, nextAngle, depthLeft) {
        let newLen = prevLen * this.lenDecayFactor
        let vec = new Vector(startPoint, newLen, nextAngle, 'f8f8f8', 2, depthLeft === 0)
        this.vectors.push(vec)
        
        if (depthLeft > 0) {
            this.recurse(vec.endpoint, newLen, nextAngle - this.splitAngle, depthLeft - 1)
            this.recurse(vec.endpoint, newLen, nextAngle + this.splitAngle, depthLeft - 1)
        }
    }
}


let tree = null;

export function generateFractalTree(origin, baseAngle, baseLength, splitAngle, lenDecayFactor) {
    tree = new FractalTree(origin, baseAngle, baseLength, splitAngle, lenDecayFactor)
    return tree;
}

export function setSplitAngle(newValue) {
    tree.splitAngle = newValue
}
