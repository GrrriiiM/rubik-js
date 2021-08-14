import { SIDES } from "../constants.js";


let ret = {
    name: "OLL",
    sample: "BBBOOOOOOYYYYYYYYYBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBUUUUUU",
    side: SIDES.UP,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    cases: {
    }
};

ret.cases.dot01 = {
    sample: "BYBOOOOOOBBBBYBBBBYYYGGGGGGBYBRRRRRRWWWWWWWWWYYYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R U B' X' R U X2 R2 X' U' R' F R F'"
}

ret.cases.dot02 = {
    sample: "YYYOOOOOOBBBBYBBBBYYBGGGGGGBYBRRRRRRWWWWWWWWWBYYUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R' F R F' U2 R' F R Y' R2 U2 R Y"
}

ret.cases.dot03 = {
    sample: "BYBOOOOOOBBBBYBBBYBYYGGGGGGBYYRRRRRRWWWWWWWWWBYYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "Y L' R2 B R' B L U2 L' B M' X' Y'"
}

ret.cases.dot04 = {
    sample: "YYBOOOOOOBBYBYBBBBYYBGGGGGGBYBRRRRRRWWWWWWWWWYYBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.UP
    ],
    moves: "R' U2 X R' U R U' Y R' U' R' U R' F Z' Y'"
}

ret.cases.dot05 = {
    sample: "BYBOOOOOOYBBBYBBBYBYYGGGGGGYYBRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.BACK
    ],
    moves: "R U R' U R' F R F' U2 R' F R F'"
}

ret.cases.dot06 = {
    sample: "BYBOOOOOOYBYBYBYBYBYBGGGGGGBYBRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "M' U2 M U2 M' U M U2 M' U2 M"
}

ret.cases.dot07 = {
    sample: "BYBOOOOOOYBYBYBBBBBYYGGGGGGBYBRRRRRRWWWWWWWWWYYBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "R' U2 F R U R' U' Y' R2 U2 X' R U X Y"
}

ret.cases.dot08 = {
    sample: "BYBOOOOOOBBBBYBYBYBYBGGGGGGYYYRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.BACK, SIDES.BACK
    ],
    moves: "F R U R' U Y' R' U2 R' F R F' Y"
}





ret.cases.line01 = {
    sample: "YBBOOOOOOBYBBYBBYBBYBGGGGGGBBYRRRRRRWWWWWWWWWYYYUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R' U' Y L' U L' Y' L F L' F R"
}

ret.cases.line02 = {
    sample: "BBBOOOOOOBYBBYBBYBYYYGGGGGGBBBRRRRRRWWWWWWWWWYYYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R U' Y R2 D R' U2 R D' R2 Y' U R'"
}

ret.cases.line03 = {
    sample: "YYBOOOOOOBBBYYYBBBBBBGGGGGGBYYRRRRRRWWWWWWWWWYBYUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "F U R U' R' U R U' R' F'"
}

ret.cases.line04 = {
    sample: "BYBOOOOOOBBBYYYBBBYBYGGGGGGBYBRRRRRRWWWWWWWWWYBYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "L' B' L U' R' U R U' R' U R L' B L"
}




ret.cases.cross01 = {
    sample: "YBBOOOOOOBYBYYYBYBBBBGGGGGGBBYRRRRRRWWWWWWWWWYBYUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "L U' R' U L' U R U R' U R"
}

ret.cases.cross02 = {
    sample: "BBBOOOOOOBYBYYYBYBYBYGGGGGGBBBRRRRRRWWWWWWWWWYBYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R U R' U R U' R' U R U2 R'"
}

ret.cases.cross03 = {
    sample: "YBBOOOOOOBYBYYYBYYYBBGGGGGGYBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "L' U R U' L U R'"
}

ret.cases.cross04 = {
    sample: "BBBOOOOOOBYBYYYBYYBBYGGGGGGBBYRRRRRRWWWWWWWWWBBYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R' U2 R U R' U R"
}

ret.cases.cross05 = {
    sample: "BBYOOOOOOYYBYYYYYBBBBGGGGGGYBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.UP, SIDES.UP, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F' L F R F' L' F"
}

ret.cases.cross06 = {
    sample: "YBYOOOOOOYYYYYYBYBBBBGGGGGGBBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP
    ],
    moves: "R2 D R' U2 R D' R' U2 R'"
}

ret.cases.cross07 = {
    sample: "BBBOOOOOOYYBYYYBYYBBYGGGGGGYBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F' L' F R F' L F"
}



ret.cases.fourCorner01 = {
    sample: "BBBOOOOOOYBYYYBYYYBBBGGGGGGBYBRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "M' U' M U2 M' U' M"
}

