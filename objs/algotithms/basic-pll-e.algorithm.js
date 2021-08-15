import { SIDES } from "../constants.js";

let ret = {
    name: "Básico PLL Edge",
    side: SIDES.UP,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    sample: "OOOOOOOOOYYYYYYYYYGGGGGGGGGRRRRRRRRRWWWWWWWWWUUUUUUUUU",
    cases: {}
}


ret.cases.solved = {
    solved: true,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    sample: "OOOOOOOOOYYYYYYYYYGGGGGGGGGRRRRRRRRRWWWWWWWWWUUUUUUUUU",
    moves: ""
}

ret.cases.U = {
    positions: [0, 9, 2, 11, 10, 1, 18, 19, 20],
    sample: "OGOOOOOOOYYYYYYYYYGUGGGGGGGRRRRRRRRRWWWWWWWWWUOUUUUUUU",
    moves: "R2 U R U R' U' R' U' R' U R'"
}

ret.cases.AntiU = {
    positions: [0, 11, 2, 1, 10, 9, 18, 19, 20],
    sample: "OUOOOOOOOYYYYYYYYYGOGGGGGGGRRRRRRRRRWWWWWWWWWUGUUUUUUU",
    moves: "R U' R U R U R U' R' U' R2"
}

ret.cases.H = {
    positions: [0, 19, 2, 11, 10, 9, 18, 1, 20],
    sample: "OROOOOOOOYYYYYYYYYGUGGGGGGGRORRRRRRRWWWWWWWWWUGUUUUUUU",
    moves: "M2 U M2 U2 M2 U M2"
}


ret.cases.Z = {
    positions: [0, 11, 2, 19, 10, 1, 18, 9, 20],
    sample: "OUOOOOOOOYYYYYYYYYGRGGGGGGGRGRRRRRRRWWWWWWWWWUOUUUUUUU",
    moves: "M2 U M2 U M' U2 M2 U2 M' U2"
}


Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const basicPllEdgeAlgorithm = ret;