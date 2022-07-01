import {getRandomIntInclusive} from "./utils.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

const WIDTH = 400;
const HEIGHT = 400;

canvas.width = WIDTH;
canvas.height = HEIGHT;

export function Line({
                         radius = WIDTH / 2,
                         speed = 1,
                         isSingleLine = false,
                         randomSpawn = false,
                         changeRadiusUnit = 0,
                         lineDash = [],
                         baseColor = "black",
                         secondColor = "",
                     } = {}) {
    this.radius = radius;
    this.speed = speed;
    this.isSingleLine = isSingleLine;
    this.randomSpawn = randomSpawn;
    this.changeRadiusUnit = changeRadiusUnit;
    this.lineDash = lineDash;
    this.baseColor = baseColor;
    this.secondColor = secondColor;

    // local attributes
    this.angle = 1;
    this.direction = 1;
    this.maxRadius = Math.sqrt(2 * WIDTH ** 2) / 2;
    this.chosenRadius = radius;

    this.update = () => {
        this.setAngleAndSpeed();
        this.setRadius();
        ctx.setLineDash(this.lineDash);
    };

    this.draw = () => {
        if (this.isSingleLine) {
            this.destroy();
        }
        ctx.save();
        ctx.translate(WIDTH / 2, WIDTH / 2);
        ctx.rotate((this.angle * Math.PI) / 180);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(this.radius, 0);

        this.handleColors();

        ctx.stroke();
        ctx.restore();
    };

    this.setAngleAndSpeed = () => {
        if (this.randomSpawn) {
            this.angle = getRandomIntInclusive(0, 360);
        }
        this.angle = (this.angle + this.speed) % 360;
    };

    this.setRadius = () => {
        if (this.radius >= this.chosenRadius && this.direction !== -1) {
            // make smaller
            this.radius = this.chosenRadius;
            this.direction = -1;
        } else if (this.radius <= 0 && this.direction !== 1) {
            // make bigger
            this.radius = 0;
            this.direction = 1;
        } else {
            this.radius += this.changeRadiusUnit * this.direction;
        }
    };

    this.handleColors = () => {
        if (this.secondColor) {
            let gradient = ctx.createLinearGradient(0, 0, this.radius, 0);
            gradient.addColorStop(0, this.baseColor);
            gradient.addColorStop(1, this.secondColor);
            ctx.strokeStyle = gradient;
        } else {
            ctx.strokeStyle = this.baseColor;
        }
    };

    this.destroy = () => {
        ctx.clearRect(0, 0, WIDTH, WIDTH);
    };
}

export const line = new Line({
    radius: 200,
    speed: 1,
    isSingleLine: false,
    randomSpawn: false,
    changeRadiusUnit: 0,
    lineDash: [],
    baseColor: "black",
    secondColor: "",
});
