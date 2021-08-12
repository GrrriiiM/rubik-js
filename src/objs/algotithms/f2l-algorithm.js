import { SIDES } from "../constants.js";

let ret = {
    edge: [SIDES.FRONT, SIDES.RIGHT],
    corner: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT],
    fixes: [
        { side: SIDES.FRONT, moves: "R U R'"},
        { side: SIDES.RIGHT, moves: "B U B'"},
        { side: SIDES.BACK, moves: "L U L'"},
        { side: SIDES.LEFT, moves: "F U F'"}
    ],
    cases: {

    }
};


ret.cases.case01 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 19,
        sides: [SIDES.UP, SIDES.BACK]
    },
    moves: "R U R'"
};

ret.cases.case02 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 9,
        sides: [SIDES.LEFT, SIDES.UP]
    },
    moves: "F' U' F"
};

ret.cases.case03 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 1,
        sides: [SIDES.FRONT, SIDES.UP]
    },
    moves: "U' F' U F"
};


ret.cases.case04 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 11,
        sides: [SIDES.UP, SIDES.RIGHT]
    },
    moves: "U R U' R'"
};



ret.cases.case05 = {
    corner: {
        position: 8,
        sides: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT ],
    },
    edge: {
        position: 1,
        sides: [SIDES.FRONT, SIDES.UP]
    },
    moves: "U R U' R' U' F' U F"
};

ret.cases.case06 = {
    corner: {
        position: 8,
        sides: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT ],
    },
    edge: {
        position: 11,
        sides: [SIDES.UP, SIDES.RIGHT]
    },
    moves: "U' F' U F U R U' R'"
};


ret.cases.case07 = {
    corner: {
        position: 8,
        sides: [SIDES.RIGHT, SIDES.DOWN, SIDES.FRONT ],
    },
    edge: {
        position: 1,
        sides: [SIDES.FRONT, SIDES.UP]
    },
    moves: "F' U F U' F' U F"
};

ret.cases.case08 = {
    corner: {
        position: 8,
        sides: [SIDES.RIGHT, SIDES.DOWN, SIDES.FRONT ],
    },
    edge: {
        position: 11,
        sides: [SIDES.UP, SIDES.RIGHT]
    },
    moves: "R U R' U' R U R'"
};

ret.cases.case09 = {
    corner: {
        position: 8,
        sides: [SIDES.FRONT, SIDES.RIGHT, SIDES.DOWN ],
    },
    edge: {
        position: 11,
        sides: [SIDES.UP, SIDES.RIGHT]
    },
    moves: "R U' R' U R U' R'"
};

ret.cases.case10 = {
    corner: {
        position: 8,
        sides: [SIDES.FRONT, SIDES.RIGHT, SIDES.DOWN ],
    },
    edge: {
        position: 11,
        sides: [SIDES.FRONT, SIDES.UP]
    },
    moves: "F' U' F U F' U' F"
};



ret.cases.case11 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.FRONT, SIDES.RIGHT]
    },
    moves: "R U R' U' R U R' U' R U R'"
};

ret.cases.case12 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.RIGHT, SIDES.FRONT]
    },
    moves: "R U' R' F' U2 F"
};

ret.cases.case13 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 5,
        sides: [SIDES.FRONT, SIDES.RIGHT]
    },
    moves: "U F' U F U F' U2 F"
};

ret.cases.case14 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 5,
        sides: [SIDES.RIGHT, SIDES.FRONT]
    },
    moves: "U F' U' F U' R U R'"
};

ret.cases.case15 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.FRONT, SIDES.RIGHT]
    },
    moves: "U' R U' R' U' R U2 R'"
};

ret.cases.case16 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.RIGHT, SIDES.FRONT]
    },
    moves: "U' R U R' U F' U' F"
};




ret.cases.case17 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 11,
        sides: [SIDES.RIGHT, SIDES.UP]
    },
    moves: "R U' R' U2 F' U' F"
};

ret.cases.case18 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 1,
        sides: [SIDES.UP, SIDES.FRONT]
    },
    moves: "F' U F U2 R U R'"
};



ret.cases.case19 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 19,
        sides: [SIDES.BACK, SIDES.UP]
    },
    moves: "U F' U2 F U F' U2 F"
};

ret.cases.case20 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 9,
        sides: [SIDES.UP, SIDES.LEFT]
    },
    moves: "U' R U2 R' U' R U2 R'"
};




ret.cases.case21 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 9,
        sides: [SIDES.LEFT, SIDES.UP]
    },
    moves: "U F' U' F U F' U2 F"
};

ret.cases.case22 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 19,
        sides: [SIDES.UP, SIDES.BACK]
    },
    moves: "U' R U R' U' R U2 R'"
};



ret.cases.case23 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 11,
        sides: [SIDES.UP, SIDES.RIGHT]
    },
    moves: "U' R U' R' U R U R'"
};

ret.cases.case24 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 1,
        sides: [SIDES.FRONT, SIDES.UP]
    },
    moves: "U F' U F U' F' U' F"
};




ret.cases.case25 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 9,
        sides: [SIDES.UP, SIDES.LEFT]
    },
    moves: "U' R U R' U R U R'"
};

ret.cases.case26 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 19,
        sides: [SIDES.BACK, SIDES.UP]
    },
    moves: "U F' U' F U' F' U' F"
};


ret.cases.case27 = {
    corner: {
        position: 2,
        sides: [SIDES.RIGHT, SIDES.FRONT, SIDES.UP ],
    },
    edge: {
        position: 1,
        sides: [SIDES.UP, SIDES.FRONT]
    },
    moves: "U F' U2 F U' R U R'"
};

ret.cases.case28 = {
    corner: {
        position: 2,
        sides: [SIDES.FRONT, SIDES.UP, SIDES.RIGHT ],
    },
    edge: {
        position: 11,
        sides: [SIDES.RIGHT, SIDES.UP]
    },
    moves: "U' R U2 R' U F' U' F"
};





ret.cases.case29 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 1,
        sides: [SIDES.UP, SIDES.FRONT]
    },
    moves: "R U R' U' U' R U R' U' R U R'"
};

ret.cases.case30 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 11,
        sides: [SIDES.RIGHT, SIDES.UP]
    },
    moves: "Y R' U' R U2 R' U' R U R' U' R Y"
};

ret.cases.case31 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 9,
        sides: [SIDES.UP, SIDES.LEFT]
    },
    moves: "U2 R U R' U R U' R'"
};

ret.cases.case32 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 19,
        sides: [SIDES.BACK, SIDES.UP]
    },
    moves: "U2 F' U' F U' F' U F"
};

ret.cases.case33 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 19,
        sides: [SIDES.UP, SIDES.BACK]
    },
    moves: "U R U2 R' U R U' R'"
};

ret.cases.case34 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 9,
        sides: [SIDES.LEFT, SIDES.UP]
    },
    moves: "U' F' U2 F U' F' U F"
};

ret.cases.case35 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 11,
        sides: [SIDES.UP, SIDES.RIGHT]
    },
    moves: "R U2 R' U' R U R'"
};

ret.cases.case36 = {
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 1,
        sides: [SIDES.FRONT, SIDES.UP]
    },
    moves: "F' U2 F U F' U' F"
};





ret.cases.case37 = {
    corner: {
        position: 8,
        sides: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.FRONT, SIDES.RIGHT]
    },
    moves: ""
};

ret.cases.case38 = {
    corner: {
        position: 8,
        sides: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.RIGHT, SIDES.FRONT]
    },
    moves: "R U' R' U F' U2 F U F' U2 F"
};


ret.cases.case39 = {
    corner: {
        position: 8,
        sides: [SIDES.RIGHT, SIDES.DOWN, SIDES.FRONT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.RIGHT, SIDES.FRONT]
    },
    moves: "R U' R' U R U2 R' U R U' R'"
};


ret.cases.case40 = {
    corner: {
        position: 8,
        sides: [SIDES.FRONT, SIDES.RIGHT, SIDES.DOWN ],
    },
    edge: {
        position: 5,
        sides: [SIDES.RIGHT, SIDES.FRONT]
    },
    moves: "R U' R' U' R U R' U' R U2 R'"
};


ret.cases.case41 = {
    corner: {
        position: 8,
        sides: [SIDES.RIGHT, SIDES.DOWN, SIDES.FRONT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.RIGHT, SIDES.FRONT]
    },
    moves: "R U R' U' R U' R' U2 F' U' F"
};


ret.cases.case42 = {
    corner: {
        position: 8,
        sides: [SIDES.FRONT, SIDES.RIGHT, SIDES.DOWN ],
    },
    edge: {
        position: 5,
        sides: [SIDES.RIGHT, SIDES.FRONT]
    },
    moves: "R U' R' U F' U' F U' F' U' F"
};

export const f2lAlgorithm = ret;