export default function toolsHistoryComponent(sceneComponent) {
    let scene = sceneComponent;
    let element;
    let historyCount = 0;
    function render(parentElement) {
        fetch("./components/tools/history/tools-history.component.html").then(async (reponse) => {
            element = parentElement.querySelector(".history");
            element.innerHTML = await reponse.text();
        });
    }

    function refresh() {
        if (!element) return;
        if (historyCount != scene.state.history.length) {
            let histories = [];
            if (historyCount < scene.state.history.length) {
                histories = scene.state.history.slice(historyCount);
            } else if (historyCount > scene.state.history.length) {
                histories = scene.state.history;
                element.querySelectorAll(".item:not(.template)").forEach(_ => _.remove());
                element.querySelectorAll(".check:not(.template)").forEach(_ => _.remove());
            }
            for (let history of histories) {
                if (history.isMovement) {
                    let itemElmement = element.querySelector(".item").cloneNode(true);
                    itemElmement.classList.remove("template");
                    itemElmement.querySelector("div").innerHTML = history.value;
                    element.appendChild(itemElmement);
                } else {
                    let historyElmement = element.querySelector(".check").cloneNode(true);
                    historyElmement.classList.remove("template");
                    historyElmement.querySelector("div").innerHTML = history.value;
                    element.appendChild(historyElmement);
                }
            }
            element.scrollTo({ top: element.scrollHeight })
        }
        historyCount = scene.state.history.length;
    }

    return {
        element,
        render,
        refresh
    };
}