ret.cases.fourCorner02 = {
    sample: "BYBOOOOOOYBYYYYYBYBBBGGGGGGBYBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "L' R U R' U' L R' F R F'"
}



ret.cases.shapeA01 = {
    sample: "BYYOOOOOOBYBYYBYBBBBBGGGGGGBBYRRRRRRWWWWWWWWWBYYUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "L F R' F R F2 L'"
}

ret.cases.shapeA02 = {
    sample: "YYBOOOOOOYYBYYBBBYBBBGGGGGGBBBRRRRRRWWWWWWWWWBYYUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT
    ],
    moves: "F R' F' R U R U' R'"
}

ret.cases.shapeA03 = {
    sample: "YYBOOOOOOBYBYYBBBYYBBGGGGGGYBBRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "R' U' R Y' X' R U' R' F R U R' X Y"
}

ret.cases.shapeA04 = {
    sample: "BYBOOOOOOBYBYYBYBYBBBGGGGGGYBYRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.UP, SIDES.BACK
    ],
    moves: "U' R U2 R' U' R U' R2 Y' R' U' R U B Y"
}

ret.cases.shapeA05 = {
    sample: "BYYOOOOOOBYBYYBBBBYBYGGGGGGYBBRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "F R U R' U' R U R' U' F'"
}

ret.cases.shapeA06 = {
    sample: "YYYOOOOOOBYBYYBBBBBBBGGGGGGYBYRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.UP, SIDES.BACK
    ],
    moves: "L F' L' F U2 L2 Y' L F L' F Y"
}



ret.cases.shapeB01 = {
    sample: "BYBOOOOOOBYBBYYYBYBYBGGGGGGYBYRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.BACK
    ],
    moves: "U' R' U2 R U R' U R2 Y R U R' U' F' Y'"
}

ret.cases.shapeB02 = {
    sample: "YYBOOOOOOBYYBYYBBBYYBGGGGGGBBBRRRRRRWWWWWWWWWYBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP
    ],
    moves: "X L U2 R' U' R U' X' L'"
}

ret.cases.shapeB03 = {
    sample: "BYBOOOOOOBYYBYYYBBBYBGGGGGGBBYRRRRRRWWWWWWWWWYBBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.UP
    ],
    moves: "R' U2 X' R R U' R' U X R' U2 R"
}

ret.cases.shapeB04 = {
    sample: "YYBOOOOOOBYBBYYBBBBYBGGGGGGBBYRRRRRRWWWWWWWWWYBYUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.RIGHT
    ],
    moves: "F' L' U' L U L' U' L U F"
}

ret.cases.shapeB05 = {
    sample: "BYYOOOOOOBYBBYYBBBYYYGGGGGGYBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F R' F' R2 U2 X' U' R U R' X"
}

ret.cases.shapeB06 = {
    sample: "YYYOOOOOOBYBBYYBBBBYBGGGGGGYBYRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.BACK
    ],
    moves: "R' F R F' U2 R2 Y R' F' R F' Y'"
}



ret.cases.shapeC01 = {
    sample: "BBYOOOOOOBBYYYBBYBBBYGGGGGGBYYRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.BACK, SIDES.BACK, SIDES.UP
    ],
    moves: "R U R' Y R' F R U' R' F' R Y'"
}

ret.cases.shapeC02 = {
    sample: "YBBOOOOOOYBBYYBBYBBBBGGGGGGYYBRRRRRRWWWWWWWWWYYBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.BACK
    ],
    moves: "L' B' L U' R' U R L' B L"
}

ret.cases.shapeC03 = {
    sample: "YBBOOOOOOBBBYYBBYYYBBGGGGGGYYBRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.BACK, SIDES.BACK
    ],
    moves: "U2 X L R2 U' R U' R' U2 R U' M"
}

ret.cases.shapeC04 = {
    sample: "BBBOOOOOOYBYYYBBYBBBYGGGGGGBYBRRRRRRWWWWWWWWWYYBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "X' U' R U' R2 F X R U R' U' R B2"
}



ret.cases.shapeD01 = {
    sample: "BBYOOOOOOBBBBYYBYBYYYGGGGGGYYBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.BACK
    ],
    moves: "L U' Y' R' U2 R' U R U' R U2 R Y U' L'"
}

ret.cases.shapeD02 = {
    sample: "BBYOOOOOOBBBBYYYYBBYBGGGGGGBYYRRRRRRWWWWWWWWWBBYUUUUUU",
    sides: [
        SIDES.UP, SIDES.UP, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "U2 X R' L2 U L' U L U2 L' U M"
}

ret.cases.shapeD03 = {
    sample: "BBBOOOOOOYBYBYYBYBBYYGGGGGGBYBRRRRRRWWWWWWWWWYBBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.BACK, SIDES.UP
    ],
    moves: "R2 U R' B' R U' R2 U X' R U X R'"
}

