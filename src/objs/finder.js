import { basicF2LCornerAlgorithm } from "./algotithms/basic-f2l-c-algorithm.js";
import { basicF2LEdgeAlgorithm } from "./algotithms/basic-f2l-e-algorithm.js";
import { basicOLLCornerAlgorithm } from "./algotithms/basic-oll-c-algorithm.js";
import { basicOLLEdgeAlgorithm } from "./algotithms/basic-oll-e-algorithm.js";
import { basicPllCornerAlgorithm } from "./algotithms/basic-pll-c-algorithm.js";
import { basicPllEdgeAlgorithm } from "./algotithms/basic-pll-e.algorithm.js";
import { crossAlgorithm } from "./algotithms/cross-algorithm.js";
import { f2lAlgorithm } from "./algotithms/f2l-algorithm.js";
import { ollAlgorithm } from "./algotithms/oll-algorithm.js";
import { pllAlgorithm } from "./algotithms/pll-algorithm.js";
import { AXIS, CLOCK, COLORS, POSITION, SIDES } from "./constants.js";
import { createCube, createCubeWithColors } from "./creator.js";
import { MOVEMENTS } from "./movements.js";
import { rotateCube, rotateCubeWithMovement } from "./rotator.js";
import { cloneCube, coordsToLayers, cubeToFlat, movementFromString, movementsFromNotation } from "./transformer.js";


export function findCubeColorBySide(cube, side) {
    let size = cube.length;
    let middle = (size - 1) / 2
    if (side == SIDES.FRONT) return cube[0][middle][middle][SIDES.FRONT];
    if (side == SIDES.UP) return cube[middle][0][middle][SIDES.UP];
    if (side == SIDES.LEFT) return cube[middle][middle][0][SIDES.LEFT];
    if (side == SIDES.BACK) return cube[size - 1][middle][middle][SIDES.BACK];
    if (side == SIDES.DOWN) return cube[middle][size - 1][middle][SIDES.DOWN];
    if (side == SIDES.RIGHT) return cube[middle][middle][size - 1][SIDES.RIGHT];
    return COLORS.BLACK;
}

export function findCubeSideByColor(cube, color) {
    let size = cube.length;
    let middle = (size - 1) / 2
    if (cube[0][middle][middle][SIDES.FRONT] == color) return SIDES.FRONT;
    if (cube[middle][0][middle][SIDES.UP] == color) return SIDES.UP;
    if (cube[middle][middle][0][SIDES.LEFT] == color) return SIDES.LEFT;
    if (cube[size - 1][middle][middle][SIDES.BACK] == color) return SIDES.BACK;
    if (cube[middle][size - 1][middle][SIDES.DOWN] == color) return SIDES.DOWN;
    if (cube[middle][middle][size - 1][SIDES.RIGHT] == color) return SIDES.RIGHT;
    return COLORS.BLACK;
}

export function findColorsByPosition(cube, position) {
    let z = Math.floor(position / (cube.length * cube.length));
    let y = Math.floor((position - (z * cube.length * cube.length)) / cube.length);
    let x = position - (z * cube.length * cube.length) - (y * cube.length);
    return cube[z][y][x];
}

export function findPositionsByAxis(size, { x = null, y = null, z = null } = {}) {
    let layers = [...Array(size).keys()];
    let positions = [];
    let i = 0;
    for (let lz of layers) {
        for (let ly of layers) {
            for (let lx of layers) {
                let px = x == null ? lx : x;
                let py = y == null ? ly : y;
                let pz = z == null ? lz : z;
                if (lx == px && ly == py && lz == pz) positions.push(i);
                i += 1;
            }
        }
    }
    return positions;
}



function findPositionByColors(cube, colors) {
    colors = [...colors, ...Object.keys(SIDES).map(() => COLORS.BLACK).slice(colors.length)].sort();
    let flat = cubeToFlat(cube);
    for (let i of [...Array(flat.length).keys()]) {
        let block = flat[i].map(_ => _);
        block.sort();
        if (block.every((b, ib) => b == colors[ib])) return i;
    }
    return -1;
}

