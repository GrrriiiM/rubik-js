import { f2lAlgorithm } from "./algotithms/f2l-algorithm.js";
import { SIDES } from "./constants.js";
import { findCrossAlgorithm, findCubeF2L, findCubeSideCrosses, findF2LAlgorithm, findFixF2LAlgorithm, findOLLAlgorithm } from "./finder.js";
import { fixMovementsRemoveY, fixRedundance } from "./fixer.js";
import { MOVEMENTS } from "./movements.js";
import { rotateCubeFromTo, rotateCubeWithMovement } from "./rotator.js";
import { movementFromString } from "./transformer.js";

export function solveCubeCross(cube, side, history) {
    let solved = false;
    let limit = 20;
    cube = rotateCubeFromTo(cube, side, SIDES.DOWN, history);
    while (!solved && limit > 0) {
        for (let i = 0; i < 4; i++) {
            let algo = findCrossAlgorithm(cube);
            algo.moves.forEach(_ => cube = rotateCubeWithMovement(cube, _, history));
            cube = rotateCubeFromTo(cube, SIDES.FRONT, SIDES.LEFT, history);
        }
        solved = findCubeSideCrosses(cube).includes(SIDES.DOWN);
        limit -= 1;
    }
    cube = rotateCubeFromTo(cube, SIDES.DOWN, side);
    return cube;
}


export function solveCubeF2L(cube, side, history) {
    let solved = false;
    let changed = false;
    let limit = 10;
    cube = rotateCubeFromTo(cube, side, SIDES.DOWN, history);
    while (!solved && limit > 0) {
        changed = false;
        for (let i = 0; i < 4; i++) {
            let algo;
            for (let j = 0; j < 4; j++) {
                algo = findF2LAlgorithm(cube);
                if (algo) break;
                cube = rotateCubeWithMovement(cube, MOVEMENTS.U, history);
            }
            if (algo && algo.moves.length) {
                algo.moves.forEach(_ => cube = rotateCubeWithMovement(cube, _, history));
                changed = true;
            }
            cube = rotateCubeFromTo(cube, SIDES.FRONT, SIDES.LEFT, history);
        }
        let f2lSides = findCubeF2L(cube, [SIDES.DOWN]);
        solved = f2lSides && f2lSides.sides.length == 4;
        if (!solved && !changed) {
            findFixF2LAlgorithm(f2lSides).forEach(_ => cube = rotateCubeWithMovement(cube, _, history));
            limit -= 1;
        }
    }
    if (!solved) console.log("ERRo F2L");
    cube = rotateCubeFromTo(cube, SIDES.DOWN, side, history);
    return cube;
}


export function solveCubeOLL(cube, side, history) {
    cube = rotateCubeFromTo(cube, side, SIDES.DOWN, history);
    for (let i = 0; i < 4; i++) {
        let algo = findOLLAlgorithm(cube);
        if (algo) {
            algo.moves.forEach(_ => cube = rotateCubeWithMovement(cube, _, history));
            break;
        }
        cube = rotateCubeWithMovement(cube, MOVEMENTS.Y, history);
    }
    cube = rotateCubeFromTo(cube, SIDES.DOWN, side, history);
    return cube;
}

export function solveCubeCrossMovements(cube, side, fix) {
    let history = [];
    solveCubeCross(cube, side, history);
    let movements = history.map(_ => movementFromString(_));
    if (fix) {
        movements = fixMovementsRemoveY(movements);
        movements = fixRedundance(movements);
    }
    return movements;
}


export function solveCubeF2LMovements(cube, side, fix) {
    let history = [];
    solveCubeF2L(cube, side, history);
    let movements = history.map(_ => movementFromString(_));
    if (fix) {
        movements = fixMovementsRemoveY(movements);
        movements = fixRedundance(movements);
    }
    return movements;
}

export function solveCubeOLLMovements(cube, side, fix) {
    let history = [];
    solveCubeOLL(cube, side, history);
    let movements = history.map(_ => movementFromString(_));
    if (fix) {
        movements = fixMovementsRemoveY(movements);
        movements = fixRedundance(movements);
    }
    return movements;
}

export function solveCubeMovements(cube, side = SIDES.DOWN, fix = true) {
    let history = [];
    cube = solveCubeCross(cube, side, history);
    cube = solveCubeF2L(cube, side, history);
    
    let movements = history.map(_ => movementFromString(_));
    if (fix) {
        movements = fixMovementsRemoveY(movements);
        movements = fixRedundance(movements);
    }
    history = [];
    cube = solveCubeOLL(cube, side, history);
    movements.push(...fixRedundance(history.map(_ => movementFromString(_))));
    return movements;
}

