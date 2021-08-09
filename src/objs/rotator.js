import { coordsToLayers, coordToLayer, cubeFromFlat, cubeToFlat } from "./transformer.js";
import { AXIS, CLOCK, SIDES } from "./constants.js";
import { MOVEMENTS_STR } from "./movements.js";


export function rotateSide(axis, side, clock = CLOCK.NORMAL) {
    let sides = [];
    if (axis == AXIS.Z) sides = [SIDES.UP, SIDES.RIGHT, SIDES.DOWN, SIDES.LEFT];
    if (axis == AXIS.Y) sides = [SIDES.BACK, SIDES.RIGHT, SIDES.FRONT, SIDES.LEFT];
    if (axis == AXIS.X) sides = [SIDES.UP, SIDES.FRONT, SIDES.DOWN, SIDES.BACK];
    return sides.indexOf(side) >= 0 ? sides[(sides.indexOf(side) + (clock ? 1 : sides.length - 1)) % sides.length] : side;
}

export function rotateBlock(axis, colors, clock = CLOCK.NORMAL) {
    let sides = [...Object.values(SIDES).values()]
    return sides.map(s => colors[rotateSide(axis, s, !clock)]);
}

export function rotateXYZ(axis, clock, x, y, z) {
    if (axis == AXIS.Z) return clock ? [y, -x, z] : [-y, x, z];
    if (axis == AXIS.Y) return clock ? [-z, y, x] : [z, y, -x];
    if (axis == AXIS.X) return clock ? [x, z, -y] : [x, -z, y];
}

export function rotatePosition(axis, size, layer = 0, clock = CLOCK.NORMAL) {
    let offset = (size - 1) / 2;
    let layers = [...Array(size).keys()];
    layer = coordToLayer(layer, size);
    let zs = axis == AXIS.Z ? [layer] : layers;
    let ys = axis == AXIS.Y ? [layer] : layers;
    let xs = axis == AXIS.X ? [layer] : layers;
    let i = 0;
    let cube = layers.map(() => layers.map(() => layers.map(() => i++)));
    let newCube = cube.map(z => z.map(y => y.map(x => x)));
    for (let z of zs) {
        for (let y of ys) {
            for (let x of xs) {
                let r = rotateXYZ(axis, clock, x - offset, y - offset, z - offset);
                newCube[z][y][x] = cube[r[2] + offset][r[1] + offset][r[0] + offset];
            }
        }
    }
    return newCube;
}

export function rotateCube(axis, cube, layers = [], clock = CLOCK.NORMAL) {
    let size = cube.length;
    layers = coordsToLayers(layers, size);
    
    for(let layer of layers) {
        let cubeFlat = cubeToFlat(cube);
        let newcubeFlat = cubeFlat.map(_ => _.map(c => c));
        let positionFlat = cubeToFlat(rotatePosition(axis, size, layer, clock));
        for (let i of [...Array(positionFlat.length).keys()]) {
            if (positionFlat[i] != i) {
                newcubeFlat[i] = rotateBlock(axis, cubeFlat[positionFlat[i]], clock);
            } else {
                newcubeFlat[i] = cubeFlat[positionFlat[i]];
            }
        }
        cube = cubeFromFlat(newcubeFlat, size);
    }
    return cube;
}

export function rotateCubeWithMovement(cube, movement) {
    let size = cube.length;
    let layers = coordsToLayers(movement.layers, size);
    cube = rotateCube(movement.axis, cube, layers, movement.clock);
    return cube;
}


export function shuffleCube(cube) {
    let str = Object.keys(MOVEMENTS_STR);
    for(let r of [...Array(200).keys()]) {
        cube = rotateCubeWithMovement(cube, MOVEMENTS_STR[str[parseInt(Math.random() * str.length)]]);
    }
    return cube;
}



