import { SIDES } from "../constants";

let ret = {
    side: SIDES.UP,
    positions: [0, 1, 2, 9, 10, 11, 18, 19, 20],
    cases: {}
}

ret.cases.A1 = {
    positions: [0, 1, 20, 9, 10, 11, 2, 19, 18],
    sample: "OORBBBBBBYYYYYYYYYRGGBBBBBBURUBBBBBBBBBBBBBBBGUOBBBBBB",
    moves: "X R' U R' D2 R U' R' D2 R2 X'"
}

ret.cases.A2 = {
    moves: "X' R U' R D2 R' U R D2 R2"
}

ret.cases.U1 = {
    moves: "R2 U R U R' U' R' U' R' U R'"
}

ret.cases.U2 = {
    moves: "R U' R U R U R U' R' U' R2"
}

ret.cases.H = {
    moves: "M2 U M2 U2 M2 U M2"
}

ret.cases.T = {
    moves: "R U R' U' R' F R2 U' R' U' R U R' F'"
}

ret.cases.J1 = {
    moves: "R' U L' U2 R U' R' U2 R L U'"
}

ret.cases.J2 = {
    moves: "R U R' F' R U R' U' R' F R2 U' R' U'"
}

ret.cases.R1 = {
    moves: "L U2 L' U2 L F' L' U' L U L F L2 U"
}

ret.cases.R2 = {
    moves: "R' U2 R U2 R' F R U R' U' R' F' R2 U'"
}

ret.cases.V = {
    moves: "R' U R' Y U' R' F' R2 U' R' U R' F R F"
}

ret.cases.G1 = {
    moves: "R2 Y D' R' U R' U' R Y' D R2 Y' R' U R"
}

ret.cases.G2 = {
    moves: "R' U' R Y R2 Y D' R' U R U' R Y' D R2"
}

ret.cases.G3 = {
    moves: "R2 Y' D R U' R U R' Y D' R2 Y R U' R'"
}

ret.cases.G4 = {
    moves: "R U R' Y' R2 Y' D R U' R' U R' Y D' R2"
}

ret.cases.F = {
    moves: "R' U2 R' Y U' R' F' R2 U' R' U R' F R U' F"
}

ret.cases.Z = {
    moves: "M2 U M2 U M' U2 M2 U2 M' U2"
}

ret.cases.Y = {
    moves: "F R U' R' U' R U R' F' R U R' U' R' F R F'"
}

ret.cases.N1 = {
    moves: "L U' R U2 L' U R' L U' R U2 L' U R' U"
}

ret.cases.N2 = {
    moves: "R' U L' U2 R U' L R' U L' U2 R U' L U'"
}

ret.cases.E = {
    moves: "X' R U' R' D R U R' Y2 D2 R' U R D R' U' R"
}

Object.entries(ret.cases).forEach(_ => _[1].name = _[0]);

export const pllAlgorithm = ret;