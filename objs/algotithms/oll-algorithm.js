import { SIDES } from "../constants.js";


let ret = {
    side: SIDES.UP,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    cases: {
    }
};

ret.cases.dot01 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R U B' X' R U X2 R2 X' U' R' F R F'"
}

ret.cases.dot02 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R' F R F' U2 R' F R Y' R2 U2 R"
}

ret.cases.dot03 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "Y L' R2 B R' B L U2 L' B M' X'"
}

ret.cases.dot04 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.UP
    ],
    moves: "R' U2 X R' U R U' Y R' U' R' U R' F Z'"
}

ret.cases.dot05 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.BACK
    ],
    moves: "R U R' U R' F R F' U2 R' F R F'"
}

ret.cases.dot06 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "M' U2 M U2 M' U M U2 M' U2 M"
}

ret.cases.dot07 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "R' U2 F R U R' U' Y' R2 U2 X' R U X"
}

ret.cases.dot08 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.BACK, SIDES.BACK
    ],
    moves: "F R U R' U Y' R' U2 R' F R F'"
}





ret.cases.line01 = {
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R' U' Y L' U L' Y' L F L' F R"
}

ret.cases.line02 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R U' Y R2 D R' U2 R D' R2 Y' U R'"
}

ret.cases.line03 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "F U R U' R' U R U' R' F'"
}

ret.cases.line04 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "L' B' L U' R' U R U' R' U R L' B L"
}




ret.cases.cross01 = {
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "L U' R' U L' U R U R' U R"
}

ret.cases.cross02 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R U R' U R U' R' U R U2 R'"
}

ret.cases.cross03 = {
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "L' U R U' L U R'"
}

ret.cases.cross04 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R' U2 R U R' U R"
}

ret.cases.cross05 = {
    sides: [
        SIDES.UP, SIDES.UP, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F' L F R F' L' F"
}

ret.cases.cross06 = {
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP
    ],
    moves: "R2 D R' U2 R D' R' U2 R'"
}

ret.cases.cross07 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F' L' F R F' L F"
}



ret.cases.fourCorner01 = {
    sides: [
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "M' U' M U2 M' U' M"
}

ret.cases.fourCorner02 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "L' R U R' U' L R' F R F'"
}



ret.cases.shapeA01 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "L F R' F R F2 L'"
}

ret.cases.shapeA02 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT
    ],
    moves: "F R' F' R U R U' R'"
}

ret.cases.shapeA03 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "R' U' R Y' X' R U' R' F R U R' X"
}

ret.cases.shapeA04 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.UP, SIDES.BACK
    ],
    moves: "U' R U2 R' U' R U' R2 Y' R' U' R U B"
}

ret.cases.shapeA05 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "F R U R' U' R U R' U' F'"
}

ret.cases.shapeA06 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.UP, SIDES.BACK
    ],
    moves: "L F' L' F U2 L2 Y' L F L' F"
}



ret.cases.shapeB01 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.BACK
    ],
    moves: "U' R' U2 R U R' U R2 Y R U R' U' F'"
}

ret.cases.shapeB02 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP
    ],
    moves: "X L U2 R' U' R U' X' L'"
}

ret.cases.shapeB03 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.UP
    ],
    moves: "R' U2 X' R R U' R' U X R' U2 R"
}

ret.cases.shapeB04 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "F' L' U' L U L' U' L U F"
}

ret.cases.shapeB05 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F R' F' R2 U2 X' U' R U R' X"
}

ret.cases.shapeB06 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F R F' U2 R2 Y R' F' R F'"
}



ret.cases.shapeC01 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.BACK, SIDES.UP
    ],
    moves: "R U R' Y R' F R U' R' F' R"
}

ret.cases.shapeC02 = {
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.BACK
    ],
    moves: "L' B' L U' R' U R L' B L"
}

ret.cases.shapeC03 = {
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.BACK
    ],
    moves: "U2 X L R2 U' R U' R' U2 R U' M"
}

ret.cases.shapeC04 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "X' U' R U' R2 F X R U R' U' R B2"
}



ret.cases.shapeD01 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.BACK
    ],
    moves: "L U' Y' R' U2 R' U R U' R U2 R Y U' L'"
}

ret.cases.shapeD02 = {
    sides: [
        SIDES.UP, SIDES.UP, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "U2 X R' L2 U L' U L U2 L' U M"
}

ret.cases.shapeD03 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "R2 U R' B' R U' R2 U X' R U X R'"
}

ret.cases.shapeD04 = {
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "X' L' U2 R U R' U X L"
}



ret.cases.C01 = {
    sides: [
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R U X' R U' R' U X U' R'"
}

ret.cases.C02 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R U R' U' X D' R' U R E Z'"
}




ret.cases.L01 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.BACK
    ],
    moves: "R' F R U R' F' R Y L U' L'"
}

ret.cases.L02 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "L F' L' U' L F L' Y' R' U R"
}

ret.cases.L03 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "L' B' L R' U' R U L' B L"
}

ret.cases.L04 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.BACK
    ],
    moves: "R B R' L U L' U' R B' R'"
}




ret.cases.P01 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT
    ],
    moves: "F U R U' R' F'"
}

ret.cases.P02 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.UP
    ],
    moves: "R' Y U' L Y' U R U' R' F' R"
}

ret.cases.P03 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.BACK
    ],
    moves: "L Y' U R' Y U' L' U L F L'"
}

ret.cases.P04 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP
    ],
    moves: "F' U' L' U L F"
}




ret.cases.T01 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.UP
    ],
    moves: "F R U R' U' F'"
}

ret.cases.T02 = {
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.UP
    ],
    moves: "R U R' U' R' F R F'"
}




ret.cases.W01 = {
    sides: [
        SIDES.UP, SIDES.UP, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.UP
    ],
    moves: "L U L' U L U' L' U' Y2 R' F R F'"
}

ret.cases.W02 = {
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R' U' R U' R' U R U Y F R' F' R"
}

ret.cases.Z01 = {
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.BACK, SIDES.BACK
    ],
    moves: "R' F R U R' U' Y L' Y' U R"
}

ret.cases.Z02 = {
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.UP
    ],
    moves: "L F' L' U' L U Y' R Y U' L'"
}






Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const ollAlgorithm = ret;