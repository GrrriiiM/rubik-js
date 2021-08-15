import { SIDES } from "../constants.js";

let ret = {
    name: "Básico F2L Edge",
    edge: [SIDES.FRONT, SIDES.RIGHT],
    corner: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT],
    sample: "BBBOOOOOOBBBBYBBBBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBUUUUUU",
    cases: {

    }
};

ret.cases.R = {
    sample: "BBBOOBOOOBBBBYOBBBBBBGGGGGGBBBRRRRRRWWWWWWWWWBUBBUUUUU",
    edge: {
        position: 11,
        sides: [SIDES.UP, SIDES.RIGHT],
    },
    corner: {
        position: 8,
        sides: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT],
    },
    moves: "U' F' U F U R U' R'"
};

ret.cases.U = {
    sample: "BOBOOBOOOBBBBYBBUBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBBUUUUU",
    edge: {
        position: 1,
        sides: [SIDES.FRONT, SIDES.UP],
    },
    corner: {
        position: 8,
        sides: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT],
    },
    moves: "U R U' R' U' F' U F"
};

ret.fix = {
    sample: "BBBOOUOOOBBBBYBBBBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBOUUUUU",
    moves: "R U' R' U' F' U F"
};


Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const basicF2LEdgeAlgorithm = ret;