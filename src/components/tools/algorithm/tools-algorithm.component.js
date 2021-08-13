import { crossAlgorithm } from "../../../objs/algotithms/cross-algorithm.js";
import { f2lAlgorithm } from "../../../objs/algotithms/f2l-algorithm.js";
import { ollAlgorithm } from "../../../objs/algotithms/oll-algorithm.js";
import { pllAlgorithm } from "../../../objs/algotithms/pll-algorithm.js";
import algorithmListComponent from "../../algorithm/list/algorithm-list.component.js";
import modalComponent from "../../modal/modal.component.js";

export default function toolsAlgorithmComponent(sceneComponent) {

    let self = {
        element: null,
        render
    };
    let scene = sceneComponent;
    let modal = modalComponent();
    let algorithmListCross = algorithmListComponent(crossAlgorithm, "cross");
    let algorithmListF2L = algorithmListComponent(f2lAlgorithm, "f2l");
    let algorithmListOLL = algorithmListComponent(ollAlgorithm, "oll");
    let algorithmListPLL = algorithmListComponent(pllAlgorithm, "pll");
    function render(parentElement) {
        fetch("./components/tools/algorithm/tools-algorithm.component.html").then(async (reponse) => {
            self.element = parentElement.querySelector(".algorithm");
            self.element.innerHTML = await reponse.text();
            self.element.querySelector(".button-tool-algorithm-cross").addEventListener("click", () => modal.show("algo-cross", "Algorítimos Cross", algorithmListCross.element));
            self.element.querySelector(".button-tool-algorithm-f2l").addEventListener("click", () => modal.show("algo-cross", "Algorítimos F2l", algorithmListF2L.element));
            self.element.querySelector(".button-tool-algorithm-oll").addEventListener("click", () => modal.show("algo-cross", "Algorítimos OLL", algorithmListOLL.element));
            self.element.querySelector(".button-tool-algorithm-pll").addEventListener("click", () => modal.show("algo-cross", "Algorítimos PLL", algorithmListPLL.element));
            algorithmListCross.render(self.element);
            algorithmListF2L.render(self.element);
            algorithmListOLL.render(self.element);
            algorithmListPLL.render(self.element);
        });
    }

    return self;;
}