
import { COLORS, SIDES, CLOCK, AXIS } from "./constants.js";
import { rotateCube } from "./rotator.js";
import { axisToString, inverseKeyValue } from "./transformer.js";


let cube;
let document;
let rootId;

/**
 * 
 * @param {number[][][][]} cube 
 * @param {HTMLDocument} document
 * @param {string} rootId
 */
export function render(_cube, _document, _rootId) {
    cube = _cube;
    document = _document;
    rootId = _rootId;
    let rootElement = document.getElementById(rootId);
    let sceneElement;
    let sceneElements = rootElement.getElementsByClassName("scene");
    if (!sceneElements.length) {
        sceneElement = renderScene();
        rootElement.appendChild(sceneElement);
    } else {
        sceneElement = sceneElements[0];
    }

    while(sceneElement.getElementsByClassName("cube").length) sceneElement.removeChild(sceneElement.getElementsByClassName("cube")[0]);
    sceneElement.appendChild(renderCube());
}

/**
 * 
 * @param {HTMLDocument} document
 * @return {HTMLElement}
 */
function renderScene() {
    let sceneElement = document.createElement("div");
    sceneElement.classList.add("scene");
    sceneElement.addEventListener("touchmove", (event) => dragMove(sceneElement.querySelector(".cube"), event.touches[0].screenX, event.touches[0].screenY));
    sceneElement.addEventListener("touchleave", () => dragLeave());
    sceneElement.addEventListener("touchend", () => dragLeave());
    sceneElement.addEventListener("touchcancel", () => dragLeave());
    return sceneElement;
}


/**
 * 
 * @param {number[][][][]} cube 
 * @param {HTMLDocument} document
 * @return {HTMLElement}
 */
function renderCube() {
    let size = cube.length;
    let layers = [...Array(size).keys()];
    let cubeElement = document.createElement("div");
    cubeElement.classList.add("cube", `size-${size}`);
    let i = 0;
    for (let z in layers) {
        for (let y in layers) {
            for (let x in layers) {
                cubeElement.appendChild(renderBlock(i, x, y, z, cube[z][y][x]))
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

function renderBlock(position, x, y, z, colors) {
    let blockElement = document.createElement("div");
    blockElement.id = position;
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
            sideElement.addEventListener("touchstart", (event) => dragStart(event.target, event.touches[0].screenX, event.touches[0].screenY));
            blockElement.appendChild(sideElement);
        }
    }
    return blockElement;
}


let isDragging;
let isDragMoving;
let isDragMovingX;
let isDragMovingY;
let dragSideElement;
let dragSide;
let dragBlockElements;
let dragAxis;
let dragLayers;
let dragStartX;
let dragStartY;
let dragLastX;
let dragLastY;
let dragDirection;

/**
 * 
 * @param {HTMLElement} sideElement 
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
export function dragStart(sideElement, x, y) {
    if (isDragging) return;
    isDragging = true;
    dragSideElement = sideElement;
    if (dragSideElement.classList.contains("front")) dragSide = SIDES.FRONT;
    if (dragSideElement.classList.contains("up")) dragSide = SIDES.UP;
    if (dragSideElement.classList.contains("right")) dragSide = SIDES.RIGHT;
    dragStartX = x;
    dragStartY = y;
}

/**
 * 
 * @param {HTMLElement} cubeElement 
 * @param {number} x 
 * @param {number} y 
 * @returns 
 */
export function dragMove(cubeElement, x, y) {
    if (!isDragging) return;
    let offsetX = x - dragStartX;
    let offsetY = y - dragStartY;
    if (!isDragMoving) {
        
        if (Math.abs(offsetX) > 5) {
            isDragMoving = true;
            isDragMovingX = true;
            if (dragSide == SIDES.FRONT) dragAxis = AXIS.Y;
            if (dragSide == SIDES.UP) dragAxis = AXIS.Z;
            if (dragSide == SIDES.RIGHT) dragAxis = AXIS.Y;
        } else if (Math.abs(offsetY) > 5) {
            isDragMoving = true;
            isDragMovingY = true;
            if (dragSide == SIDES.FRONT) dragAxis = AXIS.X;
            if (dragSide == SIDES.UP) dragAxis = AXIS.X;
            if (dragSide == SIDES.RIGHT) dragAxis = AXIS.Z;
        }
        dragLayers = [dragSideElement.parentElement.dataset[axisToString(dragAxis)]];
        dragBlockElements = cubeElement.querySelectorAll(`.position-${axisToString(dragAxis)}-${dragLayers}`)
    }
    if (isDragMoving) {
        dragDirection = 0;
        if (isDragMovingX && offsetX > dragLastX) dragDirection = 1;
        if (isDragMovingX && offsetX < dragLastX) dragDirection = -1;
        if (isDragMovingY && offsetY > dragLastY) dragDirection = 1;
        if (isDragMovingY && offsetY < dragLastY) dragDirection = -1;
        dragLastX = offsetX;
        dragLastY = offsetY;
        let offset = Math.floor((isDragMovingX ? offsetX : offsetY) / (isDragMovingX ? 2 : -2));
        offset = dragSide == SIDES.RIGHT && dragAxis == AXIS.Z ? -offset : offset;
        dragBlockElements.forEach(_ => {
            let transform = `rotateX(${dragAxis == AXIS.X ? offset : 0}deg) `;
            transform += `rotateY(${dragAxis == AXIS.Y ? offset : 0}deg) `
            transform += `rotateZ(${dragAxis == AXIS.Z ? offset : 0}deg) `;
            transform += "translate3d(";
            transform += `calc(var(--block-size) * ${parseInt(_.dataset.x) - 1.5}),`;
            transform += `calc(var(--block-size) * ${parseInt(_.dataset.y) - 1.5}),`;
            transform += `calc(var(--block-size) * ${-parseInt(_.dataset.z) + 1}))`;
            transform += ``
            _.style.transform = transform;
        })
    }
     
}

export function dragLeave() {
    if (!isDragging) return;
    let clock = dragDirection < 0 ? CLOCK.NORMAL : CLOCK.ANTI;
    if (dragSide == SIDES.UP) clock = !clock;
    if (dragSide == SIDES.FRONT && dragAxis == AXIS.X) clock = !clock;
    if (dragSide == SIDES.RIGHT && dragAxis == AXIS.Z) clock = !clock;
    dragBlockElements.forEach(_ => {
        _.style.transform = '';
        _.classList.add('rotate', `rotate-${axisToString(dragAxis)}${clock ? '' : '-anti'}`)
    });
    setTimeout(() => {
        for(let layer of dragLayers) {
            cube = rotateCube(dragAxis, cube, layer, clock);
        }
        render(cube, document, rootId);
        isDragMoving = false;
        isDragMovingX = false;
        isDragMovingY = false;
        isDragging = false;
    }, 350);
    
}