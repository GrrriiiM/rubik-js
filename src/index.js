
const colorOrder = ['front', 'top', 'left', 'back', 'bottom', 'right'];
const SIDES = { center: 0, front: 1, top: 2, left: 3, back: 4, bottom: 5, right: 6 };
const COLORS = ['black', 'orange', 'yellow', 'green', 'red', 'white', 'blue'];
const AXIES = { x: 0, y: 1, z: 2 };



const center = {
    z: -1,
    y: 0,
    x: 0
};

function createBlockColorMatrix(front = 0, top = 0, left = 0, back = 0, bottom = 0, right = 0) {
    return [[
        [0, 0, 0],
        [0, front, 0],
        [0, 0, 0],
    ], [
        [0, top, 0],
        [left, 0, right],
        [0, bottom, 0],
    ], [
        [0, 0, 0],
        [0, back, 0],
        [0, 0, 0],
    ]];
}

function createCubeColorMatrix(dimension = 3) {
    let cube = [];
    for (let z = 0; z < dimension; z++) {
        let cubeY = [];
        for (let y = 0; y < dimension; y++) {
            let cubeX = [];
            for (let x = 0; x < dimension; x++) {
                let frontColor = z == 0 ? SIDES.front : 0;
                let topColor = y == 0 ? SIDES.top : 0;
                let leftColor = x == 0 ? SIDES.left : 0;
                let backColor = z == dimension - 1 ? SIDES.back : 0;
                let bottomColor = y == dimension - 1 ? SIDES.bottom : 0;
                let rightColor = x == dimension - 1 ? SIDES.right : 0;
                let block = createBlockColorMatrix(frontColor, topColor, leftColor, backColor, bottomColor, rightColor);
                cubeX.push(block);
            }
            cubeY.push(cubeX);
        }
        cube.push(cubeY);
    }
    return cube;
}

function createBlockElements(cube) {
    let dimension = cube.length;
    let blockElements = [];
    for (let z = 0; z < dimension; z++) {
        for (let y = 0; y < dimension; y++) {
            for (let x = 0; x < dimension; x++) {
                var blockElement = document.getElementById("block").cloneNode(true);
                blockElement.id = "";
                blockElement.dataset.x = x;
                blockElement.dataset.y = y;
                blockElement.dataset.z = z;
                blockElement.style.transform = getTranslate3d(blockElement, dimension);
                blockElements.push(blockElement)
            }
        }
    }
    return blockElements;
}

function getTranslate3d(blockElement, dimension) {
    let offset = Math.floor(dimension / 2);
    let transform = "translate3d(";
    transform += `calc(var(--block-size) * ${-0.5 + parseInt(blockElement.dataset.x - offset)}),`;
    transform += `calc(var(--block-size) * ${-0.5 + parseInt(blockElement.dataset.y - offset)}),`;
    transform += `calc(var(--block-size) * ${-parseInt(blockElement.dataset.z - offset)}))`;
    return transform
}

function updateColors(cube, blockElements) {
    for (let blockElement of blockElements) {
        let x = parseInt(blockElement.dataset.x);
        let y = parseInt(blockElement.dataset.y);
        let z = parseInt(blockElement.dataset.z);
        let colors = cube[z][y][x];
        blockElement.querySelector('.face-front').style.backgroundColor = COLORS[colors[0][1][1]];
        blockElement.querySelector('.face-top').style.backgroundColor = COLORS[colors[1][0][1]];
        blockElement.querySelector('.face-left').style.backgroundColor = COLORS[colors[1][1][0]];
        blockElement.querySelector('.face-back').style.backgroundColor = COLORS[colors[2][1][1]];
        blockElement.querySelector('.face-bottom').style.backgroundColor = COLORS[colors[1][2][1]];
        blockElement.querySelector('.face-right').style.backgroundColor = COLORS[colors[1][1][2]];
    }
}

let timeRotating = 0.2;
let dimension = 3;
let isRotating = false;
let cubeElement = document.getElementById("cube");
let cube = createCubeColorMatrix(dimension);
let blockElements = createBlockElements(cube);
updateColors(cube, blockElements);
blockElements.forEach(_ => cubeElement.appendChild(_));

function rotateSide(cube, x, y, z, axis, antiClock = false) {
    let offset = Math.floor(cube.length / 2);
    let newZ = z;
    let newY = y;
    let newX = x;
    let direction = !antiClock ? 1 : -1;
    if (axis == AXIES.x) {
        newZ = ((y - offset) * -direction) + offset;
        newY = ((z - offset) * direction) + offset;
    } else if (axis == AXIES.y) {
        newZ = ((x - offset) * -direction) + offset;
        newX = ((z - offset) * direction) + offset;
    } else if (axis == AXIES.z) {
        newY = ((x - offset) * -direction) + offset;
        newX = ((y - offset) * direction) + offset;
    }
    return cube[newZ][newY][newX];
}

