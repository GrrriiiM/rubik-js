import { SIDES } from "../constants.js";

let ret = {
    edge: [SIDES.DOWN, SIDES.FRONT],
    sample: "BBBBOBBOBBBBBBBBBBBBBBGBBGBBBBBRBBRBBWBWWWBWBBBBBUBBUB",
    cases: {}
};

//sample: "BBBBOBBBB BBBBBBBBB BBBBGBBGB BBBBRBBRB BBBWWWBWB BBBBUBBUB",

ret.cases.A01 = {
    sample: "BOBBOBBBBBBBBBBBWBBBBBGBBGBBBBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [1],
    corner: [SIDES.UP, SIDES.FRONT],
    moves: "F2"
};

ret.cases.A02 = {
    sample: "BBBBOBBBBBBBBBWBBBBBBBGBBGBBBBBRBBRBBBBWWWBWBBOBBUBBUB",
    positions: [11],
    corner: [SIDES.UP, SIDES.RIGHT],
    moves: `U F2`
}

ret.cases.A03 = {
    sample: "BBBBOBBBBBWBBBBBBBBBBBGBBGBBOBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [19],
    corner: [SIDES.UP, SIDES.BACK],
    moves: `U2 F2`
}

ret.cases.A04 = {
    sample: "BBBBOBBBBBBBWBBBBBBOBBGBBGBBBBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [9],
    corner: [SIDES.UP, SIDES.LEFT],
    moves: `U' F2`
}

ret.cases.B01 = {
    sample: "BWBBOBBBBBBBBBBBOBBBBBGBBGBBBBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [1],
    corner: [SIDES.FRONT, SIDES.UP],
    moves: `U' R' F R`
};

ret.cases.B02 = {
    sample: "BBBBOBBBBBBBBBOBBBBBBBGBBGBBBBBRBBRBBBBWWWBWBBWBBUBBUB",
    positions: [11],
    corner: [SIDES.RIGHT, SIDES.UP],
    moves: `R' F R`
};

ret.cases.B03 = {
    sample: "BBBBOBBBBBOBBBBBBBBBBBGBBGBBWBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [19],
    corner: [SIDES.BACK, SIDES.UP],
    moves: `U R' F R`
};

ret.cases.B04 = {
    sample: "BBBBOBBBBBBBOBBBBBBWBBGBBGBBBBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [9],
    corner: [SIDES.LEFT, SIDES.UP],
    moves: `L F' L'`
};

ret.cases.C01 = {
    sample: "BBBBOOBBBBBBBBBBBBBBBBGBBGBBBBBRBBRBBBBWWWBWBBBBWUBBUB",
    positions: [5],
    corner: [SIDES.RIGHT, SIDES.FRONT],
    moves: `F`
};

ret.cases.C02 = {
    sample: "BBBBOBBBBBBBBBBBBBBBBBGBBGBBBBWRBBRBBBBWWWBWBBBBBUOBUB",
    positions: [23],
    corner: [SIDES.BACK, SIDES.RIGHT],
    moves: `D R D'`
};

ret.cases.C03 = {
    sample: "BBBBOBBBBBBBBBBBBBBBBWGBBGBBBBBROBRBBBBWWWBWBBBBBUBBUB",
    positions: [21],
    corner: [SIDES.LEFT, SIDES.BACK],
    moves: "D2 B D2"
};

ret.cases.C04 = {
    sample: "BBBWOBBBBBBBBBBBBBBBBBGOBGBBBBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [3],
    corner: [SIDES.FRONT, SIDES.LEFT],
    moves: "D' L D"
};


ret.cases.D01 = {
    sample: "BBBBOWBBBBBBBBBBBBBBBBGBBGBBBBBRBBRBBBBWWWBWBBBBOUBBUB",
    positions: [5],
    corner: [SIDES.FRONT, SIDES.RIGHT],
    moves: "D R' D'"
};

ret.cases.D02 = {
    sample: "BBBBOBBBBBBBBBBBBBBBBBGBBGBBBBORBBRBBBBWWWBWBBBBBUWBUB",
    positions: [23],
    corner: [SIDES.RIGHT, SIDES.BACK],
    moves: "D2 B' D2"
};

ret.cases.D03 = {
    sample: "BBBBOBBBBBBBBBBBBBBBBOGBBGBBBBBRWBRBBBBWWWBWBBBBBUBBUB",
    positions: [21],
    corner: [SIDES.BACK, SIDES.LEFT],
    moves: "D' L' D"
};

ret.cases.D04 = {
    sample: "BBBOOBBBBBBBBBBBBBBBBBGWBGBBBBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [3],
    corner: [SIDES.LEFT, SIDES.FRONT],
    moves: "F'"
};

ret.cases.E01 = {
    sample: "BBBBOBBWBBBBBBBBBBBBBBGBBGBBBBBRBBRBBOBWWWBWBBBBBUBBUB",
    positions: [7],
    corner: [SIDES.FRONT, SIDES.DOWN],
    moves: "F' D R' D'"
};

ret.cases.E02 = {
    sample: "BBBBOBBBBBBBBBBBBBBBBBGBBGBBBBWRBBRBBBBWWOBWBBBBBUUBWB",
    positions: [17],
    corner: [SIDES.RIGHT, SIDES.DOWN],
    moves: "R F"
};

ret.cases.E03 = {
    sample: "BBBBOBBBBBBBBBBBBBBBBWGBBGBBBBBRRBWBBBBWWWBOBBBBBUBBUB",
    positions: [25],
    corner: [SIDES.BACK, SIDES.DOWN],
    moves: "B D R D'"
};

ret.cases.E04 = {
    sample: "BBBBOBBBBBBBBBBBBBBBBGGBBWBBBBBRWBRBBBBOWWBWBBBBBUBBUB",
    positions: [15],
    corner: [SIDES.LEFT, SIDES.DOWN],
    moves: "L' F'"
};


// ret.cases.F01 = {
//     sample: "BBBBOBBBB BBBBBBBBB BBBBGBBGB BBBBRBBRB BBBWWWBWB BBBBUBBUB",
//     positions: [7],
//     corner: [SIDES.FRONT, SIDES.DOWN],
//     moves: "F' D R' D'"
// };

ret.cases.F02 = {
    sample: "BBBBOBBBBBBBBBWBBBBBBBGBBGBBBBBRBBRBBBBWWWBWBBUBBUBBOB",
    positions: [17],
    corner: [SIDES.DOWN, SIDES.RIGHT],
    moves: "R2 U F2"
};

ret.cases.F03 = {
    sample: "BBBBOBBBBBWBBBBBBBBBBBGBBGBBRBBRBBOBBBBWWWBWBBBBBUBBUB",
    positions: [25],
    corner: [SIDES.DOWN, SIDES.BACK],
    moves: "B2 U2 F2"
};

ret.cases.F04 = {
    sample: "BBBBOBBBBBBBWBBBBBBGBBGBBOBBBBBRBBRBBBBWWWBWBBBBBUBBUB",
    positions: [15],
    corner: [SIDES.DOWN, SIDES.LEFT],
    moves: "L2 U' F2"
};



Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const crossAlgorithm = ret;