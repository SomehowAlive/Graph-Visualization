import Graph from "../classes/Graph";
import nodeComponent from "./nodeComponent";
import edgeComponent from "./edgeComponent";
import stackComponent from "./stackComponent";
import { graphInfo, updateGraphInfo } from "./graphInfoComponent";
import animationButton from "./animationButton";
import { startDFSAnimation, startBFSAnimation, startgetSCC, startTopologicalSorting } from "../classes/Animations";
import queueComponent from "./queueComponent";
import { HelpOverlay, openOverlayBtn, showOverlay } from "./overlay";
import Algorithms from "../classes/Algorithms";

const BODY = document.body;
const NodeRadius = 30;
const g = new Graph();
const stack = stackComponent();
const queue = queueComponent();
let cpt = 0;
let selectedNode = null;
let selectedEdge = null;

const isAnimationOn = () => {
    return document.querySelector(".svg-container").classList.contains("animating");
};

const handleNodeNameChange = (node, newName) => {
    if (!isAnimationOn()) {
        const oldName = node.name;
        if (g.renameNode(oldName, newName)) {
            document.querySelectorAll(`.edge[start-node="${oldName}"]`).forEach((edge) => edge.setAttribute("start-node", newName));
            document.querySelectorAll(`.edge[end-node="${oldName}"]`).forEach((edge) => edge.setAttribute("end-node", newName));
            console.log(g);
        }
    }
};

const handleNodeDelete = (nodeName) => {
    if (!isAnimationOn()) {
        if (g.removeNode(nodeName)) {
            document.querySelector(`.node[name="${nodeName}"]`).remove();
            document.querySelectorAll(`.edge[start-node="${nodeName}"],.edge[end-node="${nodeName}"]`).forEach((edge) => edge.remove());
            updateGraphInfo(g);
            selectedNode = null;
            selectedEdge = null;
        }
        console.log(g);
    }
};

const handleNodeClick = (e) => {
    if (!isAnimationOn()) {
        const clickedNode = e.currentTarget;

        // left mouse button
        if (e.button === 0) {
            if (selectedNode === clickedNode) {
                selectedNode.classList.remove("selected");
                selectedNode = null;
            } else if (selectedNode) {
                if (addEdge(selectedNode, clickedNode)) {
                    selectedNode.classList.remove("selected");
                    selectedNode = null;
                }
            } else {
                clickedNode.classList.add("selected");
                selectedNode = clickedNode;
            }
        }
        // Middle mouse button
        else if (e.button === 1) {
            if (addEdge(clickedNode, clickedNode)) {
                selectedNode?.classList.remove("selected");
                selectedNode = null;
            }
        }
        selectedEdge?.classList.remove("selected");
        selectedEdge = null;
    }
};

const handleSvgDoubleClick = (e) => {
    e.preventDefault();
    const svgContainer = e.currentTarget;

    const [w, h] = svgContainer.getAttribute("viewBox").split(" ").splice(2);
    if (!isAnimationOn()) {
        const x = `${(e.offsetX * 100) / w}%`;
        const y = `${(e.offsetY * 100) / h}%`;
        const nodes = document.querySelectorAll(".node");
        let overlap = false;
        nodes.forEach((node) => {
            const nodeX = parseFloat(node.getAttribute("x"));
            const nodeY = parseFloat(node.getAttribute("y"));
            if (Math.abs(parseFloat(x) - nodeX) <= 4 && Math.abs(parseFloat(y) - nodeY) <= 4) {
                overlap = true;
                console.log("overlap");
                return;
            }
        });
        if (!overlap) {
            const node = g.addNode(String(++cpt));
            const Nodescontainer = document.querySelector(".nodes-container");
            const newNode = nodeComponent(node, x, y, NodeRadius, handleNodeNameChange, handleNodeClick);
            if (node) {
                Nodescontainer.appendChild(newNode);
                updateGraphInfo(g);
                console.log(g);
            }
        }
    }
};

const handleEdgeWeightChange = (e, edge) => {
    if (!isAnimationOn()) {
        const startNodeName = edge.getAttribute("start-node");
        const endNodeName = edge.getAttribute("end-node");
        g.updateEdgeWeight(startNodeName, endNodeName, +e.currentTarget.value);
        console.log(g);
    }
};

const handleEdgeClick = (e) => {
    if (!isAnimationOn()) {
        if (!selectedEdge) {
            selectedEdge = e.currentTarget;
            e.currentTarget.classList.add("selected");
        } else if (e.currentTarget.classList.contains("selected")) {
            selectedEdge = null;
            e.currentTarget.classList.remove("selected");
        } else {
            selectedEdge = e.currentTarget;
            e.currentTarget.classList.add("selected");
        }
        selectedNode?.classList.remove("selected");
        selectedNode = null;
    }
};

const removeEdge = (edgeElement) => {
    if (!isAnimationOn()) {
        const startNodeName = edgeElement.getAttribute("start-node");
        const endNodeName = edgeElement.getAttribute("end-node");
        if (g.removeEdge(startNodeName, endNodeName)) {
            edgeElement.remove();
            selectedEdge = null;
            updateGraphInfo(g);
            console.log(g);
        }
    }
};

