import { COLORS } from "../../objs/constants.js";

export function rgbToColor(r, g, b) {
    let r1 = Math.min(Math.round(r / 51) * 51, 255);
    let g1 = Math.min(Math.round(g / 51) * 51, 255);
    let b1 = Math.min(Math.round(b / 51) * 51, 255);

    let hex = `#${r1.toString(16).padStart(2, "0").toUpperCase()}${g1.toString(16).padStart(2, "0").toUpperCase()}${b1.toString(16).padStart(2, "0").toUpperCase()}`;
    let color = pallete[hex];
    if (!color) console.log(hex);
    return color || COLORS.BLACK;
}


let red = [];
let orange = [];
let yellow = [];
let green = [];
let blue = [];
let white = [];




orange.push(...[
    "#331900",
    "#663300",
    "#994C00",
    "#CC6600",
    "#FF8000",
    "#FF9933",
    "#FFB266",
    "#FFCC99",
    "#FFE5CC",
    "#663333",
    "#993333",
    "#996600",
    "#996633",
    "#996699",
    "#CC6633",
    "#CC6666",
    "#CC6699",
    "#CC9900",
    "#CC9933",
    "#CC9966",
    "#CC9999",
    "#FF6600",
    "#FF6633",
    "#FF6699",
    "#FF9900",
    "#FF9966"
]);

yellow.push(...[
    "#333300",
    "#666600",
    "#999900",
    "#CCCC00",
    "#FFFF00",
    "#FFFF33",
    "#FFFF66",
    "#FFFF99",
    "#FFFFCC",
    "#666633",
    "#669900",
    "#669933",
    "#669966",
    "#66FF00",
    "#66FF33",
    "#66FF99",
    "#999933",
    "#999966",
    "#99CC00",
    "#99CC33",
    "#99CC66",
    "#99CC99",
    "#99FF00",
    "#99FF66",
    "#CCCC33",
    "#CCCC66",
    "#CCCC99",
    "#CCFF00",
    "#CCFF33",
    "#CCFF66",
    "#FFCC00",
    "#FFCC33",
    "#FFCC66"

]);

green.push(...[
    "#193300",
    "#336600",
    "#4C9900",
    "#66CC00",
    "#80FF00",
    "#99FF33",
    "#B2FF66",
    "#CCFF99",
    "#E5FFCC",
    "#003300",
    "#006600",
    "#009900",
    "#00CC00",
    "#00FF00",
    "#33FF33",
    "#66FF66",
    "#99FF99",
    "#CCFFCC",
    "#003319",
    "#006633",
    "#00994C",
    "#00CC66",
    "#00FF80",
    "#33FF99",
    "#66FFB2",
    "#99FFCC",
    "#CCFFE5",
    "#009933",
    "#009966",
    "#00CC33",
    "#00CC99",
    "#00FF33",
    "#00FF66",
    "#00FF99",
    "#00FFCC",
    "#336633",
    "#336666",
    "#339900",
    "#339933",
    "#339966",
    "#339999",
    "#3399CC",
    "#33CC00",
    "#33CC33",
    "#33CC66",
    "#33CC99",
    "#33CCCC",
    "#33FF00",
    "#33FF66",
    "#33FFCC",
    "#663366",
    "#66CC33",
    "#66CC66",
    "#66CC99",
    "#66CCCC"
]);

blue.push(...[
    "#003333",
    "#006666",
    "#009999",
    "#00CCCC",
    "#00FFFF",
    "#33FFFF",
    "#66FFFF",
    "#99FFFF",
    "#CCFFFF",
    "#001933",
    "#003366",
    "#004C99",
    "#0066CC",
    "#0080FF",
    "#3399FF",
    "#66B2FF",
    "#99CCFF",
    "#CCE5FF",
    "#000033",
    "#000066",
    "#000099",
    "#0000CC",
    "#0000FF",
    "#3333FF",
    "#6666FF",
    "#9999FF",
    "#CCCCFF",
    "#190033",
    "#330066",
    "#4C0099",
    "#6600CC",
    "#7F00FF",
    "#9933FF",
    "#B266FF",
    "#CC99FF",
    "#E5CCFF",
    "#003399",
    "#0033CC",
    "#0033FF",
    "#006699",
    "#0066FF",
    "#0099CC",
    "#0099FF",
    "#00CCFF",
    "#330099",
    "#3300CC",
    "#3300FF",
    "#333366",
    "#333399",
    "#3333CC",
    "#336699",
    "#3366CC",
    "#3366FF",
    "#33CCFF",
    "#660099",
    "#6600FF",
    "#6633CC",
    "#6633FF",
    "#6666CC",
    "#6699FF",
    "#66CCFF",
    "#663399",
    "#6699CC",
    "#9900CC",
    "#9900FF",
    "#9933CC",
    "#9966CC",
    "#9966FF"
])


red.push(...[
    "#330000",
    "#660000",
    "#990000",
    "#CC0000",
    "#FF0000",
    "#FF3333",
    "#FF6666",
    "#FF9999",
    "#FFCCCC",
    "#996666",
    "#330033",
    "#660066",
    "#990099",
    "#CC00CC",
    "#FF00FF",
    "#FF33FF",
    "#FF66FF",
    "#FF99FF",
    "#FFCCFF",
    "#330019",
    "#660033",
    "#99004C",
    "#CC0066",
    "#FF007F",
    "#FF3399",
    "#FF66B2",
    "#FF99CC",
    "#FFCCE5",
    "#990033",
    "#990066",
    "#993366",
    "#993399",
    "#993300",
    "#CC0033",
    "#CC0099",
    "#CC3300",
    "#CC3333",
    "#CC3366",
    "#CC3399",
    "#FF0033",
    "#FF0066",
    "#FF0099",
    "#FF00CC",
    "#FF3300",
    "#FF3366",
    "#FF33CC",
    "#CC33CC",
    "#FF66CC"
]);

white.push(...[
    "#000000",
    "#333333",
    "#666666",
    "#999999",
    "#CCCCCC",
    "#FFFFFF",
    "#666699",
    "#669999",
    "#66FFCC",
    "#9999CC",
    "#99CCCC",
    "#CC00FF",
    "#CC33FF",
    "#CC66CC",
    "#CC66FF",
    "#CC99CC"
]);

export let pallete = {};

for (let c of red) {
    pallete[c] = COLORS.RED;
}
for (let c of orange) {
    pallete[c] = COLORS.ORANGE;
}
for (let c of yellow) {
    pallete[c] = COLORS.YELLOW;
}
for (let c of green) {
    pallete[c] = COLORS.GREEN;
}
for (let c of blue) {
    pallete[c] = COLORS.BLUE;
}
for (let c of white) {
    pallete[c] = COLORS.WHITE;
}

