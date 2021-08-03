import { AXIS, CLOCK, SIDES } from "./constants.js";

export const MOVEMENTS = {
    F: { axis: AXIS.Z, layers: [0], clock: CLOCK.NORMAL },
    U: { axis: AXIS.Y, layers: [0], clock: CLOCK.NORMAL },
    L: { axis: AXIS.X, layers: [0], clock: CLOCK.NORMAL },
    B: { axis: AXIS.Z, layers: [-1], clock: CLOCK.ANTI },
    D: { axis: AXIS.Y, layers: [-1], clock: CLOCK.ANTI },
    R: { axis: AXIS.X, layers: [-1], clock: CLOCK.ANTI },
    F_: { axis: AXIS.Z, layers: [0], clock: CLOCK.ANTI },
    U_: { axis: AXIS.Y, layers: [0], clock: CLOCK.ANTI },
    L_: { axis: AXIS.X, layers: [0], clock: CLOCK.ANTI },
    B_: { axis: AXIS.Z, layers: [-1], clock: CLOCK.NORMAL },
    D_: { axis: AXIS.Y, layers: [-1], clock: CLOCK.NORMAL },
    R_: { axis: AXIS.X, layers: [-1], clock: CLOCK.NORMAL },
    Z: { axis: AXIS.Z, clock: CLOCK.NORMAL },
    Y: { axis: AXIS.Y, clock: CLOCK.NORMAL },
    X: { axis: AXIS.X, clock: CLOCK.NORMAL },
    Z_: { axis: AXIS.Z, clock: CLOCK.ANTI },
    Y_: { axis: AXIS.Y, clock: CLOCK.ANTI },
    X_: { axis: AXIS.X, clock: CLOCK.ANTI },
}