export function findCenterPositionByColor(cube, color) {
    return findPositionByColors(cube, [color]);
}

export function findEdgePositionByColor(cube, color1, color2) {
    return findPositionByColors(cube, [color1, color2]);
}

export function findCornerPositionByColor(cube, color1, color2, color3) {
    return findPositionByColors(cube, [color1, color2, color3]);
}

let sidesAxisZ = [SIDES.UP, SIDES.RIGHT, SIDES.DOWN, SIDES.LEFT];
let sidesAxisY = [SIDES.BACK, SIDES.RIGHT, SIDES.FRONT, SIDES.LEFT];
let sidesAxisX = [SIDES.UP, SIDES.FRONT, SIDES.DOWN, SIDES.BACK];

export function findMovementFrontTo(fromSide, toSide) {
    let movements = [];
    let direction = 0;
    let move;
    let moveAnti;
    if (sidesAxisZ.includes(fromSide) && sidesAxisZ.includes(toSide)) {
        direction = sidesAxisZ.indexOf(toSide) - sidesAxisZ.indexOf(fromSide);
        move = MOVEMENTS.Z;
        moveAnti = MOVEMENTS.Z_;
    } else if (sidesAxisY.includes(fromSide) && sidesAxisY.includes(toSide)) {
        direction = sidesAxisY.indexOf(toSide) - sidesAxisY.indexOf(fromSide);
        move = MOVEMENTS.Y;
        moveAnti = MOVEMENTS.Y_;
    } else if (sidesAxisX.includes(fromSide) && sidesAxisX.includes(toSide)) {
        direction = sidesAxisX.indexOf(toSide) - sidesAxisX.indexOf(fromSide);
        move = MOVEMENTS.X_;
        moveAnti = MOVEMENTS.X;
    }
    if (direction) {
        if (Math.abs(direction) == 2) {
            movements.push(move);
            movements.push(move);
        } else if (direction > 0) {
            movements.push(move);
        } else if (direction < 0) {
            movements.push(moveAnti);
        }
    }
    return movements;
}

export function findCubeSideCrosses(cube) {
    let sides = [];
    let layers = coordsToLayers([], cube.length);

    let checkCube = cube;

    if (checkFrontCross(checkCube)) sides.push(SIDES.FRONT);

    checkCube = rotateCube(AXIS.X, cube, layers, true);
    if (checkFrontCross(checkCube)) sides.push(SIDES.UP);

    checkCube = rotateCube(AXIS.Y, cube, layers, true);
    if (checkFrontCross(checkCube)) sides.push(SIDES.LEFT);

    checkCube = rotateCube(AXIS.X, rotateCube(AXIS.X, cube, layers, false), layers, false);
    if (checkFrontCross(checkCube)) sides.push(SIDES.BACK);

    checkCube = rotateCube(AXIS.X, cube, layers, false);
    if (checkFrontCross(checkCube)) sides.push(SIDES.DOWN);

    checkCube = rotateCube(AXIS.Y, cube, layers, false);
    if (checkFrontCross(checkCube)) sides.push(SIDES.RIGHT);

    return sides;
}

function checkFrontCross(cube) {
    let middle = Math.floor(cube.length / 2);
    let end = cube.length - 1;
    let frontSideColor = findCubeColorBySide(cube, SIDES.FRONT);
    let upSideColor = findCubeColorBySide(cube, SIDES.UP);
    let leftSideColor = findCubeColorBySide(cube, SIDES.LEFT);
    let downSideColor = findCubeColorBySide(cube, SIDES.DOWN);
    let rightSideColor = findCubeColorBySide(cube, SIDES.RIGHT);

    let frontUpColor = cube[0][0][middle][SIDES.FRONT];
    let upColor = cube[0][0][middle][SIDES.UP];
    let frontLeftColor = cube[0][middle][0][SIDES.FRONT];
    let leftColor = cube[0][middle][0][SIDES.LEFT]
    let frontRightColor = cube[0][middle][end][SIDES.FRONT];
    let rightColor = cube[0][middle][end][SIDES.RIGHT];
    let downFrontColor = cube[0][end][middle][SIDES.FRONT];
    let downColor = cube[0][end][middle][SIDES.DOWN];

    return frontUpColor == frontSideColor
        && upColor == upSideColor
        && frontLeftColor == frontSideColor
        && leftColor == leftSideColor
        && frontRightColor == frontSideColor
        && rightColor == rightSideColor
        && downFrontColor == frontSideColor
        && downColor == downSideColor;
}

