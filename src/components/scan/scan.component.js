import { COLORS, SIDES } from "../../objs/constants.js";
import { patternColors } from "../../objs/creator.js";
import { findMovementFromTo } from "../../objs/finder.js";
import { MOVEMENTS } from "../../objs/movements.js";
import { rotateMovementsFromTo, rotateSide } from "../../objs/rotator.js";
import { inverseKeyValue } from "../../objs/transformer.js";
import { pallete, rgbToColor } from "./color-converter.js";



export function scanComponent(scanOrderSides, onFinished) {
    let self = {
        className: "scan",
        element: null,
        render,
        onFinished: null
    };

    let videoElement;
    let canvasElement;
    let canvasContext;
    let videoWidth = Math.min(window.screen.width - 40, window.screen.width*0.6);
    let videoHeight = videoWidth;

    let scanColorElements = [];

    // let scanOrderSides = [SIDES.FRONT, SIDES.RIGHT, SIDES.BACK, SIDES.LEFT, SIDES.UP, SIDES.DOWN];
    let scanColors = scanOrderSides.map(_ => [0, 0, 0, 0, 0, 0]);
    let scanSidePosition = 0;

    let colorEntries = inverseKeyValue(COLORS);
    let sideEntries = inverseKeyValue(SIDES);
    let colorsClass = Object.entries(colorEntries).map(_ => _[1].toLowerCase());

    let tempContext;
    async function render(parentElement) {
        let response = await fetch("./components/scan/scan.component.html");
        self.element = parentElement.querySelector(`.${self.className}`);
        self.element.innerHTML = await response.text();
        videoElement = self.element.querySelector(".video");
        canvasElement = self.element.querySelector(".canvas");
        canvasElement.height = videoHeight;
        canvasElement.width = videoWidth;
        canvasContext = canvasElement.getContext('2d');
        [...Array(9).keys()].forEach(_ => {
            scanColorElements.push(self.element.querySelector(`.scan-color-${_}`));
        })
        

        self.element.querySelector(".button-next").onclick = nextScanSide;

        let a = [...Array(4).keys()];

        let hexs = Object.keys(pallete);
        for (let r = 0; r <= 5; r++) {
            for (let g = 0; g <= 5; g++) {
                for (let b = 0; b <= 5; b++) {
                    let r1 = r * 51;
                    let g1 = g * 51;
                    let b1 = b * 51;
                    let hex = `#${r1.toString(16).padStart(2, "0").toUpperCase()}${g1.toString(16).padStart(2, "0").toUpperCase()}${b1.toString(16).padStart(2, "0").toUpperCase()}`;
                    if (!hexs.includes(hex)) {
                        let div = document.createElement("div");
                        div.style.backgroundColor = hex;
                        div.classList.add("teste");
                        div.innerHTML = hex;
                        self.element.querySelector(".teste-area").appendChild(div);
                    }
                }
            }
        }

        updateScanSide();

        await openCamera();
    }


    function nextScanSide() {
        scanSidePosition+=1;
        if (scanSidePosition >= scanOrderSides.length) {
            onFinished && onFinished(scanColors);
            videoElement.pause();
            return;
        };
        
        updateScanSide();

        // if (actualSide >= 5) {
        //     let pcolors = inverseKeyValue(patternColors);
        //     let cubePattern = scanSides[0].map(_ => pcolors[_]).join("");
        //     cubePattern += scanSides[4].map(_ => pcolors[_]).join("");
        //     cubePattern += scanSides[3].map(_ => pcolors[_]).join("");
        //     cubePattern += scanSides[2].map(_ => pcolors[_]).join("");
        //     cubePattern += scanSides[5].map(_ => pcolors[_]).join("");
        //     cubePattern += scanSides[1].map(_ => pcolors[_]).join("");
        //     self.onFinished && self.onFinished(cubePattern)
        //     return;
        // }
        // actualSide += 1;
        // ["center", "up", "left", "down", "right"].forEach((_, i) => {
        //     let sidElement = self.element.querySelector(`.scan-overlay>.${_}`);
        //     sidElement.classList.remove(...colorsClass);
        //     sidElement.classList.add(sidesColors[actualSide][i]);
        // });
    }

    function updateScanSide() {
        let movements = findMovementFromTo(SIDES.FRONT, scanOrderSides[scanSidePosition]);
        let sides = Object.values(SIDES);
        sides.forEach((side, i) => {
            movements.forEach(_ => sides[i] = rotateSide(_.axis, sides[i], _.clock))
        });

        self.element.querySelectorAll(`.scan-overlay>div`).forEach(_ => _.classList.remove(...colorsClass));

        [SIDES.FRONT, SIDES.RIGHT, SIDES.LEFT, SIDES.UP, SIDES.DOWN].forEach(side => {
            let colorName = colorEntries[sides[side]].toLowerCase();
            let sideName = sideEntries[side].toLowerCase();
            self.element.querySelector(`.scan-overlay>.${sideName}`).classList.add(colorName);
        });
    }

    

    async function openCamera() {
        let constraints = {
            audio: false,
            video: {
                height: videoHeight,
                width: videoWidth,
                facingMode: "environment"
            }
        };
        try {
            let mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
            videoElement.onplay = async () => {
                while (!videoElement.paused && !videoElement.ended) {

                    canvasContext.drawImage(videoElement, 0, 0);
                    let scanColor = scanColors[scanSidePosition];
                    scanColor[0] = getColor(0, 0);
                    scanColor[1] = getColor(1, 0);
                    scanColor[2] = getColor(2, 0);
                    scanColor[3] = getColor(0, 1);
                    scanColor[4] = getColor(1, 1);
                    scanColor[5] = getColor(2, 1);
                    scanColor[6] = getColor(0, 2);
                    scanColor[7] = getColor(1, 2);
                    scanColor[8] = getColor(2, 2);

                    scanColor.forEach((_, i) => {
                        let scanColorElement = scanColorElements[i]
                        let colorClass = colorEntries[_].toLowerCase()
                        scanColorElement.classList.remove(...colorsClass);
                        scanColorElement.classList.add(colorClass);
                    })
                    

                    // tempContext.drawImage(canvasElement, sourceX, sourceY, sourceSize, sourceSize, 0, 0, videoWidth, videoHeight)
                    await new Promise(resolve => setTimeout(resolve, 1000 / 30))
                }
            }

            videoElement.srcObject = mediaStream;
            videoElement.onloadedmetadata = function (e) {
                videoElement.play();
            };
        } catch (error) {
            alert(error.name + ": " + error.message);
        }
    }

    function getColor(x, y) {

        try {
            let sourceRange = 0.2;
            let borderSize = videoWidth * 0.2;
            let overlaySize = videoWidth;
            let sourceSize = overlaySize * 0.2;
            let sourceX = borderSize + x * sourceSize + sourceSize / 2 - sourceSize * sourceRange / 2;
            let sourceY = borderSize + y * sourceSize + sourceSize / 2 - sourceSize * sourceRange / 2;;
            sourceSize = sourceSize * sourceRange;

            let imageData = canvasContext.getImageData(sourceX, sourceY, sourceSize, sourceSize);
            // self.element.querySelector(".tempcanvas").height = sourceSize;
            // self.element.querySelector(".tempcanvas").width = sourceSize;
            // self.element.querySelector(".tempcanvas").getContext("2d").drawImage(canvasElement, sourceX, sourceY, sourceSize, sourceSize, 0,0,sourceSize,sourceSize);
            let imageDataColors = imageData.data;
            let colors = {};
            let color = 0;
            for (let i = 0; i < imageDataColors.length; i += 4) {
                let imageDataColor = rgbToColor(imageDataColors[i], imageDataColors[i + 1], imageDataColors[i + 2]);
                colors[imageDataColor] = (colors[color] || 0) + 1;
                if (colors[imageDataColor] > (colors[color] || 0)) {
                    color = imageDataColor;
                }
            }

            return color;
            
        } catch (error) {
            // alert(error.name + ": " + error.message);
        }


    }

    




    return self;
}




