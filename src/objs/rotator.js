import { coordsToLayers, coordToLayer, cubeFromFlat, cubeToFlat, invertClockMovement, movementFromString } from "./transformer.js";
import { AXIS, CLOCK, SIDES } from "./constants.js";
import { MOVEMENTS, MOVEMENTS_STR } from "./movements.js";

let sidesAxisZ = [SIDES.UP, SIDES.RIGHT, SIDES.DOWN, SIDES.LEFT];
let sidesAxisY = [SIDES.BACK, SIDES.RIGHT, SIDES.FRONT, SIDES.LEFT];
let sidesAxisX = [SIDES.UP, SIDES.FRONT, SIDES.DOWN, SIDES.BACK];
let movementsAxisZ = ["U", "R", "D", "L"];
let movementsAxisY = ["B", "R", "F", "L"];
let movementsAxisX = ["U", "F", "D", "B"];

export function rotateSide(axis, side, clock = CLOCK.NORMAL) {
    let sides = [];
    if (axis == AXIS.Z) sides = sidesAxisZ;
    if (axis == AXIS.Y) sides = sidesAxisY;
    if (axis == AXIS.X) sides = sidesAxisX;
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

    for (let layer of layers) {
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

export function rotateCubeWithMovement(cube, movement, history = null) {
    let size = cube.length;
    let layers = coordsToLayers(movement.layers, size);
    cube = rotateCube(movement.axis, cube, layers, movement.clock);
    history && history.push(movement.str);
    return cube;
}


export function shuffleCube(cube, history = null) {
    let str = Object.keys(MOVEMENTS_STR);
    for (let r of [...Array(200).keys()]) {
        cube = rotateCubeWithMovement(cube, MOVEMENTS_STR[str[parseInt(Math.random() * str.length)]], history);
    }
    return cube;
}


export function rotateCubeFromTo(cube, fromSide, toSide, history = null) {
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
        move = MOVEMENTS.X;
        moveAnti = MOVEMENTS.X_;
    }
    if (direction) {
        if (Math.abs(direction) == 2) {
            cube = rotateCubeWithMovement(cube, move, history);
            cube = rotateCubeWithMovement(cube, move, history);
        } else if (direction > 0) {
            cube = rotateCubeWithMovement(cube, move, history);
        } else if (direction < 0) {
            cube = rotateCubeWithMovement(cube, moveAnti, history);
        }
    }
    return cube;
}

export function rotateMovementsFromTo(movements, fromSide, toSide) {
    let movementsRotated = [];
    let sidesAxis;
    let movementsAxis;
    
    if (sidesAxisZ.includes(fromSide) && sidesAxisZ.includes(toSide)) {
        sidesAxis = sidesAxisZ;
        movementsAxis = movementsAxisZ;
    } else if (sidesAxisY.includes(fromSide) && sidesAxisY.includes(toSide)) {
        sidesAxis = sidesAxisY;
        movementsAxis = movementsAxisY;
    } else if (sidesAxisX.includes(fromSide) && sidesAxisX.includes(toSide)) {
        sidesAxis = sidesAxisX;
        movementsAxis = movementsAxisX;
    }
    let direction = sidesAxis.indexOf(toSide) - sidesAxis.indexOf(fromSide);
    direction = Math.abs(direction) == 2 ? 2 : direction;
    for(let movement of movements) {
        let movementAxisIndex = movementsAxis.indexOf(movement.str.replace("'", ""));
        if (movementAxisIndex >=0) {
            let movementRotated = movementFromString(movementsAxis[(movementAxisIndex + direction + 4) % 4]);
            if (movement.str.includes("'") != movementRotated.str.includes("'")) movementRotated = invertClockMovement(movementRotated);
            movementsRotated.push(movementRotated);
        } else {
            movementsRotated.push(movement);
        }
    }
    return movementsRotated;
}


