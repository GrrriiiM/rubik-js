import { COLORS, SIDES } from "../../objs/constants.js";
import { createCube } from "../../objs/creator.js";
import { cubeIsCompleted, findCubeCrosses, findCubeF2L, findCubeOLL } from "../../objs/finder.js";
import { rotateCube, shuffleCube } from "../../objs/rotator.js";
import { axisToString, coordsToLayers, inverseKeyValue } from "../../objs/transformer.js";

export default function sceneComponent(dragSceneHandler) {
    let self;
    let dragHandler = dragSceneHandler;
    let element;
    let cubeElement;

    let state = {
        cube: shuffleCube(createCube(3)),
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
    };



    function render(parentElement) {
        fetch("./components/scene/scene.component.html").then(async (reponse) => {
            element = parentElement.querySelector(".scene");
            element.innerHTML = await reponse.text();
            self.element = element;
            createCubeElement();
            dragHandler ? dragHandler.attach(self) : null;
            refreshCubeElement();
            element.appendChild(cubeElement);
        });
    }

    function refreshCubeElement() {
        let colorEntries = inverseKeyValue(COLORS);
        let colors = Object.keys(COLORS).map(_ => _.toLowerCase());
        let sideEntries = Object.entries(SIDES);

        for (let blockElement of cubeElement.querySelectorAll(".block")) {
            blockElement.classList.remove(...[
                "rotate",
                "rotate-x",
                "rotate-y",
                "rotate-z",
                "rotate-x-anti",
                "rotate-y-anti",
                "rotate-z-anti"
            ]);
            let x = parseInt(blockElement.dataset.x);
            let y = parseInt(blockElement.dataset.y);
            let z = parseInt(blockElement.dataset.z);
            for (let side of sideEntries) {
                if (side[1] != SIDES.CENTER) {
                    let sideElement = blockElement.querySelector(`.side.${side[0].toLowerCase()}`);
                    sideElement.classList.remove(...colors);
                    sideElement.classList.add(colorEntries[state.cube[z][y][x][side[1]]].toLowerCase());
                }
            }
        }
    }

    function createCubeElement() {
        let size = state.cube.length;
        let sideEntries = Object.entries(SIDES);
        cubeElement = element.querySelector(".cube.template").cloneNode(true);
        cubeElement.classList.remove("template");
        let layers = [...Array(size).keys()];
        let position = 0;
        for (let z of layers) {
            for (let y of layers) {
                for (let x of layers) {
                    let blockElement = element.querySelector(".block.template").cloneNode(true);
                    blockElement.classList.remove("template");
                    blockElement.dataset.position = position;
                    blockElement.dataset.x = x;
                    blockElement.dataset.y = y;
                    blockElement.dataset.z = z;
                    blockElement.classList.add("block", `position-x-${x}`, `position-y-${y}`, `position-z-${z}`);
                    for (let side of sideEntries) {
                        if (side[1] != SIDES.CENTER) {
                            let sideElement = element.querySelector(".side.template").cloneNode(true);
                            sideElement.classList.remove("template");
                            sideElement.classList.add(side[0].toLowerCase())
                            blockElement.appendChild(sideElement);
                        }
                    }
                    position += 1;
                    cubeElement.appendChild(blockElement);
                }
            }
        }
        element.appendChild(cubeElement);
    }


    function rotate(movement, onFinished) {
        if (state.isBusy) return;
        state.isBusy = true;
        let axis = axisToString(movement.axis);
        state.movements.push(movement.str);
        let layers = coordsToLayers(movement.layers, state.cube.length);
        for (let layer of layers) {
            cubeElement.querySelectorAll(`.block.position-${axis}-${layer}:not(.template)`).forEach(_ => {
                _.classList.add('rotate', `rotate-${axis}${movement.clock ? '' : '-anti'}`)
                _.style.transform = '';
            });
        }

        setTimeout(() => {
            updateStateCube(rotateCube(movement.axis, state.cube, layers, movement.clock));
            onFinished && onFinished();
            state.isBusy = false;
        }, 350);
    }

    function updateStateCube(cube) {
        state.cube = cube;
        state.isCompleted = state.isCompleted || cubeIsCompleted(state.cube);
        if (state.isCompleted) {
            state.crossAt = state.crossAt || new Date(Date.now());
            state.f2lAt = state.f2lAt || new Date(Date.now());
            state.ollAt = state.ollAt || new Date(Date.now());
            state.completedAt = new Date(Date.now());
        }
        if (!state.isCompleted) {
            state.crossSides = findCubeCrosses(state.cube);
            if (state.crossSides.length) state.crossAt = state.crossAt || new Date(Date.now());
            let f2lSide = findCubeF2L(state.cube, state.crossSides);
            state.f2lSides = f2lSide.sides;
            if (state.f2lSides.length == 4) state.f2lAt = state.f2lAt || state.f2lAt || new Date(Date.now());
            state.ollSide = findCubeOLL(state.cube, f2lSide.crossSide);
            if (state.ollSide != SIDES.CENTER) state.ollAt = state.ollAt || new Date(Date.now());
        }
        refreshCubeElement();
    }

    function resetRotation(onFinished) {
        state.isBusy = true;
        cubeElement.querySelectorAll(`.block`).forEach(_ => {
            _.classList.add('rotate');
            _.style.transform = '';
        });
        setTimeout(() => {
            cubeElement.querySelectorAll(`.block`).forEach(_ => {
                _.classList.remove('rotate');
            });
            onFinished && onFinished();
            state.isBusy = false;
        }, 350);
    }

    function reset() {
        state.cube = shuffleCube(createCube(state.cube.length));
        state.createAt = new Date(Date.now());
        state.movements = [];
        state.crossSides = [];
        state.f2lSides = [];
        state.ollSide = SIDES.CENTER;
        state.isCompleted = false;
        state.crossAt = null;
        state.f2lAt = null;
        state.ollAt = null;
        state.completedAt = null;
        refreshCubeElement();
    }

    return self = {
        element,
        state,
        render,
        rotate,
        resetRotation,
        reset
    };
}

