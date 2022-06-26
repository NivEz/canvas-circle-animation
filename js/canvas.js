import {getRandomIntInclusive} from './utils.js'
import state from './state.js';

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 400;

function Line({
                  width = canvas.width,
                  radius = canvas.width / 2,
                  speed = 1,
                  isSingleLine = false,
                  randomSpawn = false,
                  changeRadiusUnit = 0,
                  lineDash = [],
                  baseColor = "black",
              } = {}) {
    this.width = width;
    this.radius = radius;
    this.speed = speed;
    this.isSingleLine = isSingleLine;
    this.randomSpawn = randomSpawn;
    this.changeRadiusUnit = changeRadiusUnit;
    this.lineDash = lineDash;
    this.baseColor = baseColor;

    // local attributes
    this.angle = 1;
    this.direction = 1;
    this.maxRadius = Math.sqrt(2 * (this.width ** 2)) / 2
    this.initialRadius = 200;

    this.update = () => {
        this.setAngleAndSpeed()
        this.setRadius()
        ctx.setLineDash(this.lineDash);
    }

    this.draw = () => {
        if (this.isSingleLine) {
            this.destroy();
        }
        ctx.save()
        ctx.translate(this.width / 2, this.width / 2)
        ctx.rotate(this.angle * Math.PI / 180)
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(this.radius, 0)

        this.handleColors()

        ctx.stroke()
        ctx.restore()
    }

    this.setAngleAndSpeed = () => {
        if (this.randomSpawn) {
            this.angle = getRandomIntInclusive(0, 360)
        }
        this.angle = (this.angle + this.speed) % 360;
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
            this.radius += this.changeRadiusUnit * this.direction
        }
    }

    this.handleColors = () => {


        ctx.strokeStyle = this.baseColor;
    }

    this.destroy = () => {
        ctx.clearRect(0, 0, this.width, this.width);
    }
}

export const line = new Line({
    radius: 200,
    speed: 1,
    isSingleLine: false,
    randomSpawn: false,
    changeRadiusUnit: 0,
    lineDash: []
})

const animate = () => {
    if (state.stop === false) {
        line.update()
        line.draw()
    }
    requestAnimationFrame(animate)
}

addEventListener('load', () => {
    requestAnimationFrame(animate)
})
