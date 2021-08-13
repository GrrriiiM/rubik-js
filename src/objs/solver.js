import { f2lAlgorithm } from "./algotithms/f2l-algorithm.js";
import { SIDES } from "./constants.js";
import { findCrossAlgorithm, findCubeF2LSides, findCubeOLL, findCubeSideCrosses, findF2LAlgorithm, findFixF2LAlgorithm, findOLLAlgorithm, findPLLAlgorithm, isCubeCompleted } from "./finder.js";
import { fixMovementsRemoveY, fixRedundance } from "./fixer.js";
import { MOVEMENTS } from "./movements.js";
import { rotateCubeFromTo, rotateCubeWithMovement } from "./rotator.js";
import { cloneCube, cubeToPattern, movementFromString, movementsFromNotation } from "./transformer.js";

export function solveCubeCross(cube, crossSide = SIDES.DOWN) {
    if (findCubeSideCrosses(cube).includes(crossSide)) return { solved: true, cube }; 
    let history = [];
    let algo;
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);
    for (let i = 0; i < 4; i++) {
        algo = findCrossAlgorithm(solvedCube);
        if (algo) break;
        solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.Y, history);
    }

    if (algo) {
        algo.movements.forEach(_ => solvedCube = rotateCubeWithMovement(solvedCube, _));
        return {
            solved: true,
            cube: solvedCube,
            adjusts: fixRedundance(history.map(_ => movementFromString(_))),
            algo
        };
    } else {
        return {
            solved: false,
            cube
        };
    }
}


export function solveCubeF2L(cube, crossSide = SIDES.DOWN) {
    if (findCubeF2LSides(cube, [crossSide]).sides.length == 4) return { solved: true, cube}
    let history = [];
    let algo;
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                algo = findF2LAlgorithm(solvedCube);
                if (algo) break;
                solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.U, history);
            }
            if (algo) break;
            solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.Y, history);
        }
        if (algo) break;
        let fix = findFixF2LAlgorithm(findCubeF2LSides(solvedCube, [SIDES.DOWN]));
        if (!fix) break;
        fix.forEach(_ => solvedCube = rotateCubeWithMovement(solvedCube, _, history));
    }
    
    if (algo) {
        algo.movements.forEach(_ => solvedCube = rotateCubeWithMovement(solvedCube, _));
        return {
            solved: true,
            cube: solvedCube,
            adjusts: fixRedundance(history.map(_ => movementFromString(_))),
            algo
        };
    } else {
        return {
            solved: false,
            cube
        };
    }

}


export function solveCubeOLL(cube, crossSide = SIDES.DOWN) {
    let history = [];
    let algo;
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);
    if (findCubeOLL(solvedCube, crossSide) == SIDES.UP) return { solved: true, cube };
    for (let i = 0; i < 4; i++) {
        algo = findOLLAlgorithm(solvedCube);
        if (algo) break;
        solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.U, history);
    }
    if (algo) {
        algo.movements.forEach(_ => solvedCube = rotateCubeWithMovement(solvedCube, _));
        return {
            solved: true,
            cube: solvedCube,
            adjusts: fixRedundance(history.map(_ => movementFromString(_))),
            algo
        };
    } else {
        return {
            solved: false,
            cube
        };
    }
}

export function solveCubePLL(cube, crossSide = SIDES.DOWN) {
    if (isCubeCompleted(cube)) return { solved: true, cube };
    let history = [];
    let algo;
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            algo = findPLLAlgorithm(solvedCube);
            if (algo) break;
            solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.U, history);
        }
        if (algo) break;
        solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.Y, history);
    }
    if (algo) {
        algo.movements.forEach(_ => solvedCube = rotateCubeWithMovement(solvedCube, _));
        return {
            solved: true,
            cube: solvedCube,
            adjusts: fixRedundance(history.map(_ => movementFromString(_))),
            algo
        };
    } else {
        return {
            solved: false,
            cube
        };
    }
}

export function solveCube(cube, crossSide = SIDES.DOWN) {
    let ret = { movements: [], solved: false, cube };
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);

    // let cross = solveCubeCross(solvedCube);
    // if (!cross.solved) return { solved: false, cube };
    // solvedCube = cross.cube;
    // if (cross.movements && cross.movements.length) ret.cross = { movements: cross.movements };

    let crosses = [];
    for (let i = 0; i < 4; i++) {
        if (findCubeSideCrosses(solvedCube).includes(crossSide)) break;
        let cross = solveCubeCross(solvedCube);
        if (!cross.solved) return { solved: false, cube };
        solvedCube = cross.cube;
        if (cross.algo) crosses.push(cross);
    }
    if (crosses.length) ret.cross = crosses.map(_ => ({ algo: _.algo, adjusts: _.adjusts }));


    let f2ls = [];
    for (let i = 0; i < 4; i++) {
        if (findCubeF2LSides(solvedCube, [SIDES.DOWN]).sides.length == 4) break;
        let f2l = solveCubeF2L(solvedCube);
        if (!f2l.solved) return { solved: false, cube };
        solvedCube = f2l.cube;
        if (f2l.algo) f2ls.push(f2l);
    }
    if (f2ls.length) ret.f2ls = f2ls.map(_ => ({ algo: _.algo, adjusts: _.adjusts }));

    
    let oll = solveCubeOLL(solvedCube);
    if (!oll.solved) return { solved: false, cube };
    solvedCube = oll.cube;
    if (oll.algo) ret.oll = { algo: oll.algo, adjusts: oll.adjusts };

    let pll = solveCubePLL(solvedCube);
    if (!pll.solved) return { solved: false, cube };
    solvedCube = pll.cube;
    if (pll.algo) ret.pll = { algo: pll.algo, adjusts: pll.adjusts };

    ret.cube = solvedCube;
    
    if (ret.cross) ret.cross.forEach(_ => ret.movements.push(..._.adjusts, ..._.algo.movements));
    if (ret.f2ls) ret.f2ls.forEach(_ => ret.movements.push(..._.adjusts, ..._.algo.movements));
    if (ret.oll) ret.movements.push(...ret.oll.adjusts, ...ret.oll.algo.movements);
    if (ret.pll) ret.movements.push(...ret.pll.adjusts, ...ret.pll.algo.movements);
    ret.solved = true;
    return ret;
}

