import { crossAlgorithm } from "../../../objs/algotithms/cross-algorithm.js";
import { f2lAlgorithm } from "../../../objs/algotithms/f2l-algorithm.js";
import { ollAlgorithm } from "../../../objs/algotithms/oll-algorithm.js";
import { pllAlgorithm } from "../../../objs/algotithms/pll-algorithm.js";
import algorithmListComponent from "../../algorithm/list/algorithm-list.component.js";
import modalComponent from "../../modal/modal.component.js";

export default function toolsAlgorithmComponent() {

    let self = {
        element: null,
        className: ".algorithm",
        render
    };
    let modal = modalComponent();
    async function render(parentElement) {
        let response = await fetch("./components/tools/algorithm/tools-algorithm.component.html");
        self.element = parentElement.querySelector(self.className);
        self.element.innerHTML = await response.text();
        self.element.querySelector(".button-tool-algorithm-cross").addEventListener("click", () => modal.show("Algorítimos Cross", algorithmListComponent(crossAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-f2l").addEventListener("click", () => modal.show("Algorítimos F2l", algorithmListComponent(f2lAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-oll").addEventListener("click", () => modal.show("Algorítimos OLL", algorithmListComponent(ollAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-pll").addEventListener("click", () => modal.show("Algorítimos PLL", algorithmListComponent(pllAlgorithm)));
    }

    return self;;
}