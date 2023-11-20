import Graph from "../classes/Graph";
import nodeComponent from "./nodeComponent";
import edgeComponent from "./edgeComponent";
import stackComponent from "./stackComponent";
import { graphInfo, updateGraphInfo } from "./graphInfoComponent";
import animationButton from "./animationButton";
import popup from "./popup";
import { startDFSAnimation, startBFSAnimation } from "../classes/Animations";
import queueComponent from "./queueComponent";

const NodeRadius = 25;
const g = new Graph();
const stack = stackComponent();
const queue = queueComponent();
let cpt = 0;
let selectedNode = null;
let selectedEdge = null;

const isAnimationOn = () => {
    console.log(document.querySelector(".svg-container").classList.contains("animating"));
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
    if (!isAnimationOn()) {
        e.preventDefault();
        const { offsetX: x, offsetY: y } = e;
        const nodes = document.querySelectorAll(".node");
        let overlap = false;
        nodes.forEach((node) => {
            const nodeX = +node.getAttribute("x");
            const nodeY = +node.getAttribute("y");
            if (x >= nodeX - NodeRadius * 2 && x <= nodeX + NodeRadius * 2 && y >= nodeY - NodeRadius * 2 && y <= nodeY + NodeRadius * 2) {
                console.log(y, nodeY);
                overlap = true;
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
        const x1 = +startNode.getAttribute("x");
        const y1 = +startNode.getAttribute("y");
        const x2 = +endNode.getAttribute("x");
        const y2 = +endNode.getAttribute("y");
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
    document.querySelectorAll(".node.selected")?.forEach((selectedNode) => selectedNode.classList.remove("selected"));
    document.querySelectorAll(".edge.selected")?.forEach((selectedEdge) => selectedEdge.classList.remove("selected"));
    document.querySelectorAll(".node.highlighted")?.forEach((selectedEdge) => selectedEdge.classList.remove("highlighted"));
    document.querySelectorAll(".edge.highlighted")?.forEach((selectedEdge) => selectedEdge.classList.remove("highlighted"));
};

const getSelectedNode = () => {
    return document.querySelector(".node.selected");
};

const svg = () => {
    const container = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const nodesContainer = document.createElementNS("http://www.w3.org/2000/svg", "g");
    const edgesContainer = document.createElementNS("http://www.w3.org/2000/svg", "g");

    container.classList.add("svg-container");
    nodesContainer.classList.add("nodes-container");
    edgesContainer.classList.add("edges-container");

    container.addEventListener("dblclick", handleSvgDoubleClick);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Delete" && selectedNode) handleNodeDelete(selectedNode.getAttribute("name"));
        if (e.key === "Delete" && selectedEdge) removeEdge(selectedEdge);
    });

    container.innerHTML = `<defs><marker id="arrow" markerWidth="4" markerHeight="4" refX="3.7" refY="2" orient="auto"><polygon points="0 0, 4 2, 0 4" fill="white" /></marker></defs>`;
    container.appendChild(graphInfo(g, 200, 100));
    container.appendChild(nodesContainer);
    container.appendChild(edgesContainer);

    return container;
};

const buttonsContainer = () => {
    const buttonsContainer = document.createElement("div");
    buttonsContainer.classList.add("controls-container");
    buttonsContainer.appendChild(animationButton("Depth First Search", "#1025FB", startDFSAnimation));
    buttonsContainer.appendChild(animationButton("Breadth First Search", "#15FA47", startBFSAnimation));
    return buttonsContainer;
};

const resetAnimArea = () => {
    document.querySelector(".anim-area").childNodes.forEach((child) => child.remove());
};

const init = () => {
    document.body.appendChild(svg());
    const animationArea = document.createElement("div");
    animationArea.classList.add("anim-area");

    document.body.appendChild(animationArea);
    document.body.appendChild(buttonsContainer());
};

export default svg;
export { init, NodeRadius, stack, queue, g, highlightNode, highlightEdge, getSelectedNode, resetGraphStyles, resetAnimArea };