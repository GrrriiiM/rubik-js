export default function algorithmListComponent(algo, name) {
    let self = {
        element: null,
        render
    };
    let algorithms = algo;
    function render(parentElement) {
        fetch("./components/algorithm/list/algorithm-list.component.html").then(async (reponse) => {

            self.element = parentElement.querySelector(`.algorithm-list-${name}`);
            self.element.innerHTML = await reponse.text();
            
            for(let c of Object.values(algorithms.cases)) {
                let buttonAlgorithmListElement = self.element.querySelector(".button-algorithm-list").cloneNode(true);
                buttonAlgorithmListElement.classList.remove("template");
                buttonAlgorithmListElement.querySelector("span.hint").innerHTML = c.name;
                self.element.appendChild(buttonAlgorithmListElement);
            }

        });
    }

    return self;
}