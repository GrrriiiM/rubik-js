
export default function contentComponent(sceneComponent) {
    let scene = sceneComponent
    let sceneState = scene.state;
    let element;
    let timeHtmlElement;
    let countHtmlElement;
    let checkCrossElement;
    let checkF2LElement;
    let checkOLLElement;
    let checkPLLElement;
    let timeCrossElement;
    let timeF2LElement;
    let timeOLLElement;
    let timePLLElement;
    let movementsCount;

    function render(parentElement) {

        fetch("./components/content/content.component.html").then(async (reponse) => {

            element = parentElement.querySelector(".content");
            element.innerHTML = await reponse.text();

            scene.render(element);

            timeHtmlElement = document.querySelector(".time");
            countHtmlElement = document.querySelector(".count");
            checkCrossElement = element.querySelector(".cube-steps-area>.steps-item.check-cross");
            checkF2LElement = element.querySelector(".cube-steps-area>.steps-item.check-f2l");
            checkOLLElement = element.querySelector(".cube-steps-area>.steps-item.check-oll");
            checkPLLElement = element.querySelector(".cube-steps-area>.steps-item.check-pll");
            timeCrossElement = element.querySelector(".cube-steps-area>.steps-time.time-cross");
            timeF2LElement = element.querySelector(".cube-steps-area>.steps-time.time-f2l");
            timeOLLElement = element.querySelector(".cube-steps-area>.steps-time.time-oll");
            timePLLElement = element.querySelector(".cube-steps-area>.steps-time.time-pll");
        });
    }

    function refresh() {
        let time = new Date(Date.now() - sceneState.createAt.getTime());
        timeHtmlElement.innerHTML = `${time.getUTCHours().toString().padStart(2, "0")}:${time.getUTCMinutes().toString().padStart(2, "0")}:${time.getUTCSeconds().toString().padStart(2, "0")}`;

        if (sceneState.crossAt) {
            let at = new Date(sceneState.crossAt.getTime() - sceneState.createAt.getTime());
            timeCrossElement.innerHTML = `${at.getUTCHours().toString().padStart(2, "0")}:${at.getUTCMinutes().toString().padStart(2, "0")}:${at.getUTCSeconds().toString().padStart(2, "0")}`
            checkCrossElement.classList.add("completed");
        } else {
            timeCrossElement.innerHTML = "";
            checkCrossElement.classList.remove("completed");
        }
        if (sceneState.f2lAt) {
            let at = new Date(sceneState.f2lAt.getTime() - sceneState.createAt.getTime());
            timeF2LElement.innerHTML = `${at.getUTCHours().toString().padStart(2, "0")}:${at.getUTCMinutes().toString().padStart(2, "0")}:${at.getUTCSeconds().toString().padStart(2, "0")}`
            checkF2LElement.classList.add("completed");
        } else {
            timeF2LElement.innerHTML = "";
            checkF2LElement.classList.remove("completed");
        }
        if (sceneState.ollAt) {
            let at = new Date(sceneState.ollAt.getTime() - sceneState.createAt.getTime());
            timeOLLElement.innerHTML = `${at.getUTCHours().toString().padStart(2, "0")}:${at.getUTCMinutes().toString().padStart(2, "0")}:${at.getUTCSeconds().toString().padStart(2, "0")}`
            checkOLLElement.classList.add("completed");
        } else {
            timeOLLElement.innerHTML = "";
            checkOLLElement.classList.remove("completed");
        }
        if (sceneState.completedAt) {
            let at = new Date(sceneState.completedAt.getTime() - sceneState.createAt.getTime());
            timePLLElement.innerHTML = `${at.getUTCHours().toString().padStart(2, "0")}:${at.getUTCMinutes().toString().padStart(2, "0")}:${at.getUTCSeconds().toString().padStart(2, "0")}`
            checkPLLElement.classList.add("completed");
        } else {
            timePLLElement.innerHTML = "";
            checkPLLElement.classList.remove("completed");
        }

        if (movementsCount != sceneState.history.length) {
            let excludeMoves = ["X", "X'", "Y", "Y'", "Z", "Z'"];
            countHtmlElement.innerHTML = `${sceneState.history.filter(_ => _.isMovement && excludeMoves.indexOf(_) < 0).length.toString().padStart(5, "0")}`;
        }

        movementsCount = sceneState.history.length;

    }
    return {
        element,
        render,
        refresh
    }
}