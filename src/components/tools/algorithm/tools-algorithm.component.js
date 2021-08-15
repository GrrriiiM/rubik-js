import { crossAlgorithm } from "../../../objs/algotithms/cross-algorithm.js";
import { basicF2LCornerAlgorithm } from "../../../objs/algotithms/basic-f2l-c-algorithm.js";
import { f2lAlgorithm } from "../../../objs/algotithms/f2l-algorithm.js";
import { ollAlgorithm } from "../../../objs/algotithms/oll-algorithm.js";
import { pllAlgorithm } from "../../../objs/algotithms/pll-algorithm.js";
import algorithmListComponent from "../../algorithm/list/algorithm-list.component.js";
import modalComponent from "../../modal/modal.component.js";
import { basicF2LEdgeAlgorithm } from "../../../objs/algotithms/basic-f2l-e-algorithm.js";
import { basicOLLEdgeAlgorithm } from "../../../objs/algotithms/basic-oll-e-algorithm.js";
import { basicOLLCornerAlgorithm } from "../../../objs/algotithms/basic-oll-c-algorithm.js";
import { basicPllCornerAlgorithm } from "../../../objs/algotithms/basic-pll-c-algorithm.js";
import { basicPllEdgeAlgorithm } from "../../../objs/algotithms/basic-pll-e.algorithm.js";

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
        self.element.querySelector(".button-tool-algorithm-basic-f2l-corner").addEventListener("click", () => modal.show(`Algorítimos ${basicF2LCornerAlgorithm.name}`, algorithmListComponent(basicF2LCornerAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-basic-f2l-edge").addEventListener("click", () => modal.show(`Algorítimos ${basicF2LEdgeAlgorithm.name}`, algorithmListComponent(basicF2LEdgeAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-basic-oll-edge").addEventListener("click", () => modal.show(`Algorítimos ${basicOLLEdgeAlgorithm.name}`, algorithmListComponent(basicOLLEdgeAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-basic-oll-corner").addEventListener("click", () => modal.show(`Algorítimos ${basicOLLCornerAlgorithm.name}`, algorithmListComponent(basicOLLCornerAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-basic-pll-corner").addEventListener("click", () => modal.show(`Algorítimos ${basicPllCornerAlgorithm.name}`, algorithmListComponent(basicPllCornerAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-basic-pll-edge").addEventListener("click", () => modal.show(`Algorítimos ${basicPllEdgeAlgorithm.name}`, algorithmListComponent(basicPllEdgeAlgorithm)));
        
        
        self.element.querySelector(".button-tool-algorithm-f2l").addEventListener("click", () => modal.show("Algorítimos F2l (Avançado)", algorithmListComponent(f2lAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-oll").addEventListener("click", () => modal.show("Algorítimos OLL (Avançado)", algorithmListComponent(ollAlgorithm)));
        self.element.querySelector(".button-tool-algorithm-pll").addEventListener("click", () => modal.show("Algorítimos PLL (Avançado)", algorithmListComponent(pllAlgorithm)));
    }

    return self;;
}