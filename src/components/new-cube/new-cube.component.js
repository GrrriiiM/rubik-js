import { COLORS, SIDES } from "../../objs/constants.js";
import { createCube, createCubeWithPattern, patternColors } from "../../objs/creator.js";
import { findCubeSideByColor } from "../../objs/finder.js";
import { rotateCubeFromTo, rotateMovementsFromTo, shuffleCube } from "../../objs/rotator.js";
import { cubeToPattern, inverseKeyValue } from "../../objs/transformer.js";
import modalComponent from "../modal/modal.component.js";
import { scanComponent } from "../scan/scan.component.js";

export function newCubeComponent(onFinished) {
    let self = {
        className: "new-cube",
        element: null,
        render,
        onFinished
    }
    let selectedSide = SIDES.FRONT;
    let modal = modalComponent();

    let sides = {
        "front": SIDES.FRONT,
        "up": SIDES.UP,
        "left": SIDES.LEFT,
        "back": SIDES.BACK,
        "down": SIDES.DOWN,
        "right": SIDES.RIGHT
    }

    let sidesEntries = inverseKeyValue(SIDES);
    let colorsEntries = inverseKeyValue(COLORS);
    let colorsClass = Object.entries(colorsEntries).map(_ => _[1].toLowerCase());
    let colorOrderSides = [SIDES.FRONT, SIDES.RIGHT, SIDES.BACK, SIDES.LEFT, SIDES.UP, SIDES.DOWN];
    let colors = colorOrderSides.map(_ => [0, 0, 0, 0, _, 0, 0, 0, 0]);

    async function render(parentElement) {
        let response = await fetch("./components/new-cube/new-cube.component.html");
        self.element = parentElement.querySelector(`.${self.className}`)
        self.element.innerHTML = await response.text();

        self.element.querySelectorAll(".preview-side").forEach(el => {
            el.onclick = () => {
                self.element.querySelectorAll(".preview-side").forEach(_ => _.classList.remove("selected"));
                el.classList.add("selected");
                for (let side of Object.entries(sides)) {
                    if (el.classList.contains(side[0])) {
                        selectedSide = side[1];
                        break;
                    }
                }
            }
        })

        self.element.querySelector(".option-button-scan").onclick = () => {
            modal.show("Escanear", scanComponent([selectedSide], scanColors => {
                colors[inverseKeyValue(colorOrderSides)[selectedSide]] = scanColors[0];
                colors[inverseKeyValue(colorOrderSides)[selectedSide]][4] = selectedSide;
                updateColors();
                modal.hide();
            }));
        }

        self.element.querySelector(".option-button-random").onclick = () => {
            let cube = shuffleCube(createCube(3));
            // let cube = createCubeWithPattern("ROOUWYRUGURGRUWWUUOGGYORUOGOWYYYUWRRYWOGGGYYUWOWGROYWR");
            console.log(cubeToPattern(cube).substring(4,5), cubeToPattern(cube).substring(13,14));
            console.log(cubeToPattern(cube));
            console.log(cubeToPattern(cube).substring(4,5), cubeToPattern(cube).substring(13,14));
            cube = rotateCubeFromTo(cube, findCubeSideByColor(cube, COLORS.ORANGE), SIDES.FRONT);
            console.log(cubeToPattern(cube));
            console.log(cubeToPattern(cube).substring(4,5), cubeToPattern(cube).substring(13,14));
            cube = rotateCubeFromTo(cube, findCubeSideByColor(cube, COLORS.YELLOW), SIDES.UP);
            let cubePattern = cubeToPattern(cube);
            console.log(cubeToPattern(cube));
            console.log(cubeToPattern(cube).substring(4,5), cubeToPattern(cube).substring(13,14));
            cubePattern = cubePattern.split("");
            for(let i = 1; i<=6; i++) {
                let sideColors = cubePattern.splice(0, 9).map(_ => patternColors[_]);
                let side = sideColors[4];
                let order = inverseKeyValue(colorOrderSides)[side];
                colors[order] = sideColors;
            }
            updateColors();
        }


        

        self.element.querySelector(".option-button-accept").onclick = () => {
            let pcolors = inverseKeyValue(patternColors);
            let cubePattern = colors[0].map(_ => pcolors[_]).join("");
            cubePattern += colors[4].map(_ => pcolors[_]).join("");
            cubePattern += colors[3].map(_ => pcolors[_]).join("");
            cubePattern += colors[2].map(_ => pcolors[_]).join("");
            cubePattern += colors[5].map(_ => pcolors[_]).join("");
            cubePattern += colors[1].map(_ => pcolors[_]).join("");
            self.onFinished && self.onFinished(cubePattern)
            return;
        }
    }

    function updateColors() {
        Object.entries(sides).forEach((side, i) => {
            let sideColors = colors[inverseKeyValue(colorOrderSides)[side[1]]]
            self.element.querySelectorAll(`.preview-side.${side[0]}>.block`).forEach((el, i) => {
                // if (!el.classList.contains("center")) {
                    el.classList.remove(...colorsClass);
                    el.classList.add(colorsClass[sideColors[i]]);
                // }
            });
        })

    }

    return self;
}
