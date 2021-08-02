import { AXIS, CLOCK } from "./objs/constants.js";
import { createCube } from "./objs/creator.js";
import { render } from "./objs/renderer.js";
import { rotateCube } from "./objs/rotator.js";

let isBusy = false;
let rootName = "cube-area"
let cube = createCube(3);
render(cube, document, rootName);

document.getElementById("button-rotate-F").addEventListener("click", () => rotateInterface('Z', 0, false))

function rotateInterface(axis, layer, anti) {
    if (isBusy) return;
    isBusy = true;
    let blockElements = document.querySelectorAll(`.scene>.cube>.block.position-${axis}-${layer}`);
    blockElements.forEach(_ => _.classList.add(`rotate-${axis}`));
    setTimeout(() => {
        cube = rotateCube(AXIS.Z, cube, layer, CLOCK.NORMAL);
        render(cube, document, rootName);
        isBusy = false;
    }, 500);
}