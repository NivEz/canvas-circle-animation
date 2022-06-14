import {getRandomIntInclusive} from './utils.mjs'

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 350
canvas.height = 350

const line = new Line({
    radius: 150,
    randomRadius: false,
    speed: 1,
    singleLine: false,
    randomSpawn: false,
    changeSizeUnit: 4
})

const animate = () => {
    line.update()
    line.draw()
    requestAnimationFrame(animate)
}

function Line({
                  width = canvas.width,
                  radius = canvas.width / 2,
                  radiusIncrementVal = 1,
                  randomRadius = false,
                  speed = 1,
                  singleLine = false,
                  randomSpawn = false,
                  changeSizeUnit = 1,

              } = {}) {
    this.width = width;
    this.radius = radius;
    this.initialRadius = radius;
    this.angle = 1;
    this.speed = speed;
    this.changeSizeUnit = changeSizeUnit;


    // local attributes
    this.radiusIncrementVal = radiusIncrementVal;
    this.direction = 0;
    this.maxRadius = Math.sqrt(2 * (this.width ** 2)) / 2

    this.update = () => {
        this.setAngleAndSpeed()
        this.setRadius()
    }

    this.draw = () => {
        if (singleLine) {
            ctx.clearRect(0, 0, this.width, this.width);
        }
        ctx.save()
        ctx.translate(this.width / 2, this.width / 2)
        ctx.rotate(this.angle * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.radius, 0)
        ctx.stroke()
        ctx.restore()
    }

    this.setAngleAndSpeed = () => {
        if (randomSpawn) {
            this.angle = getRandomIntInclusive(0, 360)
        }
        this.angle = (this.angle + this.speed);
    }

    this.setRadius = () => {
        if (this.radius >= this.initialRadius && this.direction !== -1) {
            // make smaller
            this.radius = this.initialRadius;
            this.direction = -1
        } else if (this.radius <= 0 && this.direction !== 1) {
            // make bigger
            this.radius = 0;
            this.direction = 1
        } else {
            this.radius += this.changeSizeUnit * this.direction
        }
    }
}


// form handling
const handleSize = (el) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    line.angle = 360;
    const newSize = el.value;
    canvas.width = el.value
    canvas.height = el.value
}
// const form = document.getElementsByTagName("form")
// console.log("-> form", form);


addEventListener('load', () => {
    requestAnimationFrame(animate)
})
