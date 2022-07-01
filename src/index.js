import {line} from "./js/canvas";
import state from "./js/state.js";
import './js/form.js'
import './styles.css'


const animate = () => {
    if (state.stop === false) {
        line.update();
        line.draw();
    }
    requestAnimationFrame(animate);
};

addEventListener("load", () => {
    requestAnimationFrame(animate);
});
