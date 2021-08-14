import { AXIS, CLOCK, SIDES } from "../objs/constants.js";
import { axisToString, movementByValues } from "../objs/transformer.js";

export default function dragSceneHandler() {

    let scene;
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

    function attach(sceneComponent) {
        scene = sceneComponent;
        scene.element.addEventListener("touchstart", (event) => start(null, event.touches[0].screenX, event.touches[0].screenY));
        scene.element.addEventListener("mousedown", (event) => start(null, event.screenX, event.screenY));
        scene.element.addEventListener("touchmove", (event) => move(event.touches[0].screenX, event.touches[0].screenY));
        scene.element.addEventListener("mousemove", (event) => move(event.screenX, event.screenY));
        scene.element.addEventListener("touchleave", () => end());
        scene.element.addEventListener("touchend", () => end());
        scene.element.addEventListener("touchcancel", () => end());
        scene.element.addEventListener("mouseup", () => end());
        scene.element.querySelectorAll(".side:not(.template)").forEach(_ => {
            _.addEventListener("touchstart", (event) => start(event.target, event.touches[0].screenX, event.touches[0].screenY));
            _.addEventListener("mousedown", (event) => start(event.target, event.screenX, event.screenY));
        });
    }

    function dettach() {
        scene.element.touchstart = null;
        scene.element.mousedown = null;
        scene.element.touchmove = null;
        scene.element.mousemove = null;
        scene.element.touchleave = null;
        scene.element.touchend = null;
        scene.element.touchcancel = null;
        scene.element.mouseup = null;
        scene.element.querySelectorAll(".side:not(.template)").forEach(_ => {
            _.touchstart = null;
            _.mousedown = null;
        });
        scene = null;
    }


    function start(sideElement, x, y) {
        if (scene.state.isBusy || isDragging) return;
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


    function move(x, y) {
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
                dragLayers = [parseInt(dragSideElement.parentElement.dataset[axisToString(dragAxis)])];
                dragBlockElements = scene.element.querySelectorAll(`.block.position-${axisToString(dragAxis)}-${dragLayers}`)
            } else {
                dragLayers = [];
                dragBlockElements = scene.element.querySelectorAll(`.block`)
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

    function end() {
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
            let movement = movementByValues(dragAxis, dragLayers, clock, scene.state.cube.length);
            // let movement = {
            //     axis: dragAxis, layers: dragLayers, clock: clock
            // };

            scene.rotate(movement).then(() => {
                isDragMoving = false;
                isDragMovingX = false;
                isDragMovingY = false;
                isDragging = false;
                isDragEnding = false;
            });

        } else {
            scene.resetRotation().then(() => {
                isDragMoving = false;
                isDragMovingX = false;
                isDragMovingY = false;
                isDragging = false;
                isDragEnding = false;
            });
        }

    }

    return {
        attach,
        dettach
    }
}

