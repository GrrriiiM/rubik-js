import { COLORS, SIDES } from "./constants.js";
import { rotateCubeFromTo } from "./rotator.js";
import { colorFromSide, cubeFromFlat, inverseKeyValue, sideFromCube } from "./transformer.js";

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

export const CUBE_DEFAULT_PATTERN = "OOOOOOOOOYYYYYYYYYGGGGGGGGGRRRRRRRRRWWWWWWWWWUUUUUUUUU"; 

export function createCube(size=3) {
    return createCubeWithPattern(CUBE_DEFAULT_PATTERN, size);
}

export function createCubeEmpty(size) {
    return cubeFromFlat([...Array(size * size * size).keys()].map(_ => Object.keys(SIDES).map(s => COLORS.BLACK)));
}

export const patternColors = {
    "B": COLORS.BLACK,
    "O": COLORS.ORANGE,
    "Y": COLORS.YELLOW,
    "G": COLORS.GREEN,
    "R": COLORS.RED,
    "W": COLORS.WHITE,
    "U": COLORS.BLUE
}

export function createCubeWithPattern(pattern, size = 3) {
    
    let cube = createCubeEmpty(size);

    let sides = Object.values(SIDES).filter(_ => _ != SIDES.CENTER);
    let layers = [...Array(size).keys()]

    let colors = pattern.split('').map((_) => patternColors[_]);

    for(let side of sides) {
        let sideColors = colors.splice(0, size * size);
        cube = rotateCubeFromTo(cube, side, SIDES.FRONT);
        let i = 0;
        for(let y of layers) {
            for(let x of layers) {
                cube[0][y][x][SIDES.FRONT] = sideColors[i];
                i+=1;
            }
        }
        cube = rotateCubeFromTo(cube, SIDES.FRONT, side);
    }
    
    return cube;
}

export function createCubeWithColors(colors, size = 3) {
    let pattern = [];
    let colorPatternsValue = inverseKeyValue(patternColors)
    for(let color of colors) {
        pattern.push(colorPatternsValue[color].repeat(size * size));
    }
    return createCubeWithPattern(pattern.join(""), size);
}