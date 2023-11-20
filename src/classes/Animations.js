import { getSelectedNode, stack, queue, g, resetAnimArea } from "../components/Ui";
import popup from "../components/popup";
import Algorithms from "./Algorithms";

function startDFSAnimation() {
    resetAnimArea();
    const container = document.querySelector(".svg-container");
    const startingNode = getSelectedNode();
    if (!startingNode) {
        document.body.appendChild(popup("Please Select A starting Node First !"));
    } else if (container.classList.contains("animating")) {
        console.log("Another Algorithm Animation is running");
    } else {
        console.log("Starting DFS Animations");
        container.classList.add("animating");
        document.querySelector(".anim-area").appendChild(stack.element);
        Algorithms.DFSAnimation(g, startingNode.getAttribute("name"), stack, 2000);
    }
}

function startBFSAnimation() {
    resetAnimArea();
    const container = document.querySelector(".svg-container");
    const startingNode = getSelectedNode();
    if (!startingNode) {
        document.body.appendChild(popup("Please Select A starting Node First !"));
    } else if (container.classList.contains("animating")) {
        document.body.appendChild(popup("Another Algorithm is running please Wait!"));
    } else {
        console.log("Starting BFS Animation");
        container.classList.add("animating");
        document.querySelector(".anim-area").appendChild(queue.element);
        Algorithms.BFSAnimation(g, startingNode.getAttribute("name"), queue, 2000);
    }
}

export { startDFSAnimation, startBFSAnimation, stack, queue };
