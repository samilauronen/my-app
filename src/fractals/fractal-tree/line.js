
class Line {
    constructor(startpoint, length, angle, color, width) {
        this.startpoint = startpoint;
        this.length = +length;
        this.angle = +angle;
        this.width = width;
        this.color = color;
    }

    get endpoint() {
        return [this.startpoint[0] + this.length * Math.cos(this.angle),
                this.startpoint[1] + this.length * Math.sin(this.angle)]
    }

    draw(ctx) {
        ctx.save()

        ctx.lineWidth = this.width
        ctx.strokeStyle = this.color
        ctx.fillColor = this.color
        let [x, y] = this.startpoint
        let [end_x, end_y] = this.endpoint

        ctx.beginPath();
        ctx.moveTo(x, y)
        ctx.lineTo(end_x, end_y)
        ctx.stroke()

        ctx.restore()
    }
}

export default Line;