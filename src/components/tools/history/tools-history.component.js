export default function toolsHistoryComponent(sceneComponent) {
    let scene = sceneComponent;
    let element;
    let movementsCount = 0;
    function render(parentElement) {
        fetch("./components/tools/history/tools-history.component.html").then(async (reponse) => {
            element = parentElement.querySelector(".history");
            element.innerHTML = await reponse.text();
        });
    }

    function refresh() {
        if (!element) return;
        if (movementsCount != scene.state.movements.length) {
            let movements = [];
            if (movementsCount < scene.state.movements.length) {
                movements = scene.state.movements.slice(movementsCount);
            } else if (movementsCount > scene.state.movements.length) {
                movements = scene.state.movements;
                element.querySelectorAll(".item:not(.template)").forEach(_ => _.remove());
            }
            for (let movement of movements) {
                let itemElmement = element.querySelector(".item").cloneNode(true);
                itemElmement.classList.remove("template");
                itemElmement.querySelector("div").innerHTML = movement;
                element.appendChild(itemElmement);
            }
        }
        movementsCount = scene.state.movements.length;
    }

    return {
        element,
        render,
        refresh
    };
}