export function findCubeF2LSides(cube, crossSides, basicPosition) {
    let layers = coordsToLayers([], cube.length);
    let matchs = { crossSide: SIDES.CENTER, sides: [] };
    for (let crossSide of crossSides) {
        let checkCube = cube;
        let sides = [];
        if (crossSide == SIDES.FRONT) checkCube = rotateCube(AXIS.X, checkCube, layers, true);
        if (crossSide == SIDES.UP) checkCube = rotateCube(AXIS.X, rotateCube(AXIS.X, checkCube, layers, false), layers, false);
        if (crossSide == SIDES.BACK) checkCube = rotateCube(AXIS.X, cube, layers, false);
        if (crossSide == SIDES.LEFT) checkCube = rotateCube(AXIS.Z, cube, layers, true);
        if (crossSide == SIDES.RIGHT) checkCube = rotateCube(AXIS.Z, cube, layers, false);


        if (checkFrontRightF2L(checkCube, basicPosition)) sides.push(SIDES.FRONT)
        checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
        if (checkFrontRightF2L(checkCube, basicPosition)) sides.push(SIDES.RIGHT)
        checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
        if (checkFrontRightF2L(checkCube, basicPosition)) sides.push(SIDES.BACK)
        checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
        if (checkFrontRightF2L(checkCube, basicPosition)) sides.push(SIDES.LEFT);

        if (sides.length > matchs.sides.length) matchs = { crossSide: crossSide, sides: sides };
    }

    return matchs;
}

function checkFrontRightF2L(cube, basicPosition = null) {
    let middle = Math.floor(cube.length / 2);
    let end = cube.length - 1;
    let frontSideColor = findCubeColorBySide(cube, SIDES.FRONT);
    let rightSideColor = findCubeColorBySide(cube, SIDES.RIGHT);
    let downSideColor = findCubeColorBySide(cube, SIDES.DOWN);

    let edgeFrontColor = cube[0][middle][end][SIDES.FRONT];
    let edgeRightColor = cube[0][middle][end][SIDES.RIGHT];
    let cornerFrontColor = cube[0][end][end][SIDES.FRONT];
    let cornerRightColor = cube[0][end][end][SIDES.RIGHT];
    let cornerDownColor = cube[0][end][end][SIDES.DOWN];

    if (basicPosition == POSITION.CORNER) {
        return cornerFrontColor == frontSideColor
            && cornerRightColor == rightSideColor
            && cornerDownColor == downSideColor;
    } else {
        return edgeFrontColor == frontSideColor
            && edgeRightColor == rightSideColor
            && cornerFrontColor == frontSideColor
            && cornerRightColor == rightSideColor
            && cornerDownColor == downSideColor;
    }
}

