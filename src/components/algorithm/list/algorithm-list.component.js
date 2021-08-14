import { createCubeWithPattern } from "../../../objs/creator.js";
import { movementsFromNotation } from "../../../objs/transformer.js";
import modalComponent from "../../modal/modal.component.js";
import { algorithmComponent } from "../algorithm.component.js";

export default function algorithmListComponent(algorithms) {
    let state = {
        algorithms
    };
    let self = {
        className: "algorithm-list",
        element: null,
        render,
        state
    };
    let modal = modalComponent();
    async function render(parentElement) {
        let response = await fetch("./components/algorithm/list/algorithm-list.component.html");

        self.element = parentElement.querySelector(`.${self.className}`);
        self.element.innerHTML = await response.text();
        for (let c of Object.values(state.algorithms.cases)) {
            let buttonAlgorithmListElement = self.element.querySelector(".button-algorithm-list").cloneNode(true);
            buttonAlgorithmListElement.classList.remove("template");
            buttonAlgorithmListElement.querySelector("span.hint").innerHTML = c.name;
            buttonAlgorithmListElement.onclick = () => {
                let cube = createCubeWithPattern(c.sample);
                let algorithm = algorithmComponent(cube, c.name, movementsFromNotation(c.moves));
                modal.show(`${state.algorithms.name} - ${c.name}`, algorithm);
            };
            self.element.appendChild(buttonAlgorithmListElement);
        }
    }

    return self;
}