import { COLORS } from "../../objs/constants.js";
import { patternColors } from "../../objs/creator.js";
import { inverseKeyValue } from "../../objs/transformer.js";
import { pallete, rgbToColor } from "./color-converter.js";



export function scanComponent() {
    let self = {
        className: "scan",
        element: null,
        render,
        onFinished: null
    };

    let videoElement;
    let canvasElement;
    let canvasContext;
    let videoWidth = Math.min(window.screen.width - 40, 320);
    let videoHeight = videoWidth;

    let scanColor0Element;
    let scanColor1Element;
    let scanColor2Element;
    let scanColor3Element;
    let scanColor4Element;
    let scanColor5Element;
    let scanColor6Element;
    let scanColor7Element;
    let scanColor8Element;

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
        scanColor0Element = self.element.querySelector(".scan-color-0");
        scanColor1Element = self.element.querySelector(".scan-color-1");
        scanColor2Element = self.element.querySelector(".scan-color-2");
        scanColor3Element = self.element.querySelector(".scan-color-3");
        scanColor4Element = self.element.querySelector(".scan-color-4");
        scanColor5Element = self.element.querySelector(".scan-color-5");
        scanColor6Element = self.element.querySelector(".scan-color-6");
        scanColor7Element = self.element.querySelector(".scan-color-7");
        scanColor8Element = self.element.querySelector(".scan-color-8");

        self.element.querySelector(".button-next").onclick = nextSide;

        let a = [...Array(4).keys()];

        let hexs = Object.keys(pallete);
        for (let r = 0; r <= 5; r++) {
            for (let g = 0; g <= 5; g++) {
                for (let b = 0; b <= 5; b++) {
                    let r1 = r*51;
                    let g1 = g*51;
                    let b1 = b*51;
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

        nextSide();

        await openCamera();
    }

    let sidesColors = [
        ["orange", "yellow", "green", "white", "blue"],
        ["blue", "yellow", "orange", "white", "red"],
        ["red", "yellow", "blue", "white", "green"],
        ["green", "yellow", "red", "white", "orange"],
        ["yellow", "red", "green", "orange", "blue"],
        ["white", "orange", "green", "red", "blue"],
    ];
    let actualSide = -1;
    let scanSides = [0, 1, 2, 3, 4, 5];
    let scan = [];
    function nextSide() {
        if (actualSide >= 0) scanSides[actualSide] = scan.map(_ => _)
        if (actualSide >= 5) {
            let pcolors = inverseKeyValue(patternColors);
            let cubePattern = scanSides[0].map(_ => pcolors[_]).join("");
            cubePattern += scanSides[4].map(_ => pcolors[_]).join("");
            cubePattern += scanSides[3].map(_ => pcolors[_]).join("");
            cubePattern += scanSides[2].map(_ => pcolors[_]).join("");
            cubePattern += scanSides[5].map(_ => pcolors[_]).join("");
            cubePattern += scanSides[1].map(_ => pcolors[_]).join("");
            self.onFinished && self.onFinished(cubePattern)
            return;
        }
        actualSide += 1;
        ["center", "up", "left", "down", "right"].forEach((_, i) => {
            let sidElement = self.element.querySelector(`.scan-overlay>.${_}`);
            sidElement.classList.remove(...colorsClass);
            sidElement.classList.add(sidesColors[actualSide][i]);
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

                    fillColor(scanColor0Element, 0, 0, 0);
                    fillColor(scanColor1Element, 1, 0, 1);
                    fillColor(scanColor2Element, 2, 0, 2);
                    fillColor(scanColor3Element, 0, 1, 3);
                    fillColor(scanColor4Element, 1, 1, 4);
                    fillColor(scanColor5Element, 2, 1, 5);
                    fillColor(scanColor6Element, 0, 2, 6);
                    fillColor(scanColor7Element, 1, 2, 7);
                    fillColor(scanColor8Element, 2, 2, 8);

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

    function fillColor(scanColorElement, x, y, position) {

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

            let colorClass = colorEntries[color].toLowerCase()

            scanColorElement.classList.remove(...colorsClass);
            scanColorElement.classList.add(colorClass);
            // scanColorElement.innerHTML = `${colorR} ${colorG} ${colorB}`;
            scan[position] = color;
        } catch (error) {
            // alert(error.name + ": " + error.message);
        }


    }

    let colorEntries = inverseKeyValue(COLORS);
    let colorsClass = Object.keys(COLORS).map(_ => _.toLowerCase());




    // let fixColorsSize = [...Array(5).keys()]
    // let fixColors = fixColorsSize.map(() => fixColorsSize.map(() => fixColorsSize.map(() => "")));



    // fixColors[0][0][0] = COLORS.WHITE;
    // fixColors[0][0][1] = COLORS.BLUE;
    // fixColors[0][0][2] = COLORS.BLUE;
    // fixColors[0][0][3] = COLORS.BLUE;
    // fixColors[0][0][4] = COLORS.BLUE;
    // fixColors[0][1][0] = COLORS.GREEN;
    // fixColors[0][1][1] = COLORS.GREEN;
    // fixColors[0][1][2] = COLORS.BLUE;
    // fixColors[0][1][3] = COLORS.BLUE;
    // fixColors[0][1][4] = COLORS.BLUE;
    // fixColors[0][2][0] = COLORS.GREEN;
    // fixColors[0][2][1] = COLORS.GREEN;
    // fixColors[0][2][2] = COLORS.GREEN;
    // fixColors[0][2][3] = COLORS.BLUE;
    // fixColors[0][2][4] = COLORS.BLUE;
    // fixColors[0][3][0] = COLORS.GREEN;
    // fixColors[0][3][1] = COLORS.GREEN;
    // fixColors[0][3][2] = COLORS.GREEN;
    // fixColors[0][3][3] = COLORS.WHITE;
    // fixColors[0][3][4] = COLORS.WHITE;
    // fixColors[0][4][0] = COLORS.GREEN;
    // fixColors[0][4][1] = COLORS.GREEN;
    // fixColors[0][4][2] = COLORS.GREEN;
    // fixColors[0][4][3] = COLORS.WHITE;
    // fixColors[0][4][4] = COLORS.WHITE;
    // fixColors[1][0][0] = COLORS.RED;
    // fixColors[1][0][1] = COLORS.RED;
    // fixColors[1][0][2] = COLORS.BLUE;
    // fixColors[1][0][3] = COLORS.BLUE;
    // fixColors[1][0][4] = COLORS.BLUE;
    // fixColors[1][1][0] = COLORS.YELLOW;
    // fixColors[1][1][1] = COLORS.YELLOW;
    // fixColors[1][1][2] = COLORS.BLUE;
    // fixColors[1][1][3] = COLORS.BLUE;
    // fixColors[1][1][4] = COLORS.BLUE;
    // fixColors[1][2][0] = COLORS.YELLOW;
    // fixColors[1][2][1] = COLORS.YELLOW;
    // fixColors[1][2][2] = COLORS.WHITE;
    // fixColors[1][2][3] = COLORS.WHITE;
    // fixColors[1][2][4] = COLORS.WHITE;
    // fixColors[1][3][0] = COLORS.GREEN;
    // fixColors[1][3][1] = COLORS.GREEN;
    // fixColors[1][3][2] = COLORS.GREEN;
    // fixColors[1][3][3] = COLORS.WHITE;
    // fixColors[1][3][4] = COLORS.WHITE;
    // fixColors[1][4][0] = COLORS.GREEN;
    // fixColors[1][4][1] = COLORS.GREEN;
    // fixColors[1][4][2] = COLORS.GREEN;
    // fixColors[1][4][3] = COLORS.WHITE;
    // fixColors[1][4][4] = COLORS.WHITE;
    // fixColors[2][0][0] = COLORS.RED;
    // fixColors[2][0][1] = COLORS.RED;
    // fixColors[2][0][2] = COLORS.RED;
    // fixColors[2][0][3] = COLORS.BLUE;
    // fixColors[2][0][4] = COLORS.WHITE;
    // fixColors[2][1][0] = COLORS.YELLOW;
    // fixColors[2][1][1] = COLORS.RED;
    // fixColors[2][1][2] = COLORS.RED;
    // fixColors[2][1][3] = COLORS.BLUE;
    // fixColors[2][1][4] = COLORS.BLUE;
    // fixColors[2][2][0] = COLORS.YELLOW;
    // fixColors[2][2][1] = COLORS.YELLOW;
    // fixColors[2][2][2] = COLORS.WHITE;
    // fixColors[2][2][3] = COLORS.WHITE;
    // fixColors[2][2][4] = COLORS.WHITE;
    // fixColors[2][3][0] = COLORS.YELLOW;
    // fixColors[2][3][1] = COLORS.YELLOW;
    // fixColors[2][3][2] = COLORS.YELLOW;
    // fixColors[2][3][3] = COLORS.WHITE;
    // fixColors[2][3][4] = COLORS.WHITE;
    // fixColors[2][4][0] = COLORS.YELLOW;
    // fixColors[2][4][1] = COLORS.YELLOW;
    // fixColors[2][4][2] = COLORS.YELLOW;
    // fixColors[2][4][3] = COLORS.WHITE;
    // fixColors[2][4][4] = COLORS.WHITE;
    // fixColors[3][0][0] = COLORS.RED;
    // fixColors[3][0][1] = COLORS.RED;
    // fixColors[3][0][2] = COLORS.RED;
    // fixColors[3][0][3] = COLORS.RED;
    // fixColors[3][0][4] = COLORS.WHITE;
    // fixColors[3][1][0] = COLORS.ORANGE;
    // fixColors[3][1][1] = COLORS.ORANGE;
    // fixColors[3][1][2] = COLORS.RED;
    // fixColors[3][1][3] = COLORS.BLUE;
    // fixColors[3][1][4] = COLORS.WHITE;
    // fixColors[3][2][0] = COLORS.YELLOW;
    // fixColors[3][2][1] = COLORS.ORANGE;
    // fixColors[3][2][2] = COLORS.ORANGE;
    // fixColors[3][2][3] = COLORS.BLUE;
    // fixColors[3][2][4] = COLORS.WHITE;
    // fixColors[3][3][0] = COLORS.YELLOW;
    // fixColors[3][3][1] = COLORS.YELLOW;
    // fixColors[3][3][2] = COLORS.YELLOW;
    // fixColors[3][3][3] = COLORS.WHITE;
    // fixColors[3][3][4] = COLORS.WHITE;
    // fixColors[3][4][0] = COLORS.YELLOW;
    // fixColors[3][4][1] = COLORS.YELLOW;
    // fixColors[3][4][2] = COLORS.YELLOW;
    // fixColors[3][4][3] = COLORS.WHITE;
    // fixColors[3][4][4] = COLORS.WHITE;
    // fixColors[4][0][0] = COLORS.RED;
    // fixColors[4][0][1] = COLORS.RED;
    // fixColors[4][0][2] = COLORS.RED;
    // fixColors[4][0][3] = COLORS.RED;
    // fixColors[4][0][4] = COLORS.WHITE;
    // fixColors[4][1][0] = COLORS.ORANGE;
    // fixColors[4][1][1] = COLORS.ORANGE;
    // fixColors[4][1][2] = COLORS.RED;
    // fixColors[4][1][3] = COLORS.RED;
    // fixColors[4][1][4] = COLORS.WHITE;
    // fixColors[4][2][0] = COLORS.ORANGE;
    // fixColors[4][2][1] = COLORS.ORANGE;
    // fixColors[4][2][2] = COLORS.ORANGE;
    // fixColors[4][2][3] = COLORS.ORANGE;
    // fixColors[4][2][4] = COLORS.WHITE;
    // fixColors[4][3][0] = COLORS.YELLOW;
    // fixColors[4][3][1] = COLORS.YELLOW;
    // fixColors[4][3][2] = COLORS.YELLOW;
    // fixColors[4][3][3] = COLORS.WHITE;
    // fixColors[4][3][4] = COLORS.WHITE;
    // fixColors[4][4][0] = COLORS.YELLOW;
    // fixColors[4][4][1] = COLORS.YELLOW;
    // fixColors[4][4][2] = COLORS.YELLOW;
    // fixColors[4][4][3] = COLORS.WHITE;
    // fixColors[4][4][4] = COLORS.WHITE;




    return self;
}