export function findCubeOLL(cube, crossSide) {
    let checkCube = cube;
    let layers = coordsToLayers([], cube.length);
    if (crossSide == SIDES.UP) checkCube = rotateCube(AXIS.X, checkCube, layers, CLOCK.ANTI);
    if (crossSide == SIDES.DOWN) checkCube = rotateCube(AXIS.X, checkCube, layers, CLOCK.NORMAL);
    if (crossSide == SIDES.LEFT) checkCube = rotateCube(AXIS.Y, checkCube, layers, CLOCK.ANTI);
    if (crossSide == SIDES.RIGHT) checkCube = rotateCube(AXIS.Y, checkCube, layers, CLOCK.NORMAL);
    if (crossSide == SIDES.FRONT) checkCube = rotateCube(AXIS.X, rotateCube(AXIS.X, checkCube, layers, false), layers, false);
    // if (crossSide == SIDES.FRONT) checkCube = rotateCube(AXIS.X, checkCube, layers, true);
    // if (crossSide == SIDES.UP) checkCube = rotateCube(AXIS.X, rotateCube(AXIS.X, checkCube, layers, false), layers, false);
    // if (crossSide == SIDES.BACK) checkCube = rotateCube(AXIS.X, cube, layers, false);
    // if (crossSide == SIDES.LEFT) checkCube = rotateCube(AXIS.Z, cube, layers, true);
    // if (crossSide == SIDES.RIGHT) checkCube = rotateCube(AXIS.Z, cube, layers, false);

    if (checkFrontSideCompleted(checkCube)) {
        if (crossSide == SIDES.FRONT) return SIDES.BACK;
        if (crossSide == SIDES.UP) return SIDES.DOWN;
        if (crossSide == SIDES.LEFT) return SIDES.RIGHT;
        if (crossSide == SIDES.BACK) return SIDES.FRONT;
        if (crossSide == SIDES.DOWN) return SIDES.UP;
        if (crossSide == SIDES.RIGHT) return SIDES.LEFT;
    }

    return SIDES.CENTER
}

export function isCubeCompleted(cube) {
    let checkCube = cube;
    let layers = coordsToLayers([], cube.length);
    if (!checkFrontSideCompleted(checkCube)) return false;
    checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
    if (!checkFrontSideCompleted(checkCube)) return false;
    checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
    if (!checkFrontSideCompleted(checkCube)) return false;
    checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
    if (!checkFrontSideCompleted(checkCube)) return false;
    checkCube = rotateCube(AXIS.Z, checkCube, layers, true);
    if (!checkFrontSideCompleted(checkCube)) return false;
    checkCube = rotateCube(AXIS.Z, checkCube, layers, true);
    checkCube = rotateCube(AXIS.Z, checkCube, layers, true);
    if (!checkFrontSideCompleted(checkCube)) return false;
    return true;
}

function checkFrontSideCompleted(cube) {
    let frontSideColor = findCubeColorBySide(cube, SIDES.FRONT);
    let layers = [...Array(cube.length).keys()];
    for (let y of layers) {
        for (let x of layers) {
            if (cube[0][y][x][SIDES.FRONT] != frontSideColor) return false;
        }
    }
    return true;
}

export function findCrossAlgorithm(cube) {
    let cubeEdgeColors = crossAlgorithm.edge.map(_ => findCubeColorBySide(cube, _));
    let position = findEdgePositionByColor(cube, cubeEdgeColors[0], cubeEdgeColors[1]);
    let algo = Object.values(crossAlgorithm.cases).find(c => {
        if (c.positions[0] != position) return false;
        let blockEdgeColors = findColorsByPosition(cube, position);
        let colors = c.corner.map(_ => blockEdgeColors[_]);
        return colors.every((c, i) => c == cubeEdgeColors[i]);
    });
    if (algo) return { name: algo.name, movements: movementsFromNotation(algo.moves) };
}


export function findF2LAlgorithm(cube, basicPosition = null) {
    let algoEdge;
    let algoCorner;
    let algoCases;
    if (basicPosition == POSITION.CORNER) {
        algoEdge = basicF2LCornerAlgorithm.edge;
        algoCorner = basicF2LCornerAlgorithm.corner;
        algoCases = basicF2LCornerAlgorithm.cases;
    } else if (basicPosition == POSITION.EDGE) {
        algoEdge = basicF2LEdgeAlgorithm.edge;
        algoCorner = basicF2LEdgeAlgorithm.corner;
        algoCases = basicF2LEdgeAlgorithm.cases;
    } else {
        algoEdge = f2lAlgorithm.edge;
        algoCorner = f2lAlgorithm.corner;
        algoCases = f2lAlgorithm.cases;
    }
    let cubeEdgeColors = algoEdge.map(_ => findCubeColorBySide(cube, _));
    let cubeCornerColors = algoCorner.map(_ => findCubeColorBySide(cube, _));
    let edgePosition = findEdgePositionByColor(cube, cubeEdgeColors[0], cubeEdgeColors[1]);
    let cornerPosition = findCornerPositionByColor(cube, cubeCornerColors[0], cubeCornerColors[1], cubeCornerColors[2]);
    let algo = Object.values(algoCases).find(c => {
        if (c.edge.position != edgePosition) return false;
        if (c.corner.position != cornerPosition) return false;
        let blockEdgeColors = edgePosition >= 0 ? findColorsByPosition(cube, edgePosition) : [];
        let edgeColors = c.edge.sides.map(_ => blockEdgeColors[_]);
        let blockCornerColors = findColorsByPosition(cube, cornerPosition);
        let cornerColors = c.corner.sides.map(_ => blockCornerColors[_]);
        return edgeColors.every((c, i) => c == cubeEdgeColors[i])
            && cornerColors.every((c, i) => c == cubeCornerColors[i]);
    });
    if (algo) {
        return { name: algo.name, movements: movementsFromNotation(algo.moves) };
    }
    return null;
}