ret.cases.shapeD04 = {
    sample: "BBBOOOOOOBBBBYYBYYBYYGGGGGGBYYRRRRRRWWWWWWWWWBBYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "X' L' U2 R U R' U X L"
}



ret.cases.C01 = {
    sample: "BBBOOOOOOYYBBYBYYBBYBGGGGGGBBBRRRRRRWWWWWWWWWYYYUUUUUU",
    sides: [
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.LEFT, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT
    ],
    moves: "R U X' R U' R' U X U' R'"
}

ret.cases.C02 = {
    sample: "BYBOOOOOOBBBYYYYBYYBBGGGGGGBYBRRRRRRWWWWWWWWWBBYUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R U R' U' X D' R' U R E Z' Y'"
}




ret.cases.L01 = {
    sample: "YYBOOOOOOBBBYYYBBYYBBGGGGGGYYBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.BACK
    ],
    moves: "R' F R U R' F' R Y L U' L' Y'"
}

ret.cases.L02 = {
    sample: "BYYOOOOOOBBBYYYYBBBBBGGGGGGBYYRRRRRRWWWWWWWWWBBYUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "L F' L' U' L F L' Y' R' U R Y"
}

ret.cases.L03 = {
    sample: "BYBOOOOOOBBBYYYBBYBBYGGGGGGBYYRRRRRRWWWWWWWWWBBYUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "L' B' L R' U' R U L' B L"
}

ret.cases.L04 = {
    sample: "BYBOOOOOOBBBYYYYBBYBBGGGGGGYYBRRRRRRWWWWWWWWWYBBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.BACK
    ],
    moves: "R B R' L U L' U' R B' R'"
}




ret.cases.P01 = {
    sample: "BYBOOOOOOYYBYYBYBBBBBGGGGGGBBBRRRRRRWWWWWWWWWYYYUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT
    ],
    moves: "F U R U' R' F'"
}

ret.cases.P02 = {
    sample: "YYBOOOOOOBYYBYYBBYBYBGGGGGGBBYRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.UP, SIDES.UP
    ],
    moves: "R' Y U' L Y' U R U' R' F' R"
}

ret.cases.P03 = {
    sample: "BYYOOOOOOYYBYYBYBBBBBGGGGGGYBBRRRRRRWWWWWWWWWBYBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.FRONT,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.BACK
    ],
    moves: "L Y' U R' Y U' L' U L F L'"
}

ret.cases.P04 = {
    sample: "BYBOOOOOOBYYBYYBBYYYYGGGGGGBBBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.UP, SIDES.UP
    ],
    moves: "F' U' L' U L F"
}




ret.cases.T01 = {
    sample: "BYBOOOOOOBBYYYYBBYYBYGGGGGGBYBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.UP
    ],
    moves: "F R U R' U' F'"
}

ret.cases.T02 = {
    sample: "YYBOOOOOOBBYYYYBBYBBBGGGGGGBYYRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.UP
    ],
    moves: "R U R' U' R' F R F'"
}




ret.cases.W01 = {
    sample: "BBYOOOOOOBBYBYYYYBYYBGGGGGGBYBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.UP, SIDES.UP, SIDES.FRONT,
        SIDES.LEFT, SIDES.UP, SIDES.UP,
        SIDES.LEFT, SIDES.BACK, SIDES.UP
    ],
    moves: "L U L' U L U' L' U' Y2 R' F R F' Y2"
}

ret.cases.W02 = {
    sample: "YBBOOOOOOYBBYYBBYYBBBGGGGGGBYBRRRRRRWWWWWWWWWBYYUUUUUU",
    sides: [
        SIDES.FRONT, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.RIGHT,
        SIDES.UP, SIDES.BACK, SIDES.RIGHT
    ],
    moves: "R' U' R U' R' U R U Y F R' F' R Y'"
}

ret.cases.Z01 = {
    sample: "BYBOOOOOOYBBYYYBBYBBYGGGGGGYYBRRRRRRWWWWWWWWWBBBUUUUUU",
    sides: [
        SIDES.LEFT, SIDES.FRONT, SIDES.UP,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.UP, SIDES.BACK, SIDES.BACK
    ],
    moves: "R' F R U R' U' Y L' Y' U R"
}

ret.cases.Z02 = {
    sample: "BYBOOOOOOBBYYYYYBBBBBGGGGGGBYYRRRRRRWWWWWWWWWYBBUUUUUU",
    sides: [
        SIDES.UP, SIDES.FRONT, SIDES.RIGHT,
        SIDES.UP, SIDES.UP, SIDES.UP,
        SIDES.BACK, SIDES.BACK, SIDES.UP
    ],
    moves: "L F' L' U' L U Y' R Y U' L'"
}


Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const ollAlgorithm = ret;