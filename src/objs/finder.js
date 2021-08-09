import { AXIS, CLOCK, COLORS, SIDES } from "./constants.js";
import { rotateCube } from "./rotator.js";
import { cloneCube, coordsToLayers, cubeToFlat } from "./transformer.js";


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

export function findCubeCrosses(cube) {
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

export function findCubeF2L(cube, crossSides) {
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


        if (checkFrontRightF2L(checkCube)) sides.push(SIDES.FRONT)
        checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
        if (checkFrontRightF2L(checkCube)) sides.push(SIDES.LEFT)
        checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
        if (checkFrontRightF2L(checkCube)) sides.push(SIDES.BACK)
        checkCube = rotateCube(AXIS.Y, checkCube, layers, true);
        if (checkFrontRightF2L(checkCube)) sides.push(SIDES.RIGHT);

        if (sides.length > matchs.sides.length) matchs = { crossSide: crossSide, sides: sides };
    }

    return matchs;
}

function checkFrontRightF2L(cube) {
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

    return edgeFrontColor == frontSideColor
        && edgeRightColor == rightSideColor
        && cornerFrontColor == frontSideColor
        && cornerRightColor == rightSideColor
        && cornerDownColor == downSideColor;
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
    for(let y of layers) {
        for(let x of layers) {
            if (cube[0][y][x][SIDES.FRONT] != frontSideColor) return false;
        }
    }
    return true;
}