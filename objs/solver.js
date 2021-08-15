import { basicOLLCornerAlgorithm } from "./algotithms/basic-oll-c-algorithm.js";
import { basicOLLEdgeAlgorithm } from "./algotithms/basic-oll-e-algorithm.js";
import { basicPllEdgeAlgorithm } from "./algotithms/basic-pll-e.algorithm.js";
import { f2lAlgorithm } from "./algotithms/f2l-algorithm.js";
import { ollAlgorithm } from "./algotithms/oll-algorithm.js";
import { POSITION, SIDES } from "./constants.js";
import { findCrossAlgorithm, findCubeColorBySide, findCubeF2LSides, findCubeOLL, findCubeSideCrosses, findF2LAlgorithm, findFixF2LAlgorithm, findOLLAlgorithm, findPLLAlgorithm, isCubeCompleted } from "./finder.js";
import { fixMovementsRemoveY, fixRedundance } from "./fixer.js";
import { MOVEMENTS } from "./movements.js";
import { rotateCubeFromTo, rotateCubeWithMovement } from "./rotator.js";
import { cloneCube, cubeToFlat, cubeToPattern, movementFromString, movementsFromNotation } from "./transformer.js";

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


export function solveCubeF2L(cube, crossSide = SIDES.DOWN, basicPosition = null) {
    if (findCubeF2LSides(cube, [crossSide]).sides.length == 4) return { solved: true, cube}
    let history = [];
    let algo;
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);
    for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 4; j++) {
            for (let k = 0; k < 4; k++) {
                algo = findF2LAlgorithm(solvedCube, basicPosition);
                if (algo) break;
                solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.U, history);
            }
            if (algo) break;
            solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.Y, history);
        }
        if (algo) break;
        solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.Y, history);
        let fix = findFixF2LAlgorithm(solvedCube, basicPosition);
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


export function solveCubeOLL(cube, crossSide = SIDES.DOWN, basicPosition = null) {
    let color = findCubeColorBySide(cube, SIDES.UP);
    let cubePositions;
    if (basicPosition == POSITION.EDGE) cubePositions = basicOLLEdgeAlgorithm.positions;
    else if (basicPosition == POSITION.CORNER) cubePositions = basicOLLCornerAlgorithm.positions;
    else cubePositions = ollAlgorithm.positions;
    let cubeFlat = cubeToFlat(cube);
    if (cubePositions.every(_ => cubeFlat[_][SIDES.UP] == color)) return { solved: true, cube };

    let history = [];
    let algo;
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);
    for (let i = 0; i < 4; i++) {
        algo = findOLLAlgorithm(solvedCube, basicPosition);
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

export function solveCubePLL(cube, crossSide = SIDES.DOWN, basicPosition = null) {
    let history = [];
    let algo;
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            algo = findPLLAlgorithm(solvedCube, basicPosition);
            if (algo) break;
            solvedCube = rotateCubeWithMovement(solvedCube, MOVEMENTS.U, history);
            if (isCubeCompleted(solvedCube)) return { solved: true, cube: solvedCube,  adjusts: fixRedundance(history.map(_ => movementFromString(_)))};
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

export function solveCube(cube, crossSide = SIDES.DOWN, useBasic = false) {
    let ret = { movements: [], solved: false, cube };
    let solvedCube = rotateCubeFromTo(cube, crossSide, SIDES.DOWN, history);

    let crosses = [];
    for (let i = 0; i < 4; i++) {
        if (findCubeSideCrosses(solvedCube).includes(crossSide)) break;
        let cross = solveCubeCross(solvedCube);
        if (!cross.solved) return { solved: false, cube };
        solvedCube = cross.cube;
        if (cross.algo) crosses.push(cross);
    }
    ret.cross = crosses.map(_ => ({ algo: _.algo, adjusts: _.adjusts }));

    
    let f2ls = [];
    for(let basicPosition of (useBasic ? [POSITION.CORNER, POSITION.EDGE] : [null])) {
        for (let i = 0; i < 4; i++) {
            if (findCubeF2LSides(solvedCube, [SIDES.DOWN], basicPosition).sides.length == 4) break;
            let f2l = solveCubeF2L(solvedCube, SIDES.DOWN, basicPosition);
            if (!f2l.solved) return { solved: false, cube };
            solvedCube = f2l.cube;
            if (f2l.algo) f2ls.push(f2l);
        }
    } 
    ret.f2ls = f2ls.map(_ => ({ algo: _.algo, adjusts: _.adjusts }));

    let olls = [];
    for(let basicPosition of (useBasic ? [POSITION.EDGE, POSITION.CORNER] : [null])) {
        let oll = solveCubeOLL(solvedCube, SIDES.DOWN, basicPosition);
        if (!oll.solved) return { solved: false, cube };
        solvedCube = oll.cube;
        if (oll.algo) olls.push(oll);
    }
    ret.olls = olls.map(_ => ({ algo: _.algo, adjusts: _.adjusts }));

    let plls = [];
    for(let basicPosition of (useBasic ? [POSITION.CORNER, POSITION.EDGE] : [null])) {
        let pll = solveCubePLL(solvedCube, SIDES.DOWN, basicPosition);
        if (!pll.solved) return { solved: false, cube };
        solvedCube = pll.cube;
        if (pll.algo) plls.push(pll);
    }
    ret.plls = plls.map(_ => ({ algo: _.algo, adjusts: _.adjusts }));

    ret.cube = solvedCube;
    
    ret.cross.forEach(_ => {
        if (_.adjusts) ret.movements.push(..._.adjusts);
        if (_.algo && _.algo.movements) ret.movements.push(..._.algo.movements);
    });
    ret.f2ls.forEach(_ => {
        if (_.adjusts) ret.movements.push(..._.adjusts);
        if (_.algo && _.algo.movements) ret.movements.push(..._.algo.movements);
    });
    ret.olls.forEach(_ => {
        if (_.adjusts) ret.movements.push(..._.adjusts);
        if (_.algo && _.algo.movements) ret.movements.push(..._.algo.movements);
    });
    ret.plls.forEach(_ => {
        if (_.adjusts) ret.movements.push(..._.adjusts);
        if (_.algo && _.algo.movements) ret.movements.push(..._.algo.movements);
    });

    ret.solved = true;
    return ret;
}

