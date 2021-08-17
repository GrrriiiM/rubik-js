import { COLORS, SIDES } from "../../objs/constants.js";
import { findMovementFromTo } from "../../objs/finder.js";
import { rotateSide } from "../../objs/rotator.js";
import { inverseKeyValue } from "../../objs/transformer.js";
import { messageBoxComponent } from "../message-box/message-box.component.js";

export function editCubeComponent(colors, onFinished) {
    let self = {
        className: "edit-cube-side",
        element: null,
        render,

    };

    let messageBox = messageBoxComponent();

    let sideColors = colors;
    let sideColorPosition = 0;

    let colorEntries = inverseKeyValue(COLORS);
    let sideEntries = inverseKeyValue(SIDES);
    let colorsClass = Object.entries(colorEntries).map(_ => _[1].toLowerCase());

    let colorsReference = {
        1: [0, 1, 2, 3, 4, 5, 6],
        2: [0, 2, 4, 3, 4, 1, 6],
        3: [0, 3, 2, 4, 6, 5, 1],
        4: [0, 4, 2, 6, 1, 5, 3],
        5: [0, 5, 1, 3, 2, 4, 6],
        6: [0, 6, 2, 1, 3, 5, 4],
    }

    async function render(parentElement) {
        let response = await fetch("./components/edit-cube-side/edit-cube-side.component.html");
        self.element = parentElement.querySelector(`.${self.className}`)
        self.element.innerHTML = await response.text();

        let movements = findMovementFromTo(sideColors[4], SIDES.FRONT);
        let colorReference = colorsReference[sideColors[4]];

        self.element.querySelector(".edit-side-reference.up").classList.add(colorsClass[colorReference[SIDES.UP]]);
        self.element.querySelector(".edit-side-reference.left").classList.add(colorsClass[colorReference[SIDES.LEFT]]);
        self.element.querySelector(".edit-side-reference.front").classList.add(colorsClass[colorReference[SIDES.FRONT]]);
        self.element.querySelector(".edit-side-reference.right").classList.add(colorsClass[colorReference[SIDES.RIGHT]]);
        self.element.querySelector(".edit-side-reference.down").classList.add(colorsClass[colorReference[SIDES.DOWN]]);

        self.element.querySelector(".color-area>.color-button-area>.color-button-orange").onclick = () => setColor(COLORS.ORANGE);
        self.element.querySelector(".color-area>.color-button-area>.color-button-yellow").onclick = () => setColor(COLORS.YELLOW);
        self.element.querySelector(".color-area>.color-button-area>.color-button-green").onclick = () => setColor(COLORS.GREEN);
        self.element.querySelector(".color-area>.color-button-area>.color-button-red").onclick = () => setColor(COLORS.RED);
        self.element.querySelector(".color-area>.color-button-area>.color-button-white").onclick = () => setColor(COLORS.WHITE);
        self.element.querySelector(".color-area>.color-button-area>.color-button-blue").onclick = () => setColor(COLORS.BLUE);

        self.element.querySelector(".edit-side.edit-side-0").onclick = () => setPosition(0);
        self.element.querySelector(".edit-side.edit-side-1").onclick = () => setPosition(1);
        self.element.querySelector(".edit-side.edit-side-2").onclick = () => setPosition(2);
        self.element.querySelector(".edit-side.edit-side-3").onclick = () => setPosition(3);
        self.element.querySelector(".edit-side.edit-side-5").onclick = () => setPosition(5);
        self.element.querySelector(".edit-side.edit-side-6").onclick = () => setPosition(6);
        self.element.querySelector(".edit-side.edit-side-7").onclick = () => setPosition(7);
        self.element.querySelector(".edit-side.edit-side-8").onclick = () => setPosition(8);

        self.element.querySelector(".color-area>.color-button-area>.color-button-accept").onclick = () => {
            if (sideColors.includes(0)) {
                messageBox.show("Atenção", "Lado incompleto", "error", "var(--red)");
            } else {
                onFinished && onFinished(sideColors);
            }

        };


        update();
    }

    async function setColor(color) {
        sideColors[sideColorPosition] = color;
        sideColorPosition = (sideColorPosition + 1) % sideColors.length;
        if (sideColorPosition == 4) sideColorPosition += 1;
        update();
    }

    async function setPosition(position) {
        sideColorPosition = position;
        update();
    }

    async function update() {
        self.element.querySelectorAll(".edit-side").forEach((_, i) => {
            let position = i;
            if (position > 3) position += 1
            _.classList.remove(...colorsClass);
            _.classList.remove("selected");
            _.classList.add(colorsClass[sideColors[position]])
            if (position == sideColorPosition) _.classList.add("selected");
        });
    }

    return self;
}