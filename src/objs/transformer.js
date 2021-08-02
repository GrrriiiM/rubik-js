import { COLORS, SIDES } from "./constants";


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