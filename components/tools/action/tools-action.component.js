import { SIDES } from "../../../objs/constants.js";
import { createCubeWithPattern } from "../../../objs/creator.js";
import { solveCube } from "../../../objs/solver.js";
import { algorithmComponent } from "../../algorithm/algorithm.component.js";
import modalComponent from "../../modal/modal.component.js";
import { newCubeComponent } from "../../new-cube/new-cube.component.js";

export default function toolsActionComponent(sceneComponent) {
    let element;
    let scene = sceneComponent;
    let modal = modalComponent();
    function render(parentElement) {
        fetch("./components/tools/action/tools-action.component.html").then(async (reponse) => {

            element = parentElement.querySelector(".action");
            element.innerHTML = await reponse.text();

            element.querySelector(".button-tool-action-reset").addEventListener("click", () => {
                modal.show("Criar Cubo", newCubeComponent(pattern => {
                    scene.setCube(createCubeWithPattern(pattern, 3));
                    modal.hide();
                }));
            });

            element.querySelector(".button-tool-action-solve").addEventListener("click", () => openSolveModal(false));
            element.querySelector(".button-tool-action-solve-basic").addEventListener("click", () => openSolveModal(true));

        });
    }

    function openSolveModal(useBasic = false) {
        let cube = scene.state.cube;
        let solution = solveCube(cube, SIDES.DOWN, useBasic);
        if (solution.solved) {
            let headers = [];
            if (solution.cross) {
                solution.cross.forEach((c, i) => {
                    c.adjusts.forEach(() => {
                        headers.push(`Cross (${i + 1}/${solution.cross.length}) - Ajustes`);
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
                        headers.push(`F2L (${i + 1}/${solution.f2ls.length}) - Ajustes`);
                    });
                    if (c.algo) {
                        c.algo.movements.forEach(() => {
                            headers.push(`F2L (${i + 1}/${solution.f2ls.length}) - ${c.algo.name}`);
                        });
                    }
                });
            }
            if (solution.olls) {
                solution.olls.forEach((c, i) => {
                    c.adjusts.forEach(() => {
                        headers.push(`OLL (${i + 1}/${solution.olls.length}) - Ajustes`);
                    });
                    if (c.algo) {
                        c.algo.movements.forEach(() => {
                            headers.push(`OLL (${i + 1}/${solution.olls.length}) - ${c.algo.name}`);
                        });
                    }
                });
            }
            if (solution.plls) {
                solution.plls.forEach((c, i) => {
                    c.adjusts.forEach(() => {
                        headers.push(`PLL (${i + 1}/${solution.plls.length}) - Ajustes`);
                    });
                    if (c.algo) {
                        c.algo.movements.forEach(() => {
                            headers.push(`PLL (${i + 1}/${solution.plls.length}) - ${c.algo.name}`);
                        });
                    }
                });
            }
            headers.push("Concluído");
            modal.show(`Solução (${useBasic ? "Básico" : "Avançado"}) - ${solution.movements.length} movimentos`, algorithmComponent(cube, "Solução", solution.movements, headers));
        }
    }

    return {
        element: element,
        render: render
    };
}