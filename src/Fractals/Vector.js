class Vector {
    constructor(startpoint, length, angle, color, width, bulb) {
        this.startpoint = startpoint
        this.length = Number(length)
        this.angle = Number(angle)
        this.color = color
        this.width = width
        this.bulb = bulb
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
        if(this.bulb) {
            ctx.beginPath();
            ctx.lineWidth = 1
            ctx.strokeStyle = this.color
            ctx.fillStyle = '#faa046'
            ctx.arc(end_x, end_y, 2, 0, 2 * Math.PI)
            ctx.fill()
        }
        

        ctx.restore()
    }
}

export default Vector;