export function findFixF2LAlgorithm(cube, basicPosition = null) {
    let movements = [];
    for(let i=0;i<4;i++) {
        if (!checkFrontRightF2L(cube, basicPosition)) {
            if (basicPosition == POSITION.CORNER) {
                movements.push(...movementsFromNotation(basicF2LCornerAlgorithm.fix.moves));
                return movements;
            } else if (basicPosition == POSITION.EDGE) {
                movements.push(...movementsFromNotation(basicF2LEdgeAlgorithm.fix.moves));
                return movements;
            } else {
                movements.push(...movementsFromNotation(f2lAlgorithm.fix.moves));
                return movements;
            }
        }
        movements.push(MOVEMENTS.Y);
        cube = rotateCubeWithMovement(cube, MOVEMENTS.Y);
    }
    
    return null;
}



export function findOLLAlgorithm(cube, basicPosition = null) {
    let algoSide;
    let algoPositions;
    let algoCases;
    if (basicPosition == POSITION.CORNER) {
        algoSide = basicOLLCornerAlgorithm.side;
        algoPositions = basicOLLCornerAlgorithm.positions;
        algoCases = basicOLLCornerAlgorithm.cases;
    } else if (basicPosition == POSITION.EDGE) {
        algoSide = basicOLLEdgeAlgorithm.side;
        algoPositions = basicOLLEdgeAlgorithm.positions;
        algoCases = basicOLLEdgeAlgorithm.cases;
    } else {
        algoSide = ollAlgorithm.side;
        algoPositions = ollAlgorithm.positions;
        algoCases = ollAlgorithm.cases;
    }
    let color = findCubeColorBySide(cube, algoSide);
    let positionColors = algoPositions.map(_ => findColorsByPosition(cube, _));
    let algo = Object.values(algoCases).find(c => {
        return positionColors.every((p, i) => p[c.sides[i]] == color);
    });
    if (algo) {
        return { name: algo.name, movements: movementsFromNotation(algo.moves) };
    }
    return null;
}

export function findPLLAlgorithm(cube, basicPosition = null) {
    let algoPositions;
    let algoCases;
    if (basicPosition == POSITION.CORNER) {
        algoPositions = basicPllCornerAlgorithm.positions;
        algoCases = basicPllCornerAlgorithm.cases;
    } else if (basicPosition == POSITION.EDGE) {
        algoPositions = basicPllEdgeAlgorithm.positions;
        algoCases = basicPllEdgeAlgorithm.cases;
    } else {
        algoPositions = pllAlgorithm.positions;
        algoCases = pllAlgorithm.cases;
    }
    let cubeRef = createCubeWithColors(Object.values(SIDES).filter(_ => _ != SIDES.CENTER).map(_ => findCubeColorBySide(cube, _)), cube.length);
    let colors = algoPositions.map(_ => findColorsByPosition(cube, _));
    let algo = Object.values(algoCases).find(c => {
        let colorsRef = c.positions.map(_ => findColorsByPosition(cubeRef, _));
        return colors.every((color, i) => color.every(_ => colorsRef[i].includes(_)));
    });
    if (algo) return { name: algo.name, movements: movementsFromNotation(algo.moves) };
    return null;
}
