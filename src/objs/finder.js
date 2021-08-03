import { AXIS, COLORS, SIDES } from "./constants.js";
import { cubeToFlat } from "./transformer.js";


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
    colors = [...colors, ...Object.keys(SIDES).map(()=>COLORS.BLACK).slice(colors.length)].sort();
    let flat = cubeToFlat(cube);
    for(let i of [...Array(flat.length).keys()]) {
        let block = flat[i].sort();
        if (block.every((b,ib) => b == colors[ib])) return i;
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