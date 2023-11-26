import Algorithms from "../classes/Algorithms";
const updateGraphInfo = (graph) => {
    const SCC = Algorithms.getSCC(graph);
    document.querySelector(".graph-is-acyclic").textContent = `${SCC.every((scc) => scc.nodes.size === 1)}`;
    document.querySelector(".graph-components-count").textContent = `${Algorithms.getSCC(graph).length}`;
    document.querySelector(".graph-order").textContent = `${graph.order()}`;
    document.querySelector(".graph-size").textContent = `${graph.size()}`;
};

const graphInfo = (graph, x, y) => {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "foreignObject");
    const container = document.createElement("div");
    const title = document.createElement("p");
    const p1 = document.createElement("p");
    const p2 = document.createElement("p");
    const p3 = document.createElement("p");
    const p4 = document.createElement("p");
    const SCCcount = document.createElement("span");
    const isAcyclic = document.createElement("span");
    const graphOrder = document.createElement("span");
    const graphSize = document.createElement("span");

    const SCC = Algorithms.getSCC(graph);

    title.textContent = "Graph Data ";
    p1.textContent = "Is Acyclic ";
    p2.textContent = "Strongly Connected Components ";
    p3.textContent = "Order ";
    p4.textContent = "Size ";

    isAcyclic.classList.add("graph-is-acyclic");
    SCCcount.classList.add("graph-components-count");
    graphOrder.classList.add("graph-order");
    graphSize.classList.add("graph-size");
    title.classList.add("title");
    title.style.fontWeight = "600";

    isAcyclic.innerText = SCC.every((scc) => scc.nodes.size === 1);
    SCCcount.innerText = SCC.length;
    graphOrder.innerText = graph.order();
    graphSize.innerText = graph.size();

    p1.appendChild(isAcyclic);
    p2.appendChild(SCCcount);
    p3.appendChild(graphOrder);
    p4.appendChild(graphSize);

    container.appendChild(title);
    container.appendChild(p1);
    container.appendChild(p2);
    container.appendChild(p3);
    container.appendChild(p4);

    container.classList.add("graph-info");

    g.setAttribute("x", "0");
    g.setAttribute("y", "0");
    g.setAttribute("width", "250px");
    g.setAttribute("height", "300px");

    g.appendChild(container);
    return g;
};

export { graphInfo, updateGraphInfo };
