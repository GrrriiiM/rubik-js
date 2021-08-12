import { AXIS, CLOCK } from "./constants.js";

export const MOVEMENTS = {
    F: { str: "F", axis: AXIS.Z, layers: [0], clock: CLOCK.NORMAL },
    U: { str: "U", axis: AXIS.Y, layers: [0], clock: CLOCK.NORMAL },
    L: { str: "L", axis: AXIS.X, layers: [0], clock: CLOCK.NORMAL },
    B: { str: "B", axis: AXIS.Z, layers: [-1], clock: CLOCK.ANTI },
    D: { str: "D", axis: AXIS.Y, layers: [-1], clock: CLOCK.ANTI },
    R: { str: "R", axis: AXIS.X, layers: [-1], clock: CLOCK.ANTI },
    S: { str: "S", axis: AXIS.Z, layers: [0.1], clock: CLOCK.NORMAL },
    M: { str: "E", axis: AXIS.Y, layers: [0.1], clock: CLOCK.NORMAL },
    E: { str: "M", axis: AXIS.X, layers: [0.1], clock: CLOCK.NORMAL },
    F_: { str: "F'", axis: AXIS.Z, layers: [0], clock: CLOCK.ANTI },
    U_: { str: "U'", axis: AXIS.Y, layers: [0], clock: CLOCK.ANTI },
    L_: { str: "L'", axis: AXIS.X, layers: [0], clock: CLOCK.ANTI },
    B_: { str: "B'", axis: AXIS.Z, layers: [-1], clock: CLOCK.NORMAL },
    D_: { str: "D'", axis: AXIS.Y, layers: [-1], clock: CLOCK.NORMAL },
    R_: { str: "R'", axis: AXIS.X, layers: [-1], clock: CLOCK.NORMAL },
    S_: { str: "S'", axis: AXIS.Z, layers: [0.1], clock: CLOCK.ANTI },
    M_: { str: "E'", axis: AXIS.Y, layers: [0.1], clock: CLOCK.ANTI },
    E_: { str: "M'", axis: AXIS.X, layers: [0.1], clock: CLOCK.ANTI },
    Z: { str: "Z", axis: AXIS.Z, layers: [], clock: CLOCK.NORMAL },
    Y: { str: "Y", axis: AXIS.Y, layers: [], clock: CLOCK.NORMAL },
    X_: { str: "X'", axis: AXIS.X, layers: [], clock: CLOCK.NORMAL },
    Z_: { str: "Z'", axis: AXIS.Z, layers: [], clock: CLOCK.ANTI },
    Y_: { str: "Y'", axis: AXIS.Y, layers: [], clock: CLOCK.ANTI },
    X: { str: "X", axis: AXIS.X, layers: [], clock: CLOCK.ANTI },
}

export const MOVEMENTS_STR = {};
Object.keys(MOVEMENTS).forEach(_ => MOVEMENTS_STR[MOVEMENTS[_].str] = MOVEMENTS[_]);
