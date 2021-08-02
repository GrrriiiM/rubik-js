import { createCube } from "./objs/creator.js";
import { render } from "./objs/renderer.js";

let cube = createCube(3);
render(cube, document, "cube-area");

document.getElementById("button-rotate-F").addEventListener("click", () => rotate('Z', 0, false))

function rotate(axis, layer, anti) {
    let blockElements = document.querySelectorAll(`.scene>.cube>.block.position-${axis}-${layer}`);
    blockElements.forEach(_ => _.classList.add(`rotate-${axis}`));
}