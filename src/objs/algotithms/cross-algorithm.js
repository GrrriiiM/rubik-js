import { SIDES } from "../constants.js";

let ret = {
    edge: [SIDES.DOWN, SIDES.FRONT],
    cases: {}
};

ret.cases.case1 = {
    positions: [1],
    corner: [SIDES.UP, SIDES.FRONT],
    moves: "F F"
};

ret.cases.case1A = {
    positions: [11],
    corner: [SIDES.UP, SIDES.RIGHT],
    moves: `U ${ret.cases.case1.moves}`
}

ret.cases.case1B = {
    positions: [19],
    corner: [SIDES.UP, SIDES.BACK],
    moves: `U U ${ret.cases.case1.moves}`
}

ret.cases.case1C = {
    positions: [9],
    corner: [SIDES.UP, SIDES.LEFT],
    moves: `U' ${ret.cases.case1.moves}`
}

ret.cases.case2 = {
    positions: [1],
    corner: [SIDES.FRONT, SIDES.UP],
    moves: `U' R' F R`
};

ret.cases.case2A = {
    positions: [11],
    corner: [SIDES.RIGHT, SIDES.UP],
    moves: `U ${ret.cases.case2.moves}`
};

ret.cases.case2B = {
    positions: [19],
    corner: [SIDES.BACK, SIDES.UP],
    moves: `U U ${ret.cases.case2.moves}`
};

ret.cases.case2C = {
    positions: [9],
    corner: [SIDES.LEFT, SIDES.UP],
    moves: `U' ${ret.cases.case2.moves}`
};

ret.cases.case3 = {
    positions: [5],
    corner: [SIDES.RIGHT, SIDES.FRONT],
    moves: `F`
};

ret.cases.case3A = {
    positions: [23],
    corner: [SIDES.BACK, SIDES.RIGHT],
    moves: `R' ${ret.cases.case1A.moves}`
};

ret.cases.case3B = {
    positions: [21],
    corner: [SIDES.LEFT, SIDES.BACK],
    moves: `B' ${ret.cases.case1B.moves}`
};

ret.cases.case3C = {
    positions: [3],
    corner: [SIDES.FRONT, SIDES.LEFT],
    moves: `L' ${ret.cases.case1C.moves}`
};

ret.cases.case4 = {
    positions: [5],
    corner: [SIDES.FRONT, SIDES.RIGHT],
    moves: `F' ${ret.cases.case2.moves}`
};

ret.cases.case4A = {
    positions: [23],
    corner: [SIDES.RIGHT, SIDES.BACK],
    moves: `R' ${ret.cases.case2A.moves}`
};

ret.cases.case4B = {
    positions: [21],
    corner: [SIDES.BACK, SIDES.LEFT],
    moves: `B' ${ret.cases.case2B.moves}`
};

ret.cases.case4C = {
    positions: [3],
    corner: [SIDES.LEFT, SIDES.FRONT],
    moves: `L' ${ret.cases.case2C.moves}`
};

ret.cases.case5 = {
    positions: [7],
    corner: [SIDES.DOWN],
    moves: ""
}

ret.cases.case5A = {
    positions: [17],
    corner: [SIDES.DOWN, SIDES.RIGHT],
    moves: `R R ${ret.cases.case1A.moves}`
}

ret.cases.case5B = {
    positions: [25],
    corner: [SIDES.DOWN, SIDES.BACK],
    moves: `B B ${ret.cases.case1B.moves}`
}

ret.cases.case5C = {
    positions: [15],
    corner: [SIDES.DOWN, SIDES.LEFT],
    moves: `L L ${ret.cases.case1C.moves}`
}


ret.cases.case6 = {
    positions: [7],
    corner: [SIDES.FRONT, SIDES.DOWN],
    moves: `F F ${ret.cases.case2.moves}`
}

ret.cases.case6A = {
    positions: [17],
    corner: [SIDES.RIGHT, SIDES.DOWN],
    moves: `R R ${ret.cases.case2A.moves}`
}

ret.cases.case6B = {
    positions: [25],
    corner: [SIDES.BACK, SIDES.DOWN],
    moves: `B B ${ret.cases.case2B.moves}`
}

ret.cases.case6C = {
    positions: [15],
    corner: [SIDES.LEFT, SIDES.DOWN],
    moves: `L L ${ret.cases.case2C.moves}`
}

export const crossAlgorithm = ret;