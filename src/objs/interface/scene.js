
import { COLORS, SIDES } from "../constants.js";
import { rotateCube } from "../rotator.js";
import { axisToString, inverseKeyValue } from "../transformer.js";
import { createDragger } from "./dragger.js";

/**
 * 
 * @param {HTMLDocument} document
 * @param {number[][][][]} cube
 * @return {{ document: HTMLDocument, cube: number[][][][], cubeHtmlElement: HTMLDocument, sceneHtmlElement: HTMLElement }}
 */
export function createScene(document, cube) {
    let scene = {
        document: document,
        cube: cube,
        sceneHtmlElement: document.createElement("div"),
        cubeHtmlElement: createCubeHtmlElement(cube, document)
    }
    scene.dragger = createDragger(scene);
    
    scene.sceneHtmlElement.classList.add("scene");
    scene.sceneHtmlElement.appendChild(scene.cubeHtmlElement);
    
    scene.cubeHtmlElement.querySelectorAll(".side").forEach(_ => {
        _.addEventListener("touchstart", (event) => scene.dragger.dragStart(event.target, event.touches[0].screenX, event.touches[0].screenY))
        _.addEventListener("mousedown", (event) => scene.dragger.dragStart(event.target, event.screenX, event.screenY))
    });
    scene.sceneHtmlElement.addEventListener("touchmove", (event) => scene.dragger.dragMove(event.touches[0].screenX, event.touches[0].screenY));
    scene.sceneHtmlElement.addEventListener("mousemove", (event) => scene.dragger.dragMove(event.screenX, event.screenY));
    scene.sceneHtmlElement.addEventListener("touchleave", () => scene.dragger.dragEnd(rotateScene));
    scene.sceneHtmlElement.addEventListener("touchend", () => scene.dragger.dragEnd(rotateScene));
    scene.sceneHtmlElement.addEventListener("touchcancel", () => scene.dragger.dragEnd(rotateScene));
    scene.sceneHtmlElement.addEventListener("mouseup", () => scene.dragger.dragEnd(rotateScene));

    return scene;
}

export function refreshScene(scene) {
    scene.cubeHtmlElement.remove();
    scene.cubeHtmlElement = createCubeHtmlElement(scene.cube, scene.document);
    scene.sceneHtmlElement.appendChild(scene.cubeHtmlElement);
    scene.cubeHtmlElement.querySelectorAll(".side").forEach(_ => {
        _.addEventListener("touchstart", (event) => scene.dragger.dragStart(event.target, event.touches[0].screenX, event.touches[0].screenY))
        _.addEventListener("mousedown", (event) => scene.dragger.dragStart(event.target, event.screenX, event.screenY))
    });
}


/**
 * 
 * @param {number[][][][]} cube 
 * @param {HTMLDocument} document
 * @return {HTMLElement}
 */
export function createCubeHtmlElement(cube, document) {
    let size = cube.length;
    let layers = [...Array(size).keys()];
    let cubeElement = document.createElement("div");
    cubeElement.classList.add("cube", `size-${size}`);
    let i = 0;
    for (let z in layers) {
        for (let y in layers) {
            for (let x in layers) {
                cubeElement.appendChild(createBlockHtmlElement(document, i, x, y, z, cube[z][y][x]))
                i += 1;
            }
        }
    }
    return cubeElement;
}

/**
 * 
 * @param {HTMLDListElement} document 
 * @param {number} position 
 * @param {number} x 
 * @param {number} y 
 * @param {number} z 
 * @param {number[]} colors 
 * @returns 
 */

function createBlockHtmlElement(document, position, x, y, z, colors) {
    let blockElement = document.createElement("div");
    blockElement.dataset.position = position;
    blockElement.dataset.x = x;
    blockElement.dataset.y = y;
    blockElement.dataset.z = z;
    blockElement.classList.add("block", `position-x-${x}`, `position-y-${y}`, `position-z-${z}`);
    let colorEntries = inverseKeyValue(COLORS);
    for (var side of Object.entries(SIDES)) {
        if (side[1] != SIDES.CENTER) {
            let sideElement = document.createElement("div");
            sideElement.classList.add("side", side[0].toLowerCase(), colorEntries[colors[side[1]]].toLowerCase());
            blockElement.appendChild(sideElement);
        }
    }
    return blockElement;
}

export function rotateScene(scene, movement, onFinished) {
    let axis = axisToString(movement.axis);
    let blockElements = [];
    let layers = [];
    if (movement.layers) {
        layers = movement.layers.map(_ => _ < 0 ? scene.cube.length + _ : _);
    } else {
        layers = [...Array(scene.cube.length).keys()];
    }
    
    for(let layer of layers) {
        scene.cubeHtmlElement.querySelectorAll(`.block.position-${axis}-${layer}`).forEach(_ => blockElements.push(_));
    }

    blockElements.forEach(_ => {
        _.style.transform = '';
        _.classList.add('rotate', `rotate-${axis}${movement.clock ? '' : '-anti'}`)
    });

    setTimeout(() => {
        for(let layer of layers) {
            scene.cube = rotateCube(movement.axis, scene.cube, layer, movement.clock);
        }
        refreshScene(scene);
        onFinished && onFinished();
    }, 350);
}

