import { SIDES } from "../constants.js";

let ret = {
    name: "Básico F2L Corner",
    corner: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT],
    edge: [],
    sample: "BBBBOBOOOBBBBYBBBBBBBBGBGGGBBBBRBRRRWWWWWWWWWBBBBUBUUU",
    cases: {

    }
};

//sample: "BBBBOBOOB BBBBYBBBB BBBBGBGGG BBBBRBRRR WWBWWWWWW BBBBUBBUU",

ret.cases.R = {
    sample: "BBOBOBOOBBBBBYBBBUBBBBGBGGGBBBBRBRRRWWBWWWWWWWBBBUBBUU",
    edge: {
        position: -1,
        sides: []
    },
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    moves: "R U R'"
};


ret.cases.F = {
    sample: "BBWBOBOOBBBBBYBBBOBBBBGBGGGBBBBRBRRRWWBWWWWWWUBBBUBBUU",
    edge: {
        position: -1,
        sides: []
    },
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    moves: "F' U' F"
};

ret.cases.U = {
    sample: "BBUBOBOOBBBBBYBBBWBBBBGBGGGBBBBRBRRRWWBWWWWWWOBBBUBBUU",
    edge: {
        position: -1,
        sides: []
    },
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    moves: "R U' R' F' U2 F"
};

ret.fix = {
    sample: "BBBBOBOOUBBBBYBBBBBBBBGBGGGBBBBRBRRRWWOWWWWWWBBBBUBWUU",
    moves: "R U' R'"
};

Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const basicF2LCornerAlgorithm = ret;