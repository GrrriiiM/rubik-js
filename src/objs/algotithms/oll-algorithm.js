import { SIDES } from "../constants.js";

let ret = {
    side: SIDES.UP,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    cases: {

    }
}

ret.cases.cross01 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R U B' X R U X2 R2 X U' R' F R F'"
}

ret.cases.cross02 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R' F R F' U2 R' F R Y' R2 U2 R"
}

ret.cases.cross03 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "Y L' R2 B R' B L U2 L' B M' X"
}

ret.cases.cross04 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.UP
    ],
    moves: "R' U2 X' R' U R U' Y R' U' R' U R' F Z'"
}

ret.cases.cross05 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.BACK
    ],
    moves: "R U R' U R' F R F' U2 R' F R F'"
}

ret.cases.cross06 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "M' U2 M U2 M' U M U2 M' U2 M"
}

ret.cases.cross07 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "R' U2 F R U R' U' Y' R2 U2 X R U"
}

ret.cases.cross08 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.BACK, SIDES.BACK
    ],
    moves: "F R U R' U Y' R' U2 R' F R F'"
}

export const ollAlgorithm = ret;