const addEdge = (startNode, endNode) => {
    if (!isAnimationOn()) {
        const x1 = parseFloat(startNode.getAttribute("x"));
        const y1 = parseFloat(startNode.getAttribute("y"));
        const x2 = parseFloat(endNode.getAttribute("x"));
        const y2 = parseFloat(endNode.getAttribute("y"));
        const e = g.addEdge(startNode.getAttribute("name"), endNode.getAttribute("name"));
        if (e) {
            const Edgescontainer = document.querySelector(".edges-container");
            const newEdge = edgeComponent(e, x1, x2, y1, y2, handleEdgeWeightChange, handleEdgeClick);
            Edgescontainer.appendChild(newEdge);
            updateGraphInfo(g);
            console.log(g);
            return true;
        }
        return false;
    }
};

const highlightEdge = (startNodeName, endNodeName) => {
    document.querySelector(`.edge[start-node="${startNodeName}"][end-node="${endNodeName}"]`)?.classList.add("highlighted");
};

const highlightNode = (nodeName) => {
    document.querySelector(`.node[name="${nodeName}"]`)?.classList.add("highlighted");
};

const resetGraphStyles = () => {
    document.querySelectorAll(".selected")?.forEach((selectedNode) => selectedNode.classList.remove("selected"));
    document.querySelectorAll(".highlighted")?.forEach((selectedEdge) => selectedEdge.classList.remove("highlighted"));
    document
        .querySelectorAll(".node,.edge")
        ?.forEach((elem) => (elem.classList.contains("node") ? (elem.style.fill = "") : (elem.style.stroke = "")));
};

const getSelectedNode = () => {
    return document.querySelector(".node.selected");
};

const getSvgSize = () => {
    const { width, height } = getComputedStyle(document.querySelector(".svg-container"));
    return { w: parseFloat(width), h: parseFloat(height) };
};

/* graph drawing area */
const svg = () => {
    const container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const nodesContainer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const edgesContainer = document.createElementNS("http://www.w3.org/2000/svg", "g");

    container.classList.add("svg-container");
    nodesContainer.classList.add("nodes-container");
    edgesContainer.classList.add("edges-container");

    const updateViewBox = () => {
        const { width, height } = getComputedStyle(container);
        container.setAttribute("viewBox", `0 0 ${parseFloat(width)} ${parseFloat(height)}`);
    };
    container.onload = updateViewBox;

    container.addEventListener("dblclick", handleSvgDoubleClick);
    window.addEventListener("keydown", (e) => {
        if (e.key === "Delete" && selectedNode) handleNodeDelete(selectedNode.getAttribute("name"));
        if (e.key === "Delete" && selectedEdge) removeEdge(selectedEdge);
    });

    window.addEventListener("resize", updateViewBox);

    container.innerHTML = `<defs><marker id="arrow" markerWidth="4" markerHeight="4" refX="3.7" refY="2" orient="auto"><polygon points="0 0, 4 2, 0 4" fill="white" /></marker></defs>`;
    container.appendChild(graphInfo(g, 200, 100));
    container.appendChild(nodesContainer);
    container.appendChild(edgesContainer);

    return container;
};

const resetAnimArea = () => {
    [...document.querySelector(".anim-area").children].forEach((child) => child.remove());
};

const controlsArea = () => {
    const mainContainer = document.createElement("div");
    const TraversalContainer = document.createElement("div");
    const OtherContainer = document.createElement("div");
    const traversalTitle = document.createElement("p");
    const otherTitle = document.createElement("p");

    mainContainer.classList.add("controls-container");
    TraversalContainer.classList.add("col");
    OtherContainer.classList.add("col");
    traversalTitle.classList.add("title");
    otherTitle.classList.add("title");

    traversalTitle.innerText = "Traversal Algorithms";
    otherTitle.innerText = "Other Algorithms";

    TraversalContainer.appendChild(traversalTitle);
    TraversalContainer.appendChild(animationButton("Depth First Search", "#1025FB", startDFSAnimation));
    TraversalContainer.appendChild(animationButton("Breadth First Search", "#15FA47", startBFSAnimation));

    OtherContainer.appendChild(otherTitle);
    OtherContainer.appendChild(animationButton("Topological Sorting", "#f2DA00", startTopologicalSorting));
    OtherContainer.appendChild(animationButton("Strongly Connected Components", "#cb1010", startgetSCC));

    mainContainer.appendChild(TraversalContainer);
    mainContainer.appendChild(OtherContainer);

    return mainContainer;
};

const animArea = () => {
    const animationArea = document.createElement("div");
    animationArea.classList.add("anim-area");
    return animationArea;
};

const init = () => {
    BODY.appendChild(animArea());
    BODY.appendChild(svg());
    BODY.appendChild(controlsArea());
    BODY.appendChild(HelpOverlay());
    BODY.appendChild(openOverlayBtn());
};

export default svg;
export { init, NodeRadius, stack, queue, g, highlightNode, highlightEdge, getSelectedNode, resetGraphStyles, resetAnimArea, getSvgSize };
