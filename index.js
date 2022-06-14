const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

let WIDTH = 500
let HEIGHT = 500

const radius = 100;
const circumference = 2 * Math.PI * radius

const line = new Line(200, 0)
const line2 = new Line(200, 0)
const line3 = new Line(200, 0)
const animate = () => {
    ctx.clearRect(0, 0, 400, 400)
    line.draw()
    line.update()
    // line2.draw()
    // line2.update()
    // line3.draw()
    // line3.update()

    requestAnimationFrame(animate)
}

function Line(x = 0, y = 0, angle = 0) {
    this.x = x;
    this.y = y;
    this.angle = angle
    this.draw = () => {
        ctx.save()
        ctx.translate(200, 200)
        ctx.rotate(this.angle * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.x, this.y)
        ctx.stroke()
        ctx.restore()
    }
    this.update = () => {
        this.angle = (this.angle + 1) % 360;
        // this.x = this.x * - 1
        // if (this.x >= 0) {
        //     this.x --
        // }
        // if (this.x <= 0) {
        //     this.x ++
        // }
        console.log("-> this.x", this.x);

    }
}


addEventListener('load', () => {
    requestAnimationFrame(animate)
})
