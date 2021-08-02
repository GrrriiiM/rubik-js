export const SIDES = {
    CENTER: 0,
    FRONT: 1,
    BACK: 2,
    LEFT: 3,
    RIGHT: 4,
    UP: 5,
    DOWN: 6,
    fromAxis(axis, { layer = 0, size = 1 }={}) {
        if (axis == AXIS.Z && layer == 0) return SIDES.FRONT;
        if (axis == AXIS.Y && layer == 0) return SIDES.UP;
        if (axis == AXIS.X && layer == 0) return SIDES.LEFT;
        if (axis == AXIS.Z && layer == size - 1) return SIDES.BACK;
        if (axis == AXIS.Y && layer == size - 1) return SIDES.DOWN;
        if (axis == AXIS.X && layer == size - 1) return SIDES.RIGHT;
        return SIDES.CENTER;
    }
}

export const AXIS = {
    Z: SIDES.FRONT,
    Y: SIDES.UP,
    X: SIDES.LEFT
}


export const COLORS = {
    BLACK: SIDES.CENTER,
    ORANGE: SIDES.FRONT,
    YELLOW: SIDES.UP,
    BLUE: SIDES.RIGHT,
    RED: SIDES.BACK,
    WHITE: SIDES.DOWN,
    GREEN: SIDES.LEFT,
    fromSide: (side) => Object.entries(COLORS).find(_ => _[1] == side)[1]
}

export const CLOCK = {
    NORMAL: true,
    ANTI: false
}