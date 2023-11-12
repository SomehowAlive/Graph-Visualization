import Graph from "../classes/Graph";
import nodeComponent from "./nodeComponent";
import edgeComponent from "./edgeComponent";
import { graphInfo, updateGraphInfo } from "./graphInfo";
import { NodeRadius } from "../classes/UI";

let cpt = 0;
let selectedNode = null;
let selectedEdge = null;
const g = new Graph();

const handleNodeNameChange = (node, newName) => {
    const oldName = node.name;
    if (g.renameNode(oldName, newName)) {
        document.querySelectorAll(`.edge[start-node="${oldName}"]`).forEach((edge) => edge.setAttribute("start-node", newName));
        document.querySelectorAll(`.edge[end-node="${oldName}"]`).forEach((edge) => edge.setAttribute("end-node", newName));
        console.log(g);
    }
};

const handleNodeDelete = (nodeName) => {
    if (g.removeNode(nodeName)) {
        document.querySelector(`.node[name="${nodeName}"]`).remove();
        document.querySelectorAll(`.edge[start-node="${nodeName}"],.edge[end-node="${nodeName}"]`).forEach((edge) => edge.remove());
        updateGraphInfo(g);
        selectedNode = null;
        selectedEdge = null;
    }
    console.log(g);
};

const handleNodeClick = (e) => {
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
            selectedEdge = null;
        }
    }
    // Middle mouse button
    else if (e.button === 1) {
        if (addEdge(clickedNode, clickedNode)) {
            selectedNode?.classList.remove("selected");
            selectedNode = null;
        }
    }
};

const handleSvgDoubleClick = (e) => {
    const { offsetX: x, offsetY: y } = e;
    const nodes = document.querySelectorAll(".node");
    nodes.forEach((node) => {
        const nodeX = node.getAttribute("x");
        const nodeY = node.getAttribute("y");
        if ((x >= nodeX && x <= nodeX + NodeRadius) || (y >= nodeY && y <= nodeY + NodeRadius)) return;
    });
    const node = g.addNode(String(++cpt));
    const container = document.querySelector(".svg-container");
    const newNode = nodeComponent(node, x, y, NodeRadius, handleNodeNameChange, handleNodeClick);
    if (node) {
        container.appendChild(newNode);
        updateGraphInfo(g);
        console.log(g);
    }
};

const handleEdgeWeightChange = (e, edge) => {
    const startNodeName = edge.getAttribute("start-node");
    const endNodeName = edge.getAttribute("end-node");
    g.updateEdgeWeight(startNodeName, endNodeName, +e.currentTarget.value);
    console.log(g);
};

const handleEdgeClick = (e) => {
    if (!selectedEdge) {
        selectedEdge = e.currentTarget;
        selectedNode = null;
        e.currentTarget.classList.add("selected");
    } else if (e.currentTarget.classList.contains("selected")) {
        selectedEdge = null;
        e.currentTarget.classList.remove("selected");
    }
    console.log(e);
};

const removeEdge = (edgeElement) => {
    const startNodeName = edgeElement.getAttribute("start-node");
    const endNodeName = edgeElement.getAttribute("end-node");
    if (g.removeEdge(startNodeName, endNodeName)) {
        edgeElement.remove();
        selectedEdge = null;
        updateGraphInfo(g);
        console.log(g);
    }
};

const addEdge = (startNode, endNode) => {
    const x1 = +startNode.getAttribute("x");
    const y1 = +startNode.getAttribute("y");
    const x2 = +endNode.getAttribute("x");
    const y2 = +endNode.getAttribute("y");
    const e = g.addEdge(startNode.getAttribute("name"), endNode.getAttribute("name"));
    if (e) {
        const container = document.querySelector(".svg-container");
        const newEdge = edgeComponent(e, x1, x2, y1, y2, handleEdgeWeightChange, handleEdgeClick);
        container.appendChild(newEdge);
        updateGraphInfo(g);
        console.log(g);
        return true;
    }
    return false;
};

const svg = (width, height) => {
    const container = document.createElementNS("http://www.w3.org/2000/svg", "svg");

    container.setAttribute("width", width);
    container.setAttribute("height", height);

    container.classList.add("svg-container");

    container.addEventListener("dblclick", handleSvgDoubleClick);
    window.addEventListener("keypress", (e) => {
        if (e.key === "Delete" && selectedNode) handleNodeDelete(selectedNode.getAttribute("name"));
        if (e.key === "Delete" && selectedEdge) removeEdge(selectedEdge);
    });

    window.onresize = () => {
        container.setAttribute("width", window.innerWidth);
        container.setAttribute("height", window.innerHeight);
    };
    container.innerHTML = `
    <defs>
        <marker id="arrow" markerWidth="5" markerHeight="5" refX="4" refY="2.5" orient="auto">
            <polygon points="0 0, 5 2.5, 0 5" fill="white" />
        </marker>
    </defs>
    `;

    container.appendChild(graphInfo(g, 100, 100));

    return container;
};

export default svg;
