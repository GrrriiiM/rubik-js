import { SIDES } from "../constants.js";


let ret = {
    name: "Básico OLL Edge",
    sample: "BBBOOOOOOBYBYYYBYBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBUUUUUU",
    side: SIDES.UP,
    positions: [1, 9, 10, 11, 19],
    cases: {
    }
};

//sample: "BBBOOOOOO BBBBYBBBB BBBGGGGGG BBBRRRRRR WWWWWWWWW BBBUUUUUU",

ret.cases.Dot = {
    sample: "BYBOOOOOOBBBBYBBBBBYBGGGGGGBYBRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [ SIDES.FRONT, SIDES.LEFT, SIDES.UP, SIDES.RIGHT, SIDES.BACK],
    moves: "F R U R' U' F' Z B R U R' U' Z' B'"
}

ret.cases.I = {
    sample: "BYBOOOOOOBBBYYYBBBBBBGGGGGGBYBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [ SIDES.FRONT, SIDES.UP, SIDES.UP, SIDES.UP, SIDES.BACK],
    moves: "F R U R' U' F'"
}

ret.cases.L = {
    sample: "BBBOOOOOOBBBBYYBYBBYBGGGGGGBYBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [ SIDES.UP, SIDES.LEFT, SIDES.UP, SIDES.UP, SIDES.BACK],
    moves: "Z B R U R' U' Z' B'"
}

Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const basicOLLEdgeAlgorithm = ret;