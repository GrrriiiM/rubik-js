import toolsHistoryComponent from "./history/tools-history.component.js";
import toolsActionComponent from "./action/tools-action.component.js";
import toolsMovementComponent from "./movement/tools-movement.component.js";
import toolsAlgorithmComponent from "./algorithm/tools-algorithm.component.js";


export default function toolsComponent(sceneComponent) {
    let scene = sceneComponent;
    let self = {
        element: null,
        render,
        refresh,
        hide,
        onExpanded: null
    }
    let buttonMovementElement;
    let buttonHistoryElement;
    let buttonAlgorithmElement;
    let buttonActionElement;

    let action = toolsActionComponent(scene);
    let history = toolsHistoryComponent(scene);
    let movement = toolsMovementComponent(scene);
    let algorithm = toolsAlgorithmComponent(scene)

    async function render(parentElement) {

        let response = await fetch("./components/tools/tools.component.html");

        self.element = parentElement.querySelector(".tools");
        self.element.innerHTML = await response.text();

        buttonHistoryElement = self.element.querySelector(".button-tool-history");
        buttonMovementElement = self.element.querySelector(".button-tool-movement");
        buttonActionElement = self.element.querySelector(".button-tool-action");
        buttonAlgorithmElement = self.element.querySelector(".button-tool-algorithm");

        buttonHistoryElement.addEventListener("click", () => toggleToolHistory())
        buttonMovementElement.addEventListener("click", () => toggleToolMovement())
        buttonActionElement.addEventListener("click", () => toggleToolAction())
        buttonAlgorithmElement.addEventListener("click", () => toggleToolAlgorithm())

        action.render(self.element);
        history.render(self.element);
        movement.render(self.element);
        algorithm.render(self.element);
    }

    function refresh() {
        action.refresh && action.refresh();
        movement.refresh && movement.refresh();
        history.refresh && history.refresh();
    }

    function hide() {
        hideToolAction();
        hideToolMovement();
        hideToolHistory();
        hideToolAlgorithm();
    }

    function reset() {
        hide();
        self.onExpanded && self.onExpanded();
    }

    let isToolActionExpanded = false;
    function toggleToolAction() {
        if (!isToolActionExpanded) showToolAction();
        else hideToolAction();
    }

    function showToolAction() {
        reset();
        isToolActionExpanded = true;
        self.element.classList.add("tools-expanded");
        self.element.classList.add("tools-action-expanded");
        document.querySelector(".content").classList.add("tools-expanded");
        document.querySelector(".button-tool-action").classList.add("selected");
    }
    function hideToolAction() {
        isToolActionExpanded = false;
        self.element.classList.remove("tools-expanded");
        self.element.classList.remove("tools-action-expanded");
        document.querySelector(".content").classList.remove("tools-expanded");
        document.querySelector(".button-tool-action").classList.remove("selected");
    }




    let isToolMovementExpanded = false;
    function toggleToolMovement() {
        if (!isToolMovementExpanded) showToolMovement();
        else hideToolMovement();
    }
    function showToolMovement() {
        reset();
        isToolMovementExpanded = true;
        self.element.classList.add("tools-expanded");
        self.element.classList.add("tools-movement-expanded");
        document.querySelector(".content").classList.add("tools-expanded");
        document.querySelector(".button-tool-movement").classList.add("selected");
    }
    function hideToolMovement() {
        isToolMovementExpanded = false;
        self.element.classList.remove("tools-expanded");
        self.element.classList.remove("tools-movement-expanded");
        document.querySelector(".content").classList.remove("tools-expanded");
        document.querySelector(".button-tool-movement").classList.remove("selected");
    }



    let isToolHistoryExpanded = false;
    function toggleToolHistory() {
        if (!isToolHistoryExpanded) showToolHistory();
        else hideToolHistory();
    }
    function showToolHistory() {
        reset();
        isToolHistoryExpanded = true;
        self.element.classList.add("tools-expanded");
        self.element.classList.add("tools-history-expanded");
        document.querySelector(".content").classList.add("tools-expanded");
        document.querySelector(".button-tool-history").classList.add("selected");
    }
    function hideToolHistory() {
        isToolHistoryExpanded = false;
        self.element.classList.remove("tools-expanded");
        self.element.classList.remove("tools-history-expanded");
        document.querySelector(".content").classList.remove("tools-expanded");
        document.querySelector(".button-tool-history").classList.remove("selected");
    }

    let isToolAlgorithmExpanded = false;
    function toggleToolAlgorithm() {
        if (!isToolAlgorithmExpanded) showToolAlgorithm();
        else hideToolAlgorithm();
    }
    function showToolAlgorithm() {
        reset();
        isToolAlgorithmExpanded = true;
        self.element.classList.add("tools-expanded");
        self.element.classList.add("tools-algorithm-expanded");
        document.querySelector(".content").classList.add("tools-expanded");
        document.querySelector(".button-tool-algorithm").classList.add("selected");
    }
    function hideToolAlgorithm() {
        isToolAlgorithmExpanded = false;
        self.element.classList.remove("tools-expanded");
        self.element.classList.remove("tools-algorithm-expanded");
        document.querySelector(".content").classList.remove("tools-expanded");
        document.querySelector(".button-tool-algorithm").classList.remove("selected");
    }


    return self;

}