function rotateCubeColorMatrix(cube, axis, side, antiClock = false) {
    let dimension = cube.length;
    let zs = axis == AXIES.z && side >= 0 ? [side] : [...Array(dimension).keys()];
    let ys = axis == AXIES.y && side >= 0 ? [side] : [...Array(dimension).keys()];
    let xs = axis == AXIES.x && side >= 0 ? [side] : [...Array(dimension).keys()];
    let newCube = cube.map(z => z.map(y => y.map(x => x)));

    for (let z of zs) {
        for (let y of ys) {
            for (let x of xs) {
                let rotatedSide = rotateSide(cube, x, y, z, axis, antiClock);
                if (rotatedSide instanceof Array) rotateCubeColorMatrix(rotatedSide, axis, 1, antiClock);
                newCube[z][y][x] = rotatedSide;
            }
        }
    }

    for (let z = 0; z < cube.length; z++) {
        cube[z] = newCube[z];
    }
}



function rotate(cube, blockElements, axis, side, timeRotating, antiClock) {
    let dimension = cube.length;
    if (!isRotating) {
        isRotating = true;
        let axisName = ['x', 'y', 'z'][axis]
        let blockEelementsToRotate = blockElements.filter(_ => side == undefined || parseInt(_.dataset[axisName]) == side);
        rotateAnimate(blockEelementsToRotate, axis, dimension, antiClock, timeRotating);
        setTimeout(() => {
            blockEelementsToRotate.forEach(_ => {
                _.style.transition = '';
                _.style.transform = getTranslate3d(_, dimension);
            })
            rotateCubeColorMatrix(cube, axis, side, antiClock);
            updateColors(cube, blockEelementsToRotate);
            isRotating = false;
        }, timeRotating * 1000);

    }
}

function rotateAnimate(blockElementsToRotate, axis, dimension, anticlock, timeRotating = 0.2) {
    let axisName = ['x', 'y', 'z'][axis]
    let move = !anticlock ? 1 : -1
    blockElementsToRotate.forEach(blockElementToRotate => {
        blockElementToRotate.style.transition = `transform ${timeRotating}s ease-out`;
        blockElementToRotate.style.transform = `rotate${axisName.toUpperCase()}(${move * 90}deg) ${getTranslate3d(blockElementToRotate, dimension)}`;
    });
}

function rotateF(antiClock = false) {
    rotate(cube, blockElements, AXIES.z, 0, timeRotating, antiClock);
}

function rotateU(antiClock = false) {
    rotate(cube, blockElements, AXIES.y, 0, timeRotating, antiClock);
}

function rotateL(antiClock = false) {
    rotate(cube, blockElements, AXIES.x, 0, timeRotating, antiClock);
}

function rotateR(antiClock = false) {
    rotate(cube, blockElements, AXIES.x, dimension - 1, timeRotating, antiClock);
}

function rotateD(antiClock = false) {
    rotate(cube, blockElements, AXIES.y, dimension - 1, timeRotating, antiClock);
}

function rotateB(antiClock = false) {
    rotate(cube, blockElements, AXIES.z, dimension - 1, timeRotating, antiClock);
}

function rotateX(antiClock = false) {
    rotate(cube, blockElements, AXIES.x, undefined, timeRotating, antiClock);
}

function rotateY(antiClock = false) {
    rotate(cube, blockElements, AXIES.y, undefined, timeRotating, antiClock);
}

function rotateZ(antiClock = false) {
    rotate(cube, blockElements, AXIES.z, undefined, timeRotating, antiClock);
}



let blockElementsToDrag;
let blockElementDraging;
let dragStartX = 0;
let dragStartY = 0;
let isDragingX = false;
let isDragingY = false;
let isDragingFront = false;
let isDraging = false;

function dragStart(event) {
    console.log(event.target);
    isDragingFront = event.target.classList.contains("face-front");
    if (isDragingFront) {
        isDraging = true;
        blockElementDraging = event.target.parentElement;
        dragStartX = event.screenX;
        dragStartY = event.screenY;
    }
}


function drag(event) {
    if (event.screenX == 0 && event.screenY == 0) return;
    let x = event.screenX - dragStartX;
    let y = event.screenY - dragStartY;

    if (isDraging) {
        if (isDragingFront) {
            console.log(x, y);
            let axisName = Math.abs(x) < Math.abs(y) ? 'x' : 'y';
            let side = blockElementDraging.dataset[axisName];
            let blockElementsToRotate = blockElements.filter(_ => parseInt(_.dataset[axisName]) == side);
            let move = Math.abs(x) < Math.abs(y) ? -y : x;
            blockElementsToRotate.forEach(blockElementToRotate => {
                blockElementToRotate.style.transform = `rotate${axisName.toUpperCase()}(${move}deg) ${getTranslate3d(blockElementToRotate, dimension)}`;
            });
        } else {

        }
    }
}

function dragEnd(event) {
    let x = event.screenX - dragStartX;
    let y = event.screenY - dragStartY;
    if (isDraging) {
        if (isDragingFront) {
            let axisName = Math.abs(x) < Math.abs(y) ? 'x' : 'y';
            let antiClock = Math.abs(x) < Math.abs(y) ? y > 0 : x < 0;
            let side = blockElementDraging.dataset[axisName];
            let blockElementsToRotate = blockElements.filter(_ => parseInt(_.dataset[axisName]) == side);
            rotate(cube, blockElementsToRotate, AXIES[axisName], side, timeRotating / 2, antiClock)
        }
    }
    isDraging = false;
}

// 
// function rotate(e, t) {
//     let n = [e[0], e[1]];
//     [...Array(t).keys()].forEach(() => {
//         n = [n[1] * -1, n[0]];
//     });
//     return n;
// }



// function createBlock(type, colors, x, y, z) {
//     var blockElement = document.getElementById("block").cloneNode(true);
//     blockElement.id = "";

//     blockElement.dataset.frontColor = colors.front || 'black';
//     blockElement.dataset.topColor = colors.top || 'black';
//     blockElement.dataset.leftColor = colors.left || 'black';
//     blockElement.dataset.backColor = colors.back || 'black';
//     blockElement.dataset.bottomColor = colors.bottom || 'black';
//     blockElement.dataset.rightColor = colors.right || 'black';

//     blockElement.dataset.type = type;
//     blockElement.dataset.x = x;
//     blockElement.dataset.y = y;
//     blockElement.dataset.z = z;

//     updateTranslate(blockElement);
//     updateFacesColor(blockElement);

//     return blockElement;
// }

// function updateTranslate(blockElement) {
//     let transform = "translate3d(";
//     transform += `calc(var(--block-size) * ${-0.5 + parseInt(blockElement.dataset.x)}),`;
//     transform += `calc(var(--block-size) * ${-0.5 + parseInt(blockElement.dataset.y)}),`;
//     transform += `calc(var(--block-size) * ${-parseInt(blockElement.dataset.z)}))`;
//     blockElement.style.transform = transform;
// }

// function updateFacesColor(blockElement) {
//     blockElement.querySelector('.face-front').style.backgroundColor = blockElement.dataset.frontColor;
//     blockElement.querySelector('.face-top').style.backgroundColor = blockElement.dataset.topColor;
//     blockElement.querySelector('.face-left').style.backgroundColor = blockElement.dataset.leftColor;
//     blockElement.querySelector('.face-back').style.backgroundColor = blockElement.dataset.backColor;
//     blockElement.querySelector('.face-bottom').style.backgroundColor = blockElement.dataset.bottomColor;
//     blockElement.querySelector('.face-right').style.backgroundColor = blockElement.dataset.rightColor;
// }



// let rotating = false
// let timeRotating = 0.2;

// function rotateBlocks(axis, side, antiClock = false) {
//     if (rotating) return;
//     rotating = true;

//     let blocksToRotate = blocks.filter(_ => side == undefined || parseInt(_.dataset[axis.toLowerCase()]) == side);

//     let move = (((side ?? 1) * (!antiClock ? -1 : 1)) + 4) % 4;
//     blocksToRotate.forEach(blockElement => {
//         blockElement.style.transform = `rotate${axis.toUpperCase()}(0deg) ${blockElement.style.transform}`;
//         blockElement.style.transition = `transform ${timeRotating}s ease-out`;
//         blockElement.style.transform = `rotate${axis.toUpperCase()}(${-move * 90}deg) ${blockElement.style.transform}`;
//     });

//     setTimeout(() => {
//         blocksToRotate.forEach(blockElement => {
//             let x = parseInt(blockElement.dataset.x);
//             let y = parseInt(blockElement.dataset.y);
//             let z = parseInt(blockElement.dataset.z);


//             let colorsOrder = [];
//             if (axis.toLowerCase() == 'x') {
//                 [y, z] = rotate([y, z], move);
//                 colorsOrder = ['front', 'bottom', 'back', 'top']
//             } else if (axis.toLowerCase() == 'y') {
//                 [z, x] = rotate([z, x], move);
//                 colorsOrder = ['front', 'left', 'back', 'right']
//             } else {
//                 [y, x] = rotate([y, x], move);
//                 colorsOrder = ['top', 'left', 'bottom', 'right']
//             }

