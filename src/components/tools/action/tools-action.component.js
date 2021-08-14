import { SIDES } from "../../../objs/constants.js";
import { createCube } from "../../../objs/creator.js";
import { shuffleCube } from "../../../objs/rotator.js";
import { solveCube } from "../../../objs/solver.js";
import { algorithmComponent } from "../../algorithm/algorithm.component.js";
import modalComponent from "../../modal/modal.component.js";

export default function toolsActionComponent(sceneComponent) {
    let element;
    let scene = sceneComponent;
    let modal = modalComponent();
    function render(parentElement) {
        fetch("./components/tools/action/tools-action.component.html").then(async (reponse) => {

            element = parentElement.querySelector(".action");
            element.innerHTML = await reponse.text();

            element.querySelector(".button-tool-action-reset").addEventListener("click", () => scene.reset());

            element.querySelector(".button-tool-action-solve").addEventListener("click", openSolveModal);

        });
    }

    function openSolveModal() {
        let cube = scene.state.cube;
        let solution = solveCube(cube);
        if (solution.solved) {
            let headers = [];
            if (solution.cross) {
                solution.cross.forEach((c, i) => {
                    c.adjusts.forEach(() => {
                        headers.push(`Cross - Ajustes`);
                    });
                    if (c.algo) {
                        c.algo.movements.forEach(() => {
                            headers.push(`Cross (${i + 1}/${solution.cross.length}) - ${c.algo.name}`);
                        });
                    }
                });
            }
            if (solution.f2ls) {
                solution.f2ls.forEach((c, i) => {
                    c.adjusts.forEach(() => {
                        headers.push(`F2L - Ajustes`);
                    });
                    if (c.algo) {
                        c.algo.movements.forEach(() => {
                            headers.push(`F2L (${i + 1}/${solution.f2ls.length}) - ${c.algo.name}`);
                        });
                    }
                });
            }
            if (solution.oll) {
                solution.oll.adjusts.forEach(() => {
                    headers.push(`OLL - Ajustes`);
                });
                if (solution.oll.algo) {
                    solution.oll.algo.movements.forEach(() => {
                        headers.push(`OLL - ${solution.oll.algo.name}`);
                    });
                }
            }
            if (solution.pll) {
                solution.pll.adjusts.forEach(() => {
                    headers.push(`PLL - Ajustes`);
                });
                if (solution.pll.algo) {
                    solution.pll.algo.movements.forEach(() => {
                        headers.push(`PLL - ${solution.pll.algo.name}`);
                    });
                }
            }
            headers.push("Concluído");
            modal.show("Solução", algorithmComponent(cube, "Solução", solution.movements, headers));
        }
    }

    return {
        element: element,
        render: render
    };
}