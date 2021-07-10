class Circle {
    constructor(location, radius, color) {
        this.location = location;
        this.radius = radius;
        this.color = color;
    }

    draw(ctx) {
        ctx.save();

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.fillStyle = this.color;
        let [x,y] = this.location;
        ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.restore();
    }
}

export default Circle;