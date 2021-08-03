import { AXIS, CLOCK } from "./objs/constants.js";
import { createCube } from "./objs/creator.js";
import { render } from "./objs/renderer.js";
import { rotateCube } from "./objs/rotator.js";
import { axisToString, movementFromString } from "./objs/transformer.js";

let isBusy = false;
let rootName = "cube-area"
let cube = createCube(3);
render(cube, document, rootName);


let buttons = document.querySelectorAll(".button-area>.button-rotate");
buttons.forEach(_ => _.addEventListener("click", (event) => rotateInterface(event.target.value)));

function rotateInterface(v) {
    if (isBusy) return;
    isBusy = true;
    let movement = movementFromString(v);
    let axis = axisToString(movement.axis);
    let blockElements = [];
    let layers = [];
    if (movement.layers) {
        layers = movement.layers.map(_ => _ < 0 ? cube.length + _ : _);
    } else {
        layers = [...Array(cube.length).keys()];
    }
    
    for(let layer of layers) {
        document.querySelectorAll(`.scene>.cube>.block.position-${axis}-${layer}`).forEach(_ => blockElements.push(_));
    }
    blockElements.forEach(_ => _.classList.add('rotate', `rotate-${axis}${movement.clock ? '' : '-anti'}`));
    setTimeout(() => {
        for(let layer of layers) {
            cube = rotateCube(movement.axis, cube, layer, movement.clock);
        }
        render(cube, document, rootName);
        isBusy = false;
    }, 350);
}