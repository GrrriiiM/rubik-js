import { basicF2LCornerAlgorithm } from "../../objs/algotithms/basic-f2l-c-algorithm.js";
import { basicF2LEdgeAlgorithm } from "../../objs/algotithms/basic-f2l-e-algorithm.js";
import { basicOLLEdgeAlgorithm } from "../../objs/algotithms/basic-oll-e-algorithm.js";
import { basicPllCornerAlgorithm } from "../../objs/algotithms/basic-pll-c-algorithm.js";
import { crossAlgorithm } from "../../objs/algotithms/cross-algorithm.js";
import { f2lAlgorithm } from "../../objs/algotithms/f2l-algorithm.js";
import { ollAlgorithm } from "../../objs/algotithms/oll-algorithm.js";
import { COLORS, SIDES } from "../../objs/constants.js";
import { createCube, createCubeWithPattern } from "../../objs/creator.js";
import { isCubeCompleted, findCubeSideCrosses, findCubeF2LSides, findCubeOLL } from "../../objs/finder.js";
import { rotateCube, rotateCubeWithMovement, shuffleCube } from "../../objs/rotator.js";
import { solveCube } from "../../objs/solver.js";
import { axisToString, coordsToLayers, inverseKeyValue } from "../../objs/transformer.js";

export default function sceneComponent(dragSceneHandler, cube = null, canRotate = null) {
    let self;
    let dragHandler = dragSceneHandler;
    let element;
    let cubeElement;
    let rotationDelay = 1000;

    let state = {
        cube: cube || shuffleCube(createCube(3)),
        // cube: createCubeWithPattern("RYWYYUYOOGWURRGWUOYGGYGRGUURUOWWOWOYRGUOOGRWGUYWRURYWO"),
        // cube: createCubeWithPattern(basicPllCornerAlgorithm.sample),
        createAt: new Date(Date.now()),
        history: [],
        movementCOunt: 0,
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


    function rotate(movement, animate = true) {
        if (state.isBusy) Promise.resolve();
        if (canRotate) {
            if (!canRotate(movement)) return resetRotation();
        }
        return new Promise((resolve) => {
            state.isBusy = true;
            state.history.push({ isMovement: true, value: movement.str });
            let axis = axisToString(movement.axis);
            let layers = coordsToLayers(movement.layers, state.cube.length);
            if (!animate) {
                updateStateCube(rotateCube(movement.axis, state.cube, layers, movement.clock));
                state.isBusy = false;
                resolve();
                return;
            }
            let transition = false;
            for (let layer of layers) {
                let blockElements = cubeElement.querySelectorAll(`.block.position-${axis}-${layer}:not(.template)`);
                blockElements.forEach((_, i) => {
                    if (!transition) {
                        transition = true;
                        _.ontransitionend = (e) => rotateTransitionEnd(_, movement, layers, resolve);
                    }
                    _.classList.add('rotate', `rotate-${axis}${movement.clock ? '' : '-anti'}`)
                    _.style.transform = '';
                });
                if (!transition) {
                    state.isBusy = false;
                    resolve();
                }
            }
        });
    }

    function resetRotation() {
        return new Promise(resolve => {
            state.isBusy = true;
            let transition = false;
            cubeElement.querySelectorAll(`.block:not(.template)`).forEach((_, i) => {
                if (!transition && _.style.transform) {
                    transition = true;
                    _.ontransitionend = (e) => rotateTransitionEnd(_, null, null, resolve);
                }
                _.classList.add('rotate');
                _.style.transform = '';
            });
            if (!transition) {
                state.isBusy = false;
                resolve();
            }
        });
        // setTimeout(() => {
        //     cubeElement.querySelectorAll(`.block`).forEach(_ => {
        //         _.classList.remove('rotate');
        //     });
        //     onFinished && onFinished();
        //     state.isBusy = false;
        // }, rotationDelay);
    }

    function rotateTransitionEnd(element, movement, layers, resolve) {
        element.ontransitionend = null;
        if (movement && layers) {
            updateStateCube(rotateCube(movement.axis, state.cube, layers, movement.clock));
        }
        cubeElement.querySelectorAll(`.block`).forEach(_ => {
            _.classList.remove('rotate');
        });
        state.isBusy = false;
        setTimeout(resolve, 1);
    }

    function updateStateCube(cube) {
        state.cube = cube;

        state.crossSides = findCubeSideCrosses(state.cube);
        let f2l = findCubeF2LSides(state.cube, state.crossSides);
        state.f2lSides = f2l ? f2l.sides : [];
        state.ollSide = state.f2lSides.length == 4 && findCubeOLL(state.cube, f2l.crossSide);
        state.isCompleted = isCubeCompleted(state.cube);

        if (!state.crossAt) {
            if (state.crossSides.length || state.isCompleted) {
                state.crossAt = new Date(Date.now());
                state.history.push({ isCheck: true, value: "Cross" });
            }
        }

        if (state.crossAt && !state.f2lAt) {
            if (state.f2lSides.length == 4 || state.isCompleted) {
                state.f2lAt = new Date(Date.now());
                state.history.push({ isCheck: true, value: "F2L" });
            }
        }

        if (state.f2lAt && !state.ollAt) {
            if (state.ollSide != SIDES.CENTER || state.isCompleted) {
                state.ollAt = new Date(Date.now());
                state.history.push({ isCheck: true, value: "OLL" });
            }
        }

        if (state.ollAt && !state.completedAt) {
            if (state.isCompleted) {
                state.completedAt = new Date(Date.now());
                state.history.push({ isCheck: true, value: "Completo" });
            }
        }
        refreshCubeElement();
    }

    

    function reset() {
        state.cube = shuffleCube(createCube(state.cube.length));
        state.createAt = new Date(Date.now());
        state.history = [];
        state.movementCOunt = 0;
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

    async function solve() {
        let solution = solveCube(state.cube);
        if (solution.solved) {
            for (let movement of solution.movements) {
                await rotate(movement);
            }
        }
    }

    return self = {
        element,
        state,
        render,
        rotate,
        resetRotation,
        reset,
        solve
    };
}