//             blockElement.style.transition = "";
//             [
//                 blockElement.dataset[`${colorsOrder[0]}Color`],
//                 blockElement.dataset[`${colorsOrder[1]}Color`],
//                 blockElement.dataset[`${colorsOrder[2]}Color`],
//                 blockElement.dataset[`${colorsOrder[3]}Color`]
//             ] = [
//                     blockElement.dataset[`${colorsOrder[((0 - move) + 4) % 4]}Color`],
//                     blockElement.dataset[`${colorsOrder[((1 - move) + 4) % 4]}Color`],
//                     blockElement.dataset[`${colorsOrder[((2 - move) + 4) % 4]}Color`],
//                     blockElement.dataset[`${colorsOrder[((3 - move) + 4) % 4]}Color`]
//                 ];
//             blockElement.dataset.x = x;
//             blockElement.dataset.y = y;
//             blockElement.dataset.z = z;
//             updateTranslate(blockElement);
//             updateFacesColor(blockElement);
//         });
//         rotating = false;
//     }, timeRotating * 1010);
// }





// const blocks = [
//     cubeElement.appendChild(createBlock("center", { front: "orange" }, 0, 0, -1)),
//     cubeElement.appendChild(createBlock("center", { top: "yellow" }, 0, -1, 0)),
//     cubeElement.appendChild(createBlock("center", { left: "green" }, -1, 0, 0)),
//     cubeElement.appendChild(createBlock("center", { back: "red" }, 0, 0, 1)),
//     cubeElement.appendChild(createBlock("center", { bottom: "white" }, 0, 1, 0)),
//     cubeElement.appendChild(createBlock("center", { right: "blue" }, 1, 0, 0)),

//     cubeElement.appendChild(createBlock("edge", { front: "orange", top: "yellow" }, 0, -1, -1)),
//     cubeElement.appendChild(createBlock("edge", { front: "orange", left: "green" }, -1, 0, -1)),
//     cubeElement.appendChild(createBlock("edge", { front: "orange", bottom: "white" }, 0, 1, -1)),
//     cubeElement.appendChild(createBlock("edge", { front: "orange", right: "blue" }, 1, 0, -1)),

//     cubeElement.appendChild(createBlock("edge", { back: "red", top: "yellow" }, 0, -1, 1)),
//     cubeElement.appendChild(createBlock("edge", { back: "red", left: "green" }, -1, 0, 1)),
//     cubeElement.appendChild(createBlock("edge", { back: "red", bottom: "white" }, 0, 1, 1)),
//     cubeElement.appendChild(createBlock("edge", { back: "red", right: "blue" }, 1, 0, 1)),

//     cubeElement.appendChild(createBlock("edge", { top: "yellow", left: "green" }, -1, -1, 0)),
//     cubeElement.appendChild(createBlock("edge", { top: "yellow", right: "blue" }, 1, -1, 0)),
//     cubeElement.appendChild(createBlock("edge", { bottom: "white", left: "green" }, -1, 1, 0)),
//     cubeElement.appendChild(createBlock("edge", { bottom: "white", right: "blue" }, 1, 1, 0)),

//     cubeElement.appendChild(createBlock("corner", { front: "orange", top: "yellow", left: "green" }, -1, -1, -1)),
//     cubeElement.appendChild(createBlock("corner", { front: "orange", top: "yellow", right: "blue" }, 1, -1, -1)),
//     cubeElement.appendChild(createBlock("corner", { front: "orange", bottom: "white", right: "blue" }, 1, 1, -1)),
//     cubeElement.appendChild(createBlock("corner", { front: "orange", bottom: "white", left: "green" }, -1, 1, -1)),

//     cubeElement.appendChild(createBlock("corner", { back: "red", top: "yellow", left: "green" }, -1, -1, 1)),
//     cubeElement.appendChild(createBlock("corner", { back: "red", top: "yellow", right: "blue" }, 1, -1, 1)),
//     cubeElement.appendChild(createBlock("corner", { back: "red", bottom: "white", right: "blue" }, 1, 1, 1)),
//     cubeElement.appendChild(createBlock("corner", { back: "red", bottom: "white", left: "green" }, -1, 1, 1)),

// ];

function keypress(event) {
    if (event.key == 'a') rotateL();
    if (event.key == 'A') rotateL(true);
    if (event.key == 's') rotateF();
    if (event.key == 'S') rotateF(true);
    if (event.key == 'd') rotateR();
    if (event.key == 'D') rotateR(true);
    if (event.key == 'w') rotateU();
    if (event.key == 'W') rotateU(true);
    if (event.key == 'e') rotateB();
    if (event.key == 'E') rotateB(true);
    if (event.key == 'c') rotateD();
    if (event.key == 'C') rotateD(true);
    if (event.key == 'ArrowUp') rotateX();
    if (event.key == 'ArrowDown') rotateX(true);
    if (event.key == 'ArrowLeft') rotateY(true);
    if (event.key == 'ArrowRight') rotateY();
}