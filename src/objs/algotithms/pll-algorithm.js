import { SIDES } from "../constants.js";
import { CUBE_DEFAULT_PATTERN } from "../creator.js";

let ret = {
    name: "PLL",
    side: SIDES.UP,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    sample: CUBE_DEFAULT_PATTERN,
    cases: {}
}

ret.cases.solved = {
    solved: true,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    sample: CUBE_DEFAULT_PATTERN,
    moves: ""
}

ret.cases.A1 = {
    positions: [0, 1, 18, 9, 10, 11, 20, 19, 2],
    sample: "OOROOOOOOYYYYYYYYYRGGGGGGGGURURRRRRRWWWWWWWWWGUOUUUUUU",
    moves: "X R' U R' D2 R U' R' D2 R2 X'"
}

ret.cases.A2 = {
    positions: [2, 1, 20, 9, 10, 11, 18, 19, 0],
    sample: "UOUOOOOOOYYYYYYYYYGGOGGGGGGORRRRRRRRWWWWWWWWWRUGUUUUUU",
    moves: "X' R U' R D2 R' U R D2 R2 X"
}

ret.cases.U1 = {
    positions: [0, 9, 2, 11, 10, 1, 18, 19, 20],
    sample: "OGOOOOOOOYYYYYYYYYGUGGGGGGGRRRRRRRRRWWWWWWWWWUOUUUUUUU",
    moves: "R2 U R U R' U' R' U' R' U R'"
}

ret.cases.U2 = {
    positions: [0, 11, 2, 1, 10, 9, 18, 19, 20],
    sample: "OUOOOOOOOYYYYYYYYYGOGGGGGGGRRRRRRRRRWWWWWWWWWUGUUUUUUU",
    moves: "R U' R U R U R U' R' U' R2"
}

ret.cases.H = {
    positions: [0, 19, 2, 11, 10, 9, 18, 1, 20],
    sample: "OROOOOOOOYYYYYYYYYGUGGGGGGGRORRRRRRRWWWWWWWWWUGUUUUUUU",
    moves: "M2 U M2 U2 M2 U M2"
}

ret.cases.T = {
    positions: [0, 1, 20, 11, 10, 9, 18, 19, 2],
    sample: "OOUOOOOOOYYYYYYYYYGUGGGGGGGURRRRRRRRWWWWWWWWWRGOUUUUUU",
    moves: "R U R' U' R' F R2 U' R' U' R U R' F'"
}

ret.cases.J1 = {
    positions: [0, 1, 2, 19, 10, 11, 20, 9, 18],
    sample: "OOOOOOOOOYYYYYYYYYRRGGGGGGGGGURRRRRRWWWWWWWWWUURUUUUUU",
    moves: "R' U L' U2 R U' R' U2 R L U'"
}

ret.cases.J2 = {
    positions: [0, 11, 20, 9, 10, 1, 18, 19, 2],
    sample: "OUUOOOOOOYYYYYYYYYGGGGGGGGGURRRRRRRRWWWWWWWWWROOUUUUUU",
    moves: "R U R' F' R U R' U' R' F R2 U' R' U'"
}

ret.cases.R1 = {
    positions: [0, 9, 2, 1, 10, 11, 20, 19, 18],
    sample: "OGOOOOOOOYYYYYYYYYROGGGGGGGGRURRRRRRWWWWWWWWWUURUUUUUU",
    moves: "L U2 L' U2 L F' L' U' L U L F L2 U"
}

ret.cases.R2 = {
    positions: [0, 11, 2, 9, 10, 1, 20, 19, 18],
    sample: "OUOOOOOOOYYYYYYYYYRGGGGGGGGGRURRRRRRWWWWWWWWWUORUUUUUU",
    moves: "R' U2 R U2 R' F R U R' U' R' F' R2 U'"
}

ret.cases.V = {
    positions: [0, 1, 18, 9, 10, 19, 2, 11, 20],
    sample: "OOROOOOOOYYYYYYYYYUGGGGGGGGRUORRRRRRWWWWWWWWWGRUUUUUUU",
    moves: "R' U R' Y U' R' F' R2 U' R' U R' F R F Y'"
}

ret.cases.G1 = {
    positions: [18, 1, 2, 11, 10, 19, 20, 9, 0],
    sample: "GOOOOOOOOYYYYYYYYYRURGGGGGGOGURRRRRRWWWWWWWWWURGUUUUUU",
    moves: "R2 Y D R' U R' U' R Y' D' R2 Y' R' U R Y"
}

ret.cases.G2 = {
    positions: [2, 9, 18, 19, 10, 11, 0, 1, 20],
    sample: "UGROOOOOOYYYYYYYYYOROGGGGGGROGRRRRRRWWWWWWWWWGUUUUUUUU",
    moves: "R' U' R Y R2 Y D R' U R U' R Y' D' R2 Y'"
}

ret.cases.G3 = {
    positions: [2, 9, 18, 11, 10, 1, 0, 19, 20],
    sample: "UGROOOOOOYYYYYYYYYOUOGGGGGGRRGRRRRRRWWWWWWWWWGOUUUUUUU",
    moves: "R2 Y' D' R U' R U R' Y D R2 Y R U' R' Y'"
}

ret.cases.G4 = {
    positions: [18, 19, 2, 1, 10, 11, 20, 9, 0],
    sample: "GROOOOOOOYYYYYYYYYRORGGGGGGOGURRRRRRWWWWWWWWWUUGUUUUUU",
    moves: "R U R' Y' R2 Y' D' R U' R' U R' Y D R2 Y"
}

ret.cases.F = {
    positions: [2, 1, 0, 11, 10, 9, 18, 19, 20],
    sample: "UOGOOOOOOYYYYYYYYYGUOGGGGGGRRRRRRRRRWWWWWWWWWOGUUUUUUU",
    moves: "R' U2 R' Y U' R' F' R2 U' R' U R' F R U' F Y'"
}

ret.cases.Z = {
    positions: [0, 11, 2, 19, 10, 1, 18, 9, 20],
    sample: "OUOOOOOOOYYYYYYYYYGRGGGGGGGRGRRRRRRRWWWWWWWWWUOUUUUUUU",
    moves: "M2 U M2 U M' U2 M2 U2 M' U2"
}

ret.cases.Y = {
    positions: [0, 1, 18, 19, 10, 11, 2, 9, 20],
    sample: "OOROOOOOOYYYYYYYYYURGGGGGGGRGORRRRRRWWWWWWWWWGUUUUUUUU",
    moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
}

ret.cases.N1 = {
    positions: [0, 19, 18, 9, 10, 11, 2, 1, 20],
    sample: "ORROOOOOOYYYYYYYYYUGGGGGGGGROORRRRRRWWWWWWWWWGUUUUUUUU",
    moves: "L U' R U2 L' U R' L U' R U2 L' U R' U"
}

ret.cases.N2 = {
    positions: [20, 19, 2, 9, 10, 11, 18, 1, 0],
    sample: "RROOOOOOOYYYYYYYYYGGUGGGGGGOORRRRRRRWWWWWWWWWUUGUUUUUU",
    moves: "R' U L' U2 R U' L R' U L' U2 R U' L U'"
}

ret.cases.E = {
    positions: [18, 1, 20, 9, 10, 11, 0, 19, 2],
    sample: "GOUOOOOOOYYYYYYYYYOGRGGGGGGURGRRRRRRWWWWWWWWWRUOUUUUUU",
    moves: "X' R U' R' D R U R' Y2 D2 R' U R D R' U' R X' Y2"
}

Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const pllAlgorithm = ret;