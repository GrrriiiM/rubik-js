import { AXIS, CLOCK, SIDES } from "../constants.js";
import { axisToString } from "../transformer.js";
import { resetScene } from "./scene.js";

export function createDragger(scene) {

    let dragScene = scene;
    let isDragging;
    let isDragMoving;
    let isDragMovingX;
    let isDragMovingY;
    let isDragEnding;
    let dragSideElement;
    let dragSide;
    let dragBlockElements;
    let dragAxis;
    let dragLayers;
    let dragStartX;
    let dragStartY;
    let dragLastX;
    let dragLastY;
    let dragOffsetX;
    let dragOffsetY;
    let dragDirection;

    /**
     * 
     * @param {HTMLElement} sideElement 
     * @param {number} x 
     * @param {number} y 
     * @returns 
     */
    function dragStart(sideElement, x, y) {
        if (isDragging) return;
        isDragging = true;
        dragSideElement = sideElement;
        if (dragSideElement) {
            if (dragSideElement.classList.contains("front")) dragSide = SIDES.FRONT;
            if (dragSideElement.classList.contains("up")) dragSide = SIDES.UP;
            if (dragSideElement.classList.contains("right")) dragSide = SIDES.RIGHT;
        } else {
            dragSide = SIDES.FRONT;
        }
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
    function dragMove(x, y) {
        if (!isDragging || isDragEnding) return;
        dragLastX = x;
        dragLastY = y;
        let offsetX = dragLastX - dragStartX;
        let offsetY = dragLastY - dragStartY;
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
            if (dragSideElement) {
                dragLayers = [dragSideElement.parentElement.dataset[axisToString(dragAxis)]];
                dragBlockElements = scene.cubeHtmlElement.querySelectorAll(`.block.position-${axisToString(dragAxis)}-${dragLayers}`)
            } else {
                dragLayers = [];
                dragBlockElements = scene.cubeHtmlElement.querySelectorAll(`.block`)
            }
        }
        if (isDragMoving) {
            dragDirection = 0;
            if (isDragMovingX && offsetX > dragOffsetX) dragDirection = 1;
            if (isDragMovingX && offsetX < dragOffsetX) dragDirection = -1;
            if (isDragMovingY && offsetY > dragOffsetY) dragDirection = 1;
            if (isDragMovingY && offsetY < dragOffsetY) dragDirection = -1;
            dragOffsetX = offsetX;
            dragOffsetY = offsetY;
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

    function dragEnd(rotateScene) {
        if (!isDragging || isDragEnding) return;
        isDragEnding = true;
        let offsetX = dragLastX - dragStartX;
        let offsetY = dragLastY - dragStartY;
        if (((isDragMovingX && Math.abs(offsetX) > 30) 
            || (isDragMovingY && Math.abs(offsetY) > 30))) {

            let clock = CLOCK.NORMAL;
            if (isDragMovingX && offsetX > 0) clock = CLOCK.ANTI;
            if (isDragMovingY && offsetY > 0) clock = CLOCK.ANTI;
            if (dragSide == SIDES.UP) clock = !clock;
            if (dragSide == SIDES.FRONT && dragAxis == AXIS.X) clock = !clock;
            if (dragSide == SIDES.RIGHT && dragAxis == AXIS.Z) clock = !clock;
            let movement = {
                axis: dragAxis, layers: dragLayers, clock: clock
            };

            rotateScene(dragScene, movement, () => {
                isDragMoving = false;
                isDragMovingX = false;
                isDragMovingY = false;
                isDragging = false;
                isDragEnding = false;
            });

        } else {
            resetScene(dragScene, () => {
                isDragMoving = false;
                isDragMovingX = false;
                isDragMovingY = false;
                isDragging = false;
                isDragEnding = false;
            });
        }

    }

    return {
        dragStart: dragStart,
        dragMove: dragMove,
        dragEnd: dragEnd
    }
}

