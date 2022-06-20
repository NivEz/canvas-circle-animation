import {line} from '../index.js'

const handleRadius = e => {
    line.radius = Number(e.target.value)
}

const radiusSlider = document.getElementById("radius");
radiusSlider.oninput = handleRadius
// set max radius size
radiusSlider.max = line.maxRadius;


const handleSpeed = e => {
    let val = Number(e.target.value);
    if (!val) {
        val = 1;
    }
    line.speed = val
}

const speedInput = document.getElementById("speed");
speedInput.oninput = handleSpeed


const handleIsSingleLine = e => {
    line.isSingleLine = e.target.checked;
}

const singeLineCheckBox = document.getElementById("single-line");
singeLineCheckBox.oninput = handleIsSingleLine


const handleRandomSpawn = e => {
    line.randomSpawn = e.target.checked;
}

const randomSpawnCheckbox = document.getElementById("random-spawn")
randomSpawnCheckbox.oninput = handleRandomSpawn;


const handleRadiusChange = e => {
    let val = Number(e.target.value);
    if (!val) {
        val = 1;
    }
    line.changeRadiusUnit = val;
}

const radiusSizeChangeSlider = document.getElementById("radius-size-change");
radiusSizeChangeSlider.oninput = handleRadiusChange


const lineDashHandler = e => {
    let val = e.target.value;
    let lineDashResult;
    if (!val) {
        lineDashResult = [];
        line.lineDash = lineDashResult;
        return;
    }
    const splittedArr = val.split("-");
    const isValid = splittedArr.every(strItem => !isNaN(Number(strItem)));
    if (!isValid) {
        return;
    }
    lineDashResult = splittedArr.map(strNum => Number(strNum));
    line.lineDash = lineDashResult;
}

const lineDashInput = document.getElementById("line-dash");
lineDashInput.onchange = lineDashHandler;






