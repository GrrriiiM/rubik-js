import { COLORS, SIDES } from "./constants";
import { colorFromSide, sideFromCube } from "./transformer";

export function createBlock({
    front = COLORS.BLACK,
    up = COLORS.BLACK,
    left = COLORS.BLACK,
    back = COLORS.BLACK,
    down = COLORS.BLACK,
    right = COLORS.BLACK
} = {}) {
    var block = Object.keys(SIDES).map(() => COLORS.BLACK);
    block[SIDES.FRONT] = front;
    block[SIDES.UP] = up;
    block[SIDES.LEFT] = left;
    block[SIDES.BACK] = back;
    block[SIDES.DOWN] = down;
    block[SIDES.RIGHT] = right;
    return block;
}

export function createCube({size=3}={}) {
    let layers = [...Array(size).keys()];
    let zs = [];
    for(let z in layers) {
        let ys = [];
        for(let y in layers) {
            let xs = []
            for(let x in layers) {
                xs.push(createBlock({
                    front: colorFromSide(sideFromCube(SIDES.FRONT, {layer: z, size: size})),
                    up: colorFromSide(sideFromCube(SIDES.UP, {layer: y, size: size})),
                    left: colorFromSide(sideFromCube(SIDES.LEFT, {layer: x, size: size})),
                    back: colorFromSide(sideFromCube(SIDES.BACK, {layer: z, size: size})),
                    down: colorFromSide(sideFromCube(SIDES.DOWN, {layer: y, size: size})),
                    right: colorFromSide(sideFromCube(SIDES.RIGHT, {layer: x, size: size}))
                }));
            }
            ys.push(xs);
        }
        zs.push(ys);
    }
    return zs;
}