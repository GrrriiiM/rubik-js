import { SIDES } from "../constants.js";


let ret = {
    name: "Básico OLL Corner",
    sample: "BBBOOOOOOYYYYYYYYYBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBUUUUUU",
    side: SIDES.UP,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    cases: {
    }
};


ret.cases.Pi = {
    sample: "YBBOOOOOOBYBYYYBYBBBBGGGGGGBBYRRRRRRWWWWWWWWWYBYUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "L U' R' U L' U R U R' U R"
}

ret.cases.H = {
    sample: "BBBOOOOOOBYBYYYBYBYBYGGGGGGBBBRRRRRRWWWWWWWWWYBYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R U R' U R U' R' U R U2 R'"
}

ret.cases.AntiSune = {
    sample: "YBBOOOOOOBYBYYYBYYYBBGGGGGGYBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "L' U R U' L U R'"
}

ret.cases.Sune = {
    sample: "BBBOOOOOOBYBYYYBYYBBYGGGGGGBBYRRRRRRWWWWWWWWWBBYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R' U2 R U R' U R"
}

ret.cases.T = {
    sample: "BBYOOOOOOYYBYYYYYBBBBGGGGGGYBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.UP, SIDES.UP, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F' L F R F' L' F"
}

ret.cases.U = {
    sample: "YBYOOOOOOYYYYYYBYBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP
    ],
    moves: "R2 D R' U2 R D' R' U2 R'"
}

ret.cases.L = {
    sample: "BBBOOOOOOYYBYYYBYYBBYGGGGGGYBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F' L' F R F' L F"
}



Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const basicOLLCornerAlgorithm = ret;