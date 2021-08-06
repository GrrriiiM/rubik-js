
import { COLORS, SIDES } from "../constants.js";
import { cubeIsCompleted, findCubeCrosses, findCubeF2L, findCubeOLL } from "../finder.js";
import { rotateCube } from "../rotator.js";
import { axisToString, coordsToLayers, coordToLayer, inverseKeyValue } from "../transformer.js";
import { createDragger } from "./dragger.js";

/**
 * 
 * @param {HTMLDocument} document
 * @param {number[][][][]} cube
 * @return {{ document: HTMLDocument, cube: number[][][][], cubeHtmlElement: HTMLDocument, sceneHtmlElement: HTMLElement, createAt: Date, movements: string[], isBusy: bool, crossSides: [], f2lSides: [], ollSide: number, isCompleted: bool, crossAt: Date, f2lAt: Date, ollAt: Date, completedAt: Date }}
 */
export function createScene(document, cube) {
    let scene = {
        document: document,
        cube: cube,
        sceneHtmlElement: document.createElement("div"),
        cubeHtmlElement: createCubeHtmlElement(cube, document),
        createAt: new Date(Date.now()),
        movements: [],
        isBusy: false,
        crossSides: [],
        f2lSides: [],
        ollSide: SIDES.CENTER,
        crossAt: null,
        f2lAt: null,
        ollAt: null,
        completedAt: null,
        isCompleted: false
    }
    scene.dragger = createDragger(scene);
    
    scene.sceneHtmlElement.classList.add("scene");
    scene.sceneHtmlElement.appendChild(scene.cubeHtmlElement);
    
    scene.cubeHtmlElement.querySelectorAll(".side").forEach(_ => {
        _.addEventListener("touchstart", (event) => scene.dragger.dragStart(event.target, event.touches[0].screenX, event.touches[0].screenY))
        _.addEventListener("mousedown", (event) => scene.dragger.dragStart(event.target, event.screenX, event.screenY))
    });
    scene.sceneHtmlElement.addEventListener("touchstart", (event) => scene.dragger.dragStart(null, event.touches[0].screenX, event.touches[0].screenY))
    scene.sceneHtmlElement.addEventListener("mousedown", (event) => scene.dragger.dragStart(null, event.screenX, event.screenY))
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


/**
 * 
 * @param {{ document: HTMLDocument, cube: number[][][][], cubeHtmlElement: HTMLDocument, sceneHtmlElement: HTMLElement, createAt: Date, movements: string[], isBusy: bool, crossSides: [], f2lSides: [], ollSide: number, isCompleted: bool, crossAt: Date, f2lAt: Date, ollAt: Date, completedAt: Date }} scene 
 * @param {{ str: string, axis: number, layers: number[], clock: bool }} movement 
 * @param {*} onFinished 
 */
export function rotateScene(scene, movement, onFinished) {
    let axis = axisToString(movement.axis);
    scene.movements.push(movement.str)
    let layers = coordsToLayers(movement.layers, scene.cube.length);
    for(let layer of layers) {
        scene.cubeHtmlElement.querySelectorAll(`.block.position-${axis}-${layer}`).forEach(_ => {
            _.classList.add('rotate', `rotate-${axis}${movement.clock ? '' : '-anti'}`)
            _.style.transform = '';
        });
    }

    setTimeout(() => {
        scene.cube = rotateCube(movement.axis, scene.cube, layers, movement.clock);
        // console.log(JSON.stringify(scene.cube));
        scene.isCompleted = scene.isCompleted || cubeIsCompleted(scene.cube);
        if (scene.isCompleted) {
            scene.crossAt = scene.crossAt || new Date(Date.now());
            scene.f2lAt = scene.f2lAt || new Date(Date.now());
            scene.ollAt = scene.ollAt || new Date(Date.now());
            scene.completedAt = new Date(Date.now());
        }
        if (!scene.isCompleted) {
            scene.crossSides = findCubeCrosses(scene.cube);
            if (scene.crossSides.length) scene.crossAt = scene.crossAt || new Date(Date.now());
            let f2lSide = findCubeF2L(scene.cube, scene.crossSides);
            scene.f2lSides = f2lSide.sides;
            if (scene.f2lSides.length == 4) scene.f2lAt = scene.f2lAt || scene.f2lAt || new Date(Date.now());
            scene.ollSide = findCubeOLL(scene.cube, f2lSide.crossSide);
            if (scene.ollSide != SIDES.CENTER) scene.ollAt = scene.ollAt || new Date(Date.now());
        }
        refreshScene(scene);
        onFinished && onFinished();
    }, 350);
}

/**
 * 
 * @param {{ document: HTMLDocument, cube: number[][][][], cubeHtmlElement: HTMLDocument, sceneHtmlElement: HTMLElement, createAt: Date, movements: string[], isBusy: bool, crossSides: [], f2lSides: [], ollSide: number, isCompleted: bool, crossAt: Date, f2lAt: Date, ollAt: Date, completedAt: Date }} scene 
 * @param {*} onFinished 
 */
export function resetScene(scene, onFinished) {
    scene.cubeHtmlElement.querySelectorAll(`.block`).forEach(_ => {
        _.classList.add('rotate');
        _.style.transform = '';
    });
    setTimeout(() => {
        scene.cubeHtmlElement.querySelectorAll(`.block`).forEach(_ => {
            _.classList.remove('rotate');
        });
        onFinished && onFinished();
    }, 350);
}

