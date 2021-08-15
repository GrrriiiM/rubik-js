import { SIDES } from "../constants.js";


let ret = {
    name: "Básico PLL Corner",
    side: SIDES.UP,
    positions: [0, 2, 10, 18, 20],
    sample: "OBOOOOOOOYYYYYYYYYGBGGGGGGGRBRRRRRRRWWWWWWWWWUBUUUUUUU",
    cases: {}
}

// BBBOOOOOO YYYYYYYYY BBBGGGGGG BBBRRRRRR WWWWWWWWW BBBUUUUUU

ret.cases.solved = {
    solved: true,
    positions: [0, 2, 10, 18, 20],
    sample: "OBOOOOOOOYYYYYYYYYGBGGGGGGGRBRRRRRRRWWWWWWWWWUBUUUUUUU",
    moves: ""
}

ret.cases.Diagonal = {
    positions: [0, 18, 10, 2, 20],
    sample: "OBROOOOOOYYYYYYYYYUBGGGGGGGRBORRRRRRWWWWWWWWWGBUUUUUUU",
    moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
}

ret.cases.Headlights = {
    positions: [0, 20, 10, 18, 2],
    sample: "OBUOOOOOOYYYYYYYYYGBGGGGGGGUBRRRRRRRWWWWWWWWWRBOUUUUUU",
    moves: "R U R' U' R' F R2 U' R' U' R U R' F'"
}


Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const basicPllCornerAlgorithm = ret;