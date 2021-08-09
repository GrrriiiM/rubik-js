import toolsHistoryComponent from "./history/tools-history.component.js";
import toolsActionComponent from "./action/tools-action.component.js";
import toolsMovementComponent from "./movement/tools-movement.component.js";


export default function toolsComponent(sceneComponent) {
    let scene = sceneComponent;
    let element;
    let buttonMovementElement;
    let buttonHistoryElement;
    let buttonAlgoElement;
    let buttonActionElement;

    let action = toolsActionComponent(scene);
    let history = toolsHistoryComponent(scene);
    let movement = toolsMovementComponent(scene);
    let onExpanded;

    function render(parentElement) {

        fetch("./components/tools/tools.component.html").then(async (reponse) => {

            element = parentElement.querySelector(".tools");
            element.innerHTML = await reponse.text();

            buttonHistoryElement = element.querySelector(".button-tool-history");
            buttonMovementElement = element.querySelector(".button-tool-movement");
            buttonActionElement = element.querySelector(".button-tool-action");

            buttonHistoryElement.addEventListener("click", () => toggleToolHistory())
            buttonMovementElement.addEventListener("click", () => toggleToolMovement())
            buttonActionElement.addEventListener("click", () => toggleToolAction())

            action.render(element);
            history.render(element);
            movement.render(element);

        });
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
    }

    function reset() {
        hide();
        onExpanded && onExpanded();
    }

    let isToolActionExpanded = false;
    function toggleToolAction() {
        if (!isToolActionExpanded) showToolAction();
        else hideToolAction();
    }

    function showToolAction() {
        reset();
        isToolActionExpanded = true;
        element.classList.add("tools-expanded");
        element.classList.add("tools-action-expanded");
        document.querySelector(".content").classList.add("tools-expanded");
        document.querySelector(".button-tool-action").classList.add("selected");
    }
    function hideToolAction() {
        isToolActionExpanded = false;
        element.classList.remove("tools-expanded");
        element.classList.remove("tools-action-expanded");
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
        element.classList.add("tools-expanded");
        element.classList.add("tools-movement-expanded");
        document.querySelector(".content").classList.add("tools-expanded");
        document.querySelector(".button-tool-movement").classList.add("selected");
    }
    function hideToolMovement() {
        isToolMovementExpanded = false;
        element.classList.remove("tools-expanded");
        element.classList.remove("tools-movement-expanded");
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
        element.classList.add("tools-expanded");
        element.classList.add("tools-history-expanded");
        document.querySelector(".content").classList.add("tools-expanded");
        document.querySelector(".button-tool-history").classList.add("selected");
    }
    function hideToolHistory() {
        isToolHistoryExpanded = false;
        element.classList.remove("tools-expanded");
        element.classList.remove("tools-history-expanded");
        document.querySelector(".content").classList.remove("tools-expanded");
        document.querySelector(".button-tool-history").classList.remove("selected");
    }

    return {
        element,
        render,
        refresh,
        hide,
        onExpanded
    }

}



