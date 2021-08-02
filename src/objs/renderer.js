
import { COLORS, SIDES } from "./constants.js";
import { inverseKeyValue } from "./transformer.js";


/**
 * 
 * @param {number[][][][]} cube 
 * @param {HTMLDocument} document
 * @param {string} rootId
 */
export function render(cube, document, rootId) {
    let rootElement = document.getElementById(rootId);
    let sceneElement;
    let sceneElements = rootElement.getElementsByClassName("scene");
    if (!sceneElements.length) {
        sceneElement = renderScene(document);
        rootElement.appendChild(sceneElement);
    } else {
        sceneElement = sceneElements[0];
    }

    while(sceneElement.getElementsByClassName("cube").length) sceneElement.removeChild(sceneElement.getElementsByClassName("cube"));
    sceneElement.appendChild(renderCube(cube, document));
}

/**
 * 
 * @param {HTMLDocument} document
 * @return {HTMLElement}
 */
function renderScene(document) {
    let sceneElement = document.createElement("div");
    sceneElement.classList.add("scene");
    return sceneElement;
}


/**
 * 
 * @param {number[][][][]} cube 
 * @param {HTMLDocument} document
 * @return {HTMLElement}
 */
function renderCube(cube, document) {
    let size = cube.length;
    let layers = [...Array(size).keys()];
    let cubeElement = document.createElement("div");
    cubeElement.classList.add("cube", `size-${size}`);
    let i = 0;
    for (let z in layers) {
        for (let y in layers) {
            for (let x in layers) {
                cubeElement.appendChild(renderBlock(document, i, x, y, z, cube[z][y][x]))
                i += 1;
            }
        }
    }
    return cubeElement;
}

/**
 * 
 * @param {HTMLDocument} document
 * @param {number[]} colors 
 * @return {HTMLElement}
 */

function renderBlock(document, id, x, y, z, colors) {
    let blockElement = document.createElement("div");
    blockElement.id = id;
    blockElement.classList.add("block", `position-x-${x}`, `position-y-${y}`, `position-z-${z}`);
    let colorEntries = inverseKeyValue(COLORS);
    for (var side of Object.entries(SIDES)) {
        if (side[1] != SIDES.CENTER) {
            let sideElement = document.createElement("div");
            sideElement.classList.add("side", side[0].toLowerCase(), colorEntries[colors[side[1]]].toLowerCase())
            blockElement.appendChild(sideElement);
        }
    }
    return blockElement;
}