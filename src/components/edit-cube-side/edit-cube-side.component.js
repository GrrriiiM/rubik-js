import { COLORS, SIDES } from "../../objs/constants.js";
import { findMovementFromTo } from "../../objs/finder.js";
import { rotateSide } from "../../objs/rotator.js";
import { inverseKeyValue } from "../../objs/transformer.js";

export function editCubeComponent(colors, onFinished) {
    let self = {
        className: "edit-cube-side",
        element: null,
        render,
        
    };

    let sideColors = colors;
    let sideColorPosition = 0;

    let colorEntries = inverseKeyValue(COLORS);
    let sideEntries = inverseKeyValue(SIDES);
    let colorsClass = Object.entries(colorEntries).map(_ => _[1].toLowerCase());

    async function render(parentElement) {
        let response = await fetch("./components/edit-cube-side/edit-cube-side.component.html");
        self.element = parentElement.querySelector(`.${self.className}`)
        self.element.innerHTML = await response.text();

        let movements = findMovementFromTo(sideColors[4], SIDES.FRONT);
        let sides = Object.values(SIDES);
        sides.forEach((side, i) => {
            movements.forEach(_ => sides[i] = rotateSide(_.axis, sides[i], _.clock))
        });

        self.element.querySelector(".edit-side-reference.up").classList.add(colorsClass[sides[SIDES.UP]]);
        self.element.querySelector(".edit-side-reference.left").classList.add(colorsClass[sides[SIDES.LEFT]]);
        self.element.querySelector(".edit-side-reference.front").classList.add(colorsClass[sides[SIDES.FRONT]]);
        self.element.querySelector(".edit-side-reference.right").classList.add(colorsClass[sides[SIDES.RIGHT]]);
        self.element.querySelector(".edit-side-reference.down").classList.add(colorsClass[sides[SIDES.DOWN]]);

        self.element.querySelector(".color-area>.color-button-area>.color-button-orange").onclick = () =>  setColor(COLORS.ORANGE);
        self.element.querySelector(".color-area>.color-button-area>.color-button-yellow").onclick = () => setColor(COLORS.YELLOW);
        self.element.querySelector(".color-area>.color-button-area>.color-button-green").onclick = () => setColor(COLORS.GREEN);
        self.element.querySelector(".color-area>.color-button-area>.color-button-red").onclick = () => setColor(COLORS.RED);
        self.element.querySelector(".color-area>.color-button-area>.color-button-white").onclick = () => setColor(COLORS.WHITE);
        self.element.querySelector(".color-area>.color-button-area>.color-button-blue").onclick = () => setColor(COLORS.BLUE);

        self.element.querySelector(".edit-side.edit-side-0").onclick = () =>  setPosition(0);
        self.element.querySelector(".edit-side.edit-side-1").onclick = () =>  setPosition(1);
        self.element.querySelector(".edit-side.edit-side-2").onclick = () =>  setPosition(2);
        self.element.querySelector(".edit-side.edit-side-3").onclick = () =>  setPosition(3);
        self.element.querySelector(".edit-side.edit-side-5").onclick = () =>  setPosition(5);
        self.element.querySelector(".edit-side.edit-side-6").onclick = () =>  setPosition(6);
        self.element.querySelector(".edit-side.edit-side-7").onclick = () =>  setPosition(7);
        self.element.querySelector(".edit-side.edit-side-8").onclick = () =>  setPosition(8);

        self.element.querySelector(".color-area>.color-button-area>.color-button-accept").onclick = () => {
            onFinished && onFinished(sideColors);
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