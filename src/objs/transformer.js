import { AXIS, COLORS, SIDES } from "./constants.js";
import { MOVEMENTS } from "./movements.js";


/**
 * 
 * @param {number[][][][]} cube 
 * @returns {number[][]}
 */
export function cubeToFlat(cube) {
    return cube.flat(2);
}

export function cubeFromFlat(flat, size) {
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
    if (str.toUpperCase() == "F") return MOVEMENTS.F;
    if (str.toUpperCase() == "B") return MOVEMENTS.B;
    if (str.toUpperCase() == "L") return MOVEMENTS.L;
    if (str.toUpperCase() == "R") return MOVEMENTS.R;
    if (str.toUpperCase() == "U") return MOVEMENTS.U;
    if (str.toUpperCase() == "D") return MOVEMENTS.D;
    if (str.toUpperCase() == "F'") return MOVEMENTS.F_;
    if (str.toUpperCase() == "B'") return MOVEMENTS.B_;
    if (str.toUpperCase() == "L'") return MOVEMENTS.L_;
    if (str.toUpperCase() == "R'") return MOVEMENTS.R_;
    if (str.toUpperCase() == "U'") return MOVEMENTS.U_;
    if (str.toUpperCase() == "D'") return MOVEMENTS.D_;
    if (str.toUpperCase() == "X") return MOVEMENTS.X;
    if (str.toUpperCase() == "Y") return MOVEMENTS.Y;
    if (str.toUpperCase() == "Z") return MOVEMENTS.Z;
    if (str.toUpperCase() == "X'") return MOVEMENTS.X_;
    if (str.toUpperCase() == "Y'") return MOVEMENTS.Y_;
    if (str.toUpperCase() == "Z'") return MOVEMENTS.Z_;
}

export function axisToString(axis) {
    if (AXIS.Z == axis) return 'z';
    if (AXIS.Y == axis) return 'y';
    if (AXIS.X == axis) return 'x';
}