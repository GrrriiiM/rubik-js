import { SIDES } from "./constants.js";

const case1 = {
    positions: [1],
    sides: [SIDES.UP, SIDES.FRONT],
    moves: ["F", "F"]
};

const case1A = {
    positions: [11],
    sides: [SIDES.UP, SIDES.RIGHT],
    moves: ["U", ...case1.moves]
}

const case1B = {
    positions: [19],
    sides: [SIDES.UP, SIDES.BACK],
    moves: ["U", "U", ...case1.moves]
}

const case1C = {
    positions: [9],
    sides: [SIDES.UP, SIDES.LEFT],
    moves: ["U'", ...case1.moves]
}

const case2 = {
    positions: [1],
    sides: [SIDES.FRONT, SIDES.UP],
    moves: ["U'", "R'", "F", "R"]
};

const case2A = {
    positions: [11],
    sides: [SIDES.RIGHT, SIDES.UP],
    moves: ["U", ...case2.moves]
};

const case2B = {
    positions: [19],
    sides: [SIDES.BACK, SIDES.UP],
    moves: ["U", "U", ...case2.moves]
};

const case2C = {
    positions: [9],
    sides: [SIDES.LEFT, SIDES.UP],
    moves: ["U'", ...case2.moves]
};

const case3 = {
    positions: [5],
    sides: [SIDES.RIGHT, SIDES.FRONT],
    moves: ["F"]
};

const case3A = {
    positions: [23],
    sides: [SIDES.BACK, SIDES.RIGHT],
    moves: ["R'", ...case1A.moves]
};

const case3B = {
    positions: [21],
    sides: [SIDES.LEFT, SIDES.BACK],
    moves: ["B'", ...case1B.moves]
};

const case3C = {
    positions: [3],
    sides: [SIDES.FRONT, SIDES.LEFT],
    moves: ["L'", ...case1C.moves]
};

const case4 = {
    positions: [5],
    sides: [SIDES.FRONT, SIDES.RIGHT],
    moves: ["F'", ...case2.moves]
};

const case4A = {
    positions: [23],
    sides: [SIDES.RIGHT, SIDES.BACK],
    moves: ["R'", ...case2A.moves]
};

const case4B = {
    positions: [21],
    sides: [SIDES.BACK, SIDES.LEFT],
    moves: ["B'", ...case2B.moves]
};

const case4C = {
    positions: [3],
    sides: [SIDES.LEFT, SIDES.FRONT],
    moves: ["L'", ...case2C.moves]
};

const case5 = {
    positions: [7],
    sides: [SIDES.DOWN],
    moves: []
}

const case5A = {
    positions: [17],
    sides: [SIDES.DOWN, SIDES.RIGHT],
    moves: ["R", "R", ...case1A.moves]
}

const case5B = {
    positions: [25],
    sides: [SIDES.DOWN, SIDES.BACK],
    moves: ["B", "B", ...case1B.moves]
}

const case5C = {
    positions: [15],
    sides: [SIDES.DOWN, SIDES.LEFT],
    moves: ["L", "L", ...case1C.moves]
}


const case6 = {
    positions: [7],
    sides: [SIDES.FRONT, SIDES.DOWN],
    moves: [ "F", "F", ...case2.moves]
}

const case6A = {
    positions: [17],
    sides: [SIDES.RIGHT, SIDES.DOWN],
    moves: ["R", "R", ...case2A.moves]
}

const case6B = {
    positions: [25],
    sides: [SIDES.BACK, SIDES.DOWN],
    moves: ["B", "B", ...case2B.moves]
}

const case6C = {
    positions: [15],
    sides: [SIDES.LEFT, SIDES.DOWN],
    moves: ["L", "L", ...case2C.moves]
}


export const crossAlgorithm = {
    sides: [SIDES.DOWN, SIDES.FRONT],
    cases: {
        case1,
        case1A,
        case1B,
        case1C,
        case2,
        case2A,
        case2B,
        case2C,
        case3,
        case3A,
        case3B,
        case3C,
        case4,
        case4A,
        case4B,
        case4C,
        case5,
        case5A,
        case5B,
        case5C,
        case6,
        case6A,
        case6B,
        case6C
    }
};