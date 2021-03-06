import { AXIS, COLORS, SIDES } from "./constants.js";
import { createCubeEmpty, patternColors } from "./creator.js";
import { MOVEMENTS, MOVEMENTS_STR } from "./movements.js";
import { rotateCubeFromTo } from "./rotator.js";


/**
 * 
 * @param {number[][][][]} cube 
 * @returns {number[][]}
 */
export function cubeToFlat(cube) {
    return cube.flat(2);
}

export function cubeFromFlat(flat, size = 3) {
    let layers = [...Array(size).keys()];
    return layers.map(z => layers.map(y => layers.map(x => flat[z * size * size + y * size + x])));
}

export function sideFromCube(side, { layer = 0, size = 1 } = {}) {
    let sidesBegin = [SIDES.FRONT, SIDES.UP, SIDES.LEFT];
    let sidesEnd = [SIDES.BACK, SIDES.DOWN, SIDES.RIGHT];
    if (sidesBegin.indexOf(side) >= 0 && layer == 0) return side;
    if (sidesEnd.indexOf(side) >= 0 && layer == size - 1) return side;
    return SIDES.CENTER;
}

export function positionToAxis(position, size) {
    let z = Math.floor(position / (size * size));
    let y = Math.floor((position - (z * size * size)) / size);
    let x = position - z * size * size - y * size;
    return [x, y, z];
}

export function colorFromSide(side) { return Object.entries(COLORS).find(_ => _[1] == side)[1] };

export function inverseKeyValue(dict) {
    let entries = {}
    Object.entries(dict).forEach(_ => entries[_[1]] = _[0]);
    return entries;
}

export function movementFromString(str) {
    return MOVEMENTS_STR[str];
}

export function axisToString(axis) {
    if (AXIS.Z == axis) return 'z';
    if (AXIS.Y == axis) return 'y';
    if (AXIS.X == axis) return 'x';
}

export function coordToLayer(coord, size) {
    if (coord != parseInt(coord)) coord = Math.floor(size / 2) + (Math.floor(coord * 10) - 1);
    return coord >= 0 ? coord : size + coord;
}

export function coordsToLayers(coords, size) {
    coords = coords && coords.length > 0 ? coords : [...Array(size).keys()]
    return coords.map(_ => coordToLayer(_, size));
}


export function movementByValues(axis, layers, clock, size) {
    let movements = Object.values(MOVEMENTS);
    layers = coordsToLayers(layers, size).join(' ');
    let movement = movements.find(_ =>
        _.axis == axis
        && _.clock == clock
        && coordsToLayers(_.layers, 3).join(' ') == layers);
    return movement;
}

export function cloneCube(cube) {
    return cube.map(z => z.map(y => y.map(x => x.map(_ => _))));
}

export function movementsFromNotation(notation) {
    let moves = [];
    for (let move of notation.split(' ')) {
        if (move) {
            if (move.endsWith("2")) {
                moves.push(movementFromString(move.replace("2", "")));
                moves.push(movementFromString(move.replace("2", "")));
            } else {
                moves.push(movementFromString(move));
            }
        }
    }
    return moves;
}

export function invertClockMovement(movement) {
    if (movement.str.indexOf("'") >= 0) {
        return movementFromString(movement.str.replace("'", ""));
    } else {
        return movementFromString(`${movement.str}'`);
    }
}

export function movementsToNotation(movements) {
    return movements.map(_ => _.str).join(' ');
}

export function cubeToPattern(cube) {
    let size = cube.length;
    let pattern = [];

    let sides = Object.values(SIDES).filter(_ => _ != SIDES.CENTER);
    let layers = [...Array(size).keys()]

    let colors = inverseKeyValue(patternColors);

    for (let side of sides) {
        cube = rotateCubeFromTo(cube, side, SIDES.FRONT);
        for (let y of layers) {
            for (let x of layers) {
                pattern.push(colors[cube[0][y][x][SIDES.FRONT]])
            }
        }
        cube = rotateCubeFromTo(cube, SIDES.FRONT, side);
    }

    return pattern.join("");
}