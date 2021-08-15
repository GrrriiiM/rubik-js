import { SIDES } from "../constants.js";

let ret = {
    name: "F2L",
    edge: [SIDES.FRONT, SIDES.RIGHT],
    corner: [SIDES.DOWN, SIDES.FRONT, SIDES.RIGHT],
    sample: "BBBOOOOOOBBBBYBBBBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBUUUUUU",
    cases: {

    }
};

//sample: "BBBOOBOOB BBBBYBBBB BBBGGGGGG BBBRRRRRR WWBWWWWWW BBBBUUBUU",


ret.cases.A01 = {
    sample: "BBOOOBOOBBOBBYBBBUBBBGGGGGGBUBRRRRRRWWBWWWWWWWBBBUUBUU",
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

ret.cases.A02 = {
    sample: "BBWOOBOOBBBBUYBBBOBOBGGGGGGBBBRRRRRRWWBWWWWWWUBBBUUBUU",
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

ret.cases.A03 = {
    sample: "BOOOOBOOBBBBBYBBUUBBBGGGGGGBBBRRRRRRWWBWWWWWWWBBBUUBUU",
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


ret.cases.A04 = {
    sample: "BBWOOBOOBBBBBYOBBOBBBGGGGGGBBBRRRRRRWWBWWWWWWUUBBUUBUU",
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



ret.cases.B01 = {
    sample: "BOBOOBOOOBBBBYBBUBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBBUUUUU",
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

ret.cases.B02 = {
    sample: "BBBOOBOOOBBBBYOBBBBBBGGGGGGBBBRRRRRRWWWWWWWWWBUBBUUUUU",
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


ret.cases.B03 = {
    sample: "BOBOOBOOUBBBBYBBUBBBBGGGGGGBBBRRRRRRWWOWWWWWWBBBBUUWUU",
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

ret.cases.B04 = {
    sample: "BBBOOBOOUBBBBYOBBBBBBGGGGGGBBBRRRRRRWWOWWWWWWBUBBUUWUU",
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

ret.cases.B05 = {
    sample: "BBBOOBOOWBBBBYOBBBBBBGGGGGGBBBRRRRRRWWUWWWWWWBUBBUUOUU",
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

ret.cases.B06 = {
    sample: "BOBOOBOOWBBBBYBBUBBBBGGGGGGBBBRRRRRRWWUWWWWWWBBBBUUOUU",
    corner: {
        position: 8,
        sides: [SIDES.FRONT, SIDES.RIGHT, SIDES.DOWN ],
    },
    edge: {
        position: 1,
        sides: [SIDES.FRONT, SIDES.UP]
    },
    moves: "F' U' F U F' U' F"
};



ret.cases.C01 = {
    sample: "BBUOOOOOBBBBBYBBBWBBBGGGGGGBBBRRRRRRWWBWWWWWWOBBUUUBUU",
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

ret.cases.C02 = {
    sample: "BBUOOUOOBBBBBYBBBWBBBGGGGGGBBBRRRRRRWWBWWWWWWOBBOUUBUU",
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

ret.cases.C03 = {
    sample: "BBOOOOOOBBBBBYBBBUBBBGGGGGGBBBRRRRRRWWBWWWWWWWBBUUUBUU",
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

ret.cases.C04 = {
    sample: "BBOOOUOOBBBBBYBBBUBBBGGGGGGBBBRRRRRRWWBWWWWWWWBBOUUBUU",
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

ret.cases.C05 = {
    sample: "BBWOOOOOBBBBBYBBBOBBBGGGGGGBBBRRRRRRWWBWWWWWWUBBUUUBUU",
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

ret.cases.C06 = {
    sample: "BBWOOUOOBBBBBYBBBOBBBGGGGGGBBBRRRRRRWWBWWWWWWUBBOUUBUU",
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




ret.cases.D01 = {
    sample: "BBOOOBOOBBBBBYUBBUBBBGGGGGGBBBRRRRRRWWBWWWWWWWOBBUUBUU",
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

ret.cases.D02 = {
    sample: "BUWOOBOOBBBBBYBBOOBBBGGGGGGBBBRRRRRRWWBWWWWWWUBBBUUBUU",
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



ret.cases.D03 = {
    sample: "BBOOOBOOBBUBBYBBBUBBBGGGGGGBOBRRRRRRWWBWWWWWWWBBBUUBUU",
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

ret.cases.D04 = {
    sample: "BBWOOBOOBBBBOYBBBOBUBGGGGGGBBBRRRRRRWWBWWWWWWUBBBUUBUU",
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




ret.cases.D05 = {
    sample: "BBOOOBOOBBBBUYBBBUBOBGGGGGGBBBRRRRRRWWBWWWWWWWBBBUUBUU",
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

ret.cases.D06 = {
    sample: "BBWOOBOOBBOBBYBBBOBBBGGGGGGBUBRRRRRRWWBWWWWWWUBBBUUBUU",
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



ret.cases.D07 = {
    sample: "BBOOOBOOBBBBBYOBBUBBBGGGGGGBBBRRRRRRWWBWWWWWWWUBBUUBUU",
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

ret.cases.D08 = {
    sample: "BOWOOBOOBBBBBYBBUOBBBGGGGGGBBBRRRRRRWWBWWWWWWUBBBUUBUU",
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




ret.cases.D09 = {
    sample: "BBOOOBOOBBBBOYBBBUBUBGGGGGGBBBRRRRRRWWBWWWWWWWBBBUUBUU",
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

ret.cases.D10 = {
    sample: "BBWOOBOOBBUBBYBBBOBBBGGGGGGBOBRRRRRRWWBWWWWWWUBBBUUBUU",
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


ret.cases.D11 = {
    sample: "BUOOOBOOBBBBBYBBOUBBBGGGGGGBBBRRRRRRWWBWWWWWWWBBBUUBUU",
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

ret.cases.D12 = {
    sample: "BBWOOBOOBBBBBYUBBOBBBGGGGGGBBBRRRRRRWWBWWWWWWUOBBUUBUU",
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





ret.cases.E01 = {
    sample: "BUUOOBOOBBBBBYBBOWBBBGGGGGGBBBRRRRRRWWBWWWWWWOBBBUUBUU",
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

ret.cases.E02 = {
    sample: "BBUOOBOOBBBBBYUBBWBBBGGGGGGBBBRRRRRRWWBWWWWWWOOBBUUBUU",
    corner: {
        position: 2,
        sides: [SIDES.UP, SIDES.RIGHT, SIDES.FRONT ],
    },
    edge: {
        position: 11,
        sides: [SIDES.RIGHT, SIDES.UP]
    },
    moves: "Y' R' U' R U2 R' U' R U R' U' R Y"
};

ret.cases.E03 = {
    sample: "BBUOOBOOBBBBOYBBBWBUBGGGGGGBBBRRRRRRWWBWWWWWWOBBBUUBUU",
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

ret.cases.E04 = {
    sample: "BBUOOBOOBBUBBYBBBWBBBGGGGGGBOBRRRRRRWWBWWWWWWOBBBUUBUU",
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

ret.cases.E05 = {
    sample: "BBUOOBOOBBOBBYBBBWBBBGGGGGGBUBRRRRRRWWBWWWWWWOBBBUUBUU",
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

ret.cases.E06 = {
    sample: "BBUOOBOOBBBBUYBBBWBOBGGGGGGBBBRRRRRRWWBWWWWWWOBBBUUBUU",
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

ret.cases.E07 = {
    sample: "BBUOOBOOBBBBBYOBBWBBBGGGGGGBBBRRRRRRWWBWWWWWWOUBBUUBUU",
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

ret.cases.E08 = {
    sample: "BOUOOBOOBBBBBYBBUWBBBGGGGGGBBBRRRRRRWWBWWWWWWOBBBUUBUU",
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


ret.cases.F01 = {
    sample: "BBBOOUOOOBBBBYBBBBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBOUUUUU",
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


ret.cases.F02 = {
    sample: "BBBOOOOOUBBBBYBBBBBBBGGGGGGBBBRRRRRRWWOWWWWWWBBBUUUWUU",
    corner: {
        position: 8,
        sides: [SIDES.RIGHT, SIDES.DOWN, SIDES.FRONT ],
    },
    edge: {
        position: 5,
        sides: [SIDES.FRONT, SIDES.RIGHT]
    },
    moves: "R U' R' U R U2 R' U R U' R'"
};


ret.cases.F03 = {
    sample: "BBBOOOOOWBBBBYBBBBBBBGGGGGGBBBRRRRRRWWUWWWWWWBBBUUUOUU",
    corner: {
        position: 8,
        sides: [SIDES.FRONT, SIDES.RIGHT, SIDES.DOWN ],
    },
    edge: {
        position: 5,
        sides: [SIDES.FRONT, SIDES.RIGHT]
    },
    moves: "R U' R' U' R U R' U' R U2 R'"
};


ret.cases.F04 = {
    sample: "BBBOOUOOUBBBBYBBBBBBBGGGGGGBBBRRRRRRWWOWWWWWWBBBOUUWUU",
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


ret.cases.F05 = {
    sample: "BBBOOUOOWBBBBYBBBBBBBGGGGGGBBBRRRRRRWWUWWWWWWBBBOUUOUU",
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

ret.fix = {
    sample: "BBBBOBOOUBBBBYBBBBBBBBGBGGGBBBBRBRRRWWOWWWWWWBBBBUBWUU",
    moves: "R U' R'"
};

Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const f2lAlgorithm = ret;