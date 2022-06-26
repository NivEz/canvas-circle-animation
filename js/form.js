import {line} from './canvas.js'
import state from "./state.js";

// ----- radius -----
const handleRadius = e => {
    line.radius = Number(e.target.value)
}

const radiusSlider = document.getElementById("radius");
radiusSlider.oninput = handleRadius
// set max radius size
radiusSlider.max = line.maxRadius;


// ----- speed -----
const handleSpeed = e => {
    let val = Number(e.target.value);
    if (!val) {
        val = 1;
    }
    line.speed = val
}

const speedInput = document.getElementById("speed");
speedInput.oninput = handleSpeed


// ----- single line -----
const handleIsSingleLine = e => {
    line.isSingleLine = e.target.checked;
}

const singeLineCheckBox = document.getElementById("single-line");
singeLineCheckBox.oninput = handleIsSingleLine


// ----- random spawn -----
const handleRandomSpawn = e => {
    line.randomSpawn = e.target.checked;
}

const randomSpawnCheckbox = document.getElementById("random-spawn")
randomSpawnCheckbox.oninput = handleRandomSpawn;


// ----- radius change -----
const handleRadiusChange = e => {
    let val = Number(e.target.value);
    if (!val) {
        val = 0;
    }
    line.changeRadiusUnit = val;
}

const radiusSizeChangeSlider = document.getElementById("radius-size-change");
radiusSizeChangeSlider.oninput = handleRadiusChange;


// ----- colors -----
const baseColorPicker = document.getElementById("base-color");
baseColorPicker.oninput = e => line.baseColor = e.target.value;

const secondColorPicker = document.getElementById("second-color");
const secondColorCheckbox = document.getElementById("second-color-checkbox");

secondColorCheckbox.oninput = e => {
    const isChecked = e.target.checked;
    // toggle - enable or disable checkbox
    secondColorPicker.disabled = !isChecked;
    if (isChecked) {
        line.secondColor = secondColorPicker.value;
    } else {
        line.secondColor = "";
    }
}

secondColorPicker.oninput = e => {
    line.secondColor = e.target.value;
}


// ----- line dash -----
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


// ----- buttons -----
const cleanButton = document.getElementById("clean-btn");
cleanButton.onclick = () => line.destroy();

const stopButton = document.getElementById("stop-btn");
stopButton.onclick = () => {
    state.stop = !state.stop;
    stopButton.innerText = state.stop ? "Play" : "Pause";
}

const resetButton = document.getElementById("reset-btn");
resetButton.onclick = () => {
    location.reload();
    line.destroy();
}
