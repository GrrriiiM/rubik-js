import { AXIS, CLOCK, SIDES } from "../constants.js";
import { axisToString } from "../transformer.js";

export function createDragger(scene) {

    let dragScene = scene;
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
    function dragStart(sideElement, x, y) {
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
    function dragMove(x, y) {
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
            dragBlockElements = scene.cubeHtmlElement.querySelectorAll(`.position-${axisToString(dragAxis)}-${dragLayers}`)
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
    
    function dragEnd(rotateScene) {
        if (!isDragging) return;
        let clock = dragDirection < 0 ? CLOCK.NORMAL : CLOCK.ANTI;
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
        });

    }

    return {
        dragStart: dragStart,
        dragMove: dragMove,
        dragEnd: dragEnd
    }
}

