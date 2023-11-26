import { getSelectedNode, stack, queue, g, resetAnimArea, resetGraphStyles } from "../components/Ui";
import popup from "../components/popup";
import Algorithms from "./Algorithms";

function startDFSAnimation(e) {
    const container = document.querySelector(".svg-container");
    if (container.classList.contains("animating")) {
        console.log("Another Algorithm Animation is running");
        return;
    }
    resetAnimArea();
    const startingNode = getSelectedNode();
    if (!startingNode) {
        document.body.appendChild(popup("Please Select A starting Node First !"));
    } else {
        document.querySelector(".anim-btn.active")?.classList.remove("active");
        e.currentTarget.classList.add("active");
        console.log("Starting DFS Animations");
        container.classList.add("animating");
        document.querySelector(".anim-area").appendChild(stack.element);
        Algorithms.DFSAnimationV2(g, startingNode.getAttribute("name"), stack, 2000);
    }
}

function startBFSAnimation(e) {
    const container = document.querySelector(".svg-container");
    if (container.classList.contains("animating")) {
        console.log("Another Algorithm Animation is running");
        return;
    }
    resetAnimArea();
    const startingNode = getSelectedNode();
    if (!startingNode) {
        document.body.appendChild(popup("Please Select A starting Node First !"));
    } else {
        document.querySelector(".anim-btn.active")?.classList.remove("active");
        e.currentTarget.classList.add("active");
        console.log("Starting BFS Animation");
        container.classList.add("animating");
        document.querySelector(".anim-area").appendChild(queue.element);
        Algorithms.BFSAnimationV2(g, startingNode.getAttribute("name"), queue, 2000);
    }
}

function startgetSCC() {
    resetGraphStyles();
    for (const CC of Algorithms.getSCC(g)) {
        for (const node of CC.nodes) {
            document.querySelector(`.node[name="${node}"]`).style.fill = CC.color;
            const edges = document.querySelectorAll(`.edge[start-node="${node}"]`);
            edges.forEach((e) => {
                if (e && CC.nodes.has(e.getAttribute("end-node"))) e.style.stroke = CC.color;
            });
        }
    }
}

function startTopologicalSorting() {
    const isAcyclic = document.querySelector(".graph-is-acyclic").textContent === "true" ? true : false;
    if (!isAcyclic) {
        document.body.appendChild(popup("The graph must be Acyclic"));
    } else {
        console.log("Start Topological Sorting Animation");
        document.querySelector(".anim-btn.active")?.classList.remove("active");
        document.querySelector(".svg-container").classList.add("animating", "topo");
        Algorithms.topologicalSortV2(g, 1000);
    }
}

export { startDFSAnimation, startBFSAnimation, startgetSCC, startTopologicalSorting, stack, queue };
