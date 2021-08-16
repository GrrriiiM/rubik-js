import { COLORS } from "../../objs/constants.js";
import { patternColors } from "../../objs/creator.js";
import { inverseKeyValue } from "../../objs/transformer.js";



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
    let color0;
    let color1;
    let color2;
    let color3;
    let color4;
    let color5;
    let color6;
    let color7;
    let color8;

    let scanColor0;
    let scanColor1;
    let scanColor2;
    let scanColor3;
    let scanColor4;
    let scanColor5;
    let scanColor6;
    let scanColor7;
    let scanColor8;

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
        scanColor0 = self.element.querySelector(".scan-color-0");
        scanColor1 = self.element.querySelector(".scan-color-1");
        scanColor2 = self.element.querySelector(".scan-color-2");
        scanColor3 = self.element.querySelector(".scan-color-3");
        scanColor4 = self.element.querySelector(".scan-color-4");
        scanColor5 = self.element.querySelector(".scan-color-5");
        scanColor6 = self.element.querySelector(".scan-color-6");
        scanColor7 = self.element.querySelector(".scan-color-7");
        scanColor8 = self.element.querySelector(".scan-color-8");

        self.element.querySelector(".button-next").onclick = nextSide;

        let a = [...Array(4).keys()];

        for (let r = 0; r <= 4; r++) {
            for (let g = 0; g <= 4; g++) {
                for (let b = 0; b <= 4; b++) {
                    let div = document.createElement("div");
                    div.classList.add("teste");
                    div.innerHTML = `${r} ${g} ${b}`;
                    div.style.backgroundColor = `rgb(${r * 64},${g * 64},${b * 64})`;
                    self.element.querySelector(".teste-area").appendChild(div);
                }
            }
        }

        nextSide();

        // tempContext = self.element.querySelector(".tempcanvas").getContext("2d");
        await openCamera();
    }

    let sidesColors = [
        [ "orange", "yellow", "green", "white", "blue" ],
        [ "blue", "yellow", "orange", "white", "red" ],
        [ "red", "yellow", "blue", "white", "green" ],
        [ "green", "yellow", "red", "white", "orange" ],
        [ "yellow", "red", "green", "orange", "blue" ],
        [ "white", "orange", "green", "red", "blue" ],
    ];
    let actualSide = -1;
    let scanSides = [0, 1, 2, 3, 4, 5];
    let scan = [];
    function nextSide() {
        if (actualSide >= 0) scanSides[actualSide] = scan.map(_ => _)
        if (actualSide>=5) {
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
        ["center","up","left", "down","right"].forEach((_,i ) => {
            let sidElement = self.element.querySelector(`.scan-overlay>.${_}`);
            sidElement.classList.remove(...colorsRef);
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

                    fillColor(scanColor0, 0, 0, 0);
                    fillColor(scanColor1, 1, 0, 1);
                    fillColor(scanColor2, 2, 0, 2);
                    fillColor(scanColor3, 0, 1, 3);
                    fillColor(scanColor4, 1, 1, 4);
                    fillColor(scanColor5, 2, 1, 5);
                    fillColor(scanColor6, 0, 2, 6);
                    fillColor(scanColor7, 1, 2, 7);
                    fillColor(scanColor8, 2, 2, 8);


                    // scanColor0.style.backgroundColor = `rgba(${color0[0]}, ${color0[1]}, ${color0[2]}, 1)`;
                    // scanColor1.style.backgroundColor = `rgba(${color1[0]}, ${color1[1]}, ${color1[2]}, 1)`;
                    // scanColor2.style.backgroundColor = `rgba(${color2[0]}, ${color2[1]}, ${color2[2]}, 1)`;
                    // scanColor3.style.backgroundColor = `rgba(${color3[0]}, ${color3[1]}, ${color3[2]}, 1)`;
                    // scanColor4.style.backgroundColor = `rgba(${color4[0]}, ${color4[1]}, ${color4[2]}, 1)`;
                    // scanColor5.style.backgroundColor = `rgba(${color5[0]}, ${color5[1]}, ${color5[2]}, 1)`;
                    // scanColor6.style.backgroundColor = `rgba(${color6[0]}, ${color6[1]}, ${color6[2]}, 1)`;
                    // scanColor7.style.backgroundColor = `rgba(${color7[0]}, ${color7[1]}, ${color7[2]}, 1)`;
                    // scanColor8.style.backgroundColor = `rgba(${color8[0]}, ${color8[1]}, ${color8[2]}, 1)`;

                    // tempContext.drawImage(canvasElement, sourceX, sourceY, sourceSize, sourceSize, 0, 0, videoWidth, videoHeight)
                    await new Promise(resolve => setTimeout(resolve, 1000/ 30))
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
        

        let sourceRange = 0.3;
        let borderSize = videoWidth * 0.2;
        let overlaySize = videoWidth;
        let sourceSize = overlaySize * 0.2;
        let sourceX = borderSize + x * sourceSize + sourceSize/2 - sourceSize*sourceRange/2;
        let sourceY = borderSize + y * sourceSize + sourceSize/2 - sourceSize*sourceRange/2;;
        sourceSize = sourceSize * sourceRange;
        let imageData = canvasContext.getImageData(sourceX, sourceY, sourceSize, sourceSize);
        let colors = imageData.data;
        let colorsR = [];
        let colorsG = [];
        let colorsB = [];
        for (let i = 0; i < colors.length; i += 4) {
            colorsR.push(colors[i]);
            colorsG.push(colors[i + 1]);
            colorsB.push(colors[i + 2]);
        }
        let colorRMean = Math.round(colorsR.reduce((a, b) => a + b, 0) / colorsR.length);
        let colorGMean = Math.round(colorsG.reduce((a, b) => a + b, 0) / colorsG.length);
        let colorBMean = Math.round(colorsB.reduce((a, b) => a + b, 0) / colorsB.length);

        let colorR = Math.min(Math.round(colorRMean / 64));
        let colorG = Math.min(Math.round(colorGMean / 64));
        let colorB = Math.min(Math.round(colorBMean / 64));

        

        try {
            let colorId = fixColors[colorR][colorG][colorB];
            let color = colorEntries[colorId].toLowerCase();
            scanColorElement.classList.remove(...colorsRef);
            scanColorElement.classList.add(color);
            scanColorElement.innerHTML = `${colorR} ${colorG} ${colorB}`;
            scan[position] = colorId;
        } catch (error) {
            //alert(error.name + ": " + error.message);
        }


    }

    let colorEntries = inverseKeyValue(COLORS);
    let colorsRef = Object.keys(COLORS).map(_ => _.toLowerCase());
    let fixColorsSize = [...Array(5).keys()]
    let fixColors = fixColorsSize.map(() => fixColorsSize.map(() => fixColorsSize.map(() => "")));



    fixColors[0][0][0] = COLORS.WHITE;
    fixColors[0][0][1] = COLORS.BLUE;
    fixColors[0][0][2] = COLORS.BLUE;
    fixColors[0][0][3] = COLORS.BLUE;
    fixColors[0][0][4] = COLORS.BLUE;
    fixColors[0][1][0] = COLORS.GREEN;
    fixColors[0][1][1] = COLORS.GREEN;
    fixColors[0][1][2] = COLORS.BLUE;
    fixColors[0][1][3] = COLORS.BLUE;
    fixColors[0][1][4] = COLORS.BLUE;
    fixColors[0][2][0] = COLORS.GREEN;
    fixColors[0][2][1] = COLORS.GREEN;
    fixColors[0][2][2] = COLORS.GREEN;
    fixColors[0][2][3] = COLORS.BLUE;
    fixColors[0][2][4] = COLORS.BLUE;
    fixColors[0][3][0] = COLORS.GREEN;
    fixColors[0][3][1] = COLORS.GREEN;
    fixColors[0][3][2] = COLORS.GREEN;
    fixColors[0][3][3] = COLORS.WHITE;
    fixColors[0][3][4] = COLORS.WHITE;
    fixColors[0][4][0] = COLORS.GREEN;
    fixColors[0][4][1] = COLORS.GREEN;
    fixColors[0][4][2] = COLORS.GREEN;
    fixColors[0][4][3] = COLORS.WHITE;
    fixColors[0][4][4] = COLORS.WHITE;
    fixColors[1][0][0] = COLORS.RED;
    fixColors[1][0][1] = COLORS.RED;
    fixColors[1][0][2] = COLORS.BLUE;
    fixColors[1][0][3] = COLORS.BLUE;
    fixColors[1][0][4] = COLORS.BLUE;
    fixColors[1][1][0] = COLORS.YELLOW;
    fixColors[1][1][1] = COLORS.YELLOW;
    fixColors[1][1][2] = COLORS.BLUE;
    fixColors[1][1][3] = COLORS.BLUE;
    fixColors[1][1][4] = COLORS.BLUE;
    fixColors[1][2][0] = COLORS.YELLOW;
    fixColors[1][2][1] = COLORS.YELLOW;
    fixColors[1][2][2] = COLORS.WHITE;
    fixColors[1][2][3] = COLORS.WHITE;
    fixColors[1][2][4] = COLORS.WHITE;
    fixColors[1][3][0] = COLORS.GREEN;
    fixColors[1][3][1] = COLORS.GREEN;
    fixColors[1][3][2] = COLORS.GREEN;
    fixColors[1][3][3] = COLORS.WHITE;
    fixColors[1][3][4] = COLORS.WHITE;
    fixColors[1][4][0] = COLORS.GREEN;
    fixColors[1][4][1] = COLORS.GREEN;
    fixColors[1][4][2] = COLORS.GREEN;
    fixColors[1][4][3] = COLORS.WHITE;
    fixColors[1][4][4] = COLORS.WHITE;
    fixColors[2][0][0] = COLORS.RED;
    fixColors[2][0][1] = COLORS.RED;
    fixColors[2][0][2] = COLORS.RED;
    fixColors[2][0][3] = COLORS.BLUE;
    fixColors[2][0][4] = COLORS.WHITE;
    fixColors[2][1][0] = COLORS.YELLOW;
    fixColors[2][1][1] = COLORS.RED;
    fixColors[2][1][2] = COLORS.RED;
    fixColors[2][1][3] = COLORS.BLUE;
    fixColors[2][1][4] = COLORS.BLUE;
    fixColors[2][2][0] = COLORS.YELLOW;
    fixColors[2][2][1] = COLORS.YELLOW;
    fixColors[2][2][2] = COLORS.WHITE;
    fixColors[2][2][3] = COLORS.WHITE;
    fixColors[2][2][4] = COLORS.WHITE;
    fixColors[2][3][0] = COLORS.YELLOW;
    fixColors[2][3][1] = COLORS.YELLOW;
    fixColors[2][3][2] = COLORS.YELLOW;
    fixColors[2][3][3] = COLORS.WHITE;
    fixColors[2][3][4] = COLORS.WHITE;
    fixColors[2][4][0] = COLORS.YELLOW;
    fixColors[2][4][1] = COLORS.YELLOW;
    fixColors[2][4][2] = COLORS.YELLOW;
    fixColors[2][4][3] = COLORS.WHITE;
    fixColors[2][4][4] = COLORS.WHITE;
    fixColors[3][0][0] = COLORS.RED;
    fixColors[3][0][1] = COLORS.RED;
    fixColors[3][0][2] = COLORS.RED;
    fixColors[3][0][3] = COLORS.RED;
    fixColors[3][0][4] = COLORS.WHITE;
    fixColors[3][1][0] = COLORS.ORANGE;
    fixColors[3][1][1] = COLORS.ORANGE;
    fixColors[3][1][2] = COLORS.RED;
    fixColors[3][1][3] = COLORS.BLUE;
    fixColors[3][1][4] = COLORS.WHITE;
    fixColors[3][2][0] = COLORS.YELLOW;
    fixColors[3][2][1] = COLORS.ORANGE;
    fixColors[3][2][2] = COLORS.ORANGE;
    fixColors[3][2][3] = COLORS.BLUE;
    fixColors[3][2][4] = COLORS.WHITE;
    fixColors[3][3][0] = COLORS.YELLOW;
    fixColors[3][3][1] = COLORS.YELLOW;
    fixColors[3][3][2] = COLORS.YELLOW;
    fixColors[3][3][3] = COLORS.WHITE;
    fixColors[3][3][4] = COLORS.WHITE;
    fixColors[3][4][0] = COLORS.YELLOW;
    fixColors[3][4][1] = COLORS.YELLOW;
    fixColors[3][4][2] = COLORS.YELLOW;
    fixColors[3][4][3] = COLORS.WHITE;
    fixColors[3][4][4] = COLORS.WHITE;
    fixColors[4][0][0] = COLORS.RED;
    fixColors[4][0][1] = COLORS.RED;
    fixColors[4][0][2] = COLORS.RED;
    fixColors[4][0][3] = COLORS.RED;
    fixColors[4][0][4] = COLORS.WHITE;
    fixColors[4][1][0] = COLORS.ORANGE;
    fixColors[4][1][1] = COLORS.ORANGE;
    fixColors[4][1][2] = COLORS.RED;
    fixColors[4][1][3] = COLORS.RED;
    fixColors[4][1][4] = COLORS.WHITE;
    fixColors[4][2][0] = COLORS.ORANGE;
    fixColors[4][2][1] = COLORS.ORANGE;
    fixColors[4][2][2] = COLORS.ORANGE;
    fixColors[4][2][3] = COLORS.ORANGE;
    fixColors[4][2][4] = COLORS.WHITE;
    fixColors[4][3][0] = COLORS.YELLOW;
    fixColors[4][3][1] = COLORS.YELLOW;
    fixColors[4][3][2] = COLORS.YELLOW;
    fixColors[4][3][3] = COLORS.WHITE;
    fixColors[4][3][4] = COLORS.WHITE;
    fixColors[4][4][0] = COLORS.YELLOW;
    fixColors[4][4][1] = COLORS.YELLOW;
    fixColors[4][4][2] = COLORS.YELLOW;
    fixColors[4][4][3] = COLORS.WHITE;
    fixColors[4][4][4] = COLORS.WHITE;




    return self;
}




