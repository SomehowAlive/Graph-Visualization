import Graph from "./Graph";
import Node from "./Node";
import { highlightNode, highlightEdge, resetGraphStyles } from "../components/Ui";
import popup from "../components/popup";

export default class Algorithms {
    /**
     * @param {Graph} graph  - the graph to perform DFS on
     * @param {String} s - the name of the node to start DFS from
     */
    static DFS(graph, s) {
        const visited = new Map();
        const stack = [];

        for (const node of graph.nodes) {
            visited.set(node.name, false);
        }

        stack.push(s);

        while (stack.length) {
            const currentNode = stack.pop();
            if (!visited.get(currentNode)) {
                console.log(currentNode);
                visited.set(currentNode, true);

                const adjacentNodes = graph.getAdjacentNodes(currentNode);
                adjacentNodes.forEach((adjNode) => {
                    if (!visited.get(adjNode.name)) stack.push(adjNode.name);
                });
            }
        }
    }

    static async DFSAnimation(graph, s, stack, delay = 1000) {
        resetGraphStyles();
        const visited = new Map();

        for (const node of graph.nodes) {
            visited.set(node.name, false);
        }

        stack.push(s);
        await new Promise((resolve) => setTimeout(resolve, delay));

        while (stack.length()) {
            const currentNode = stack.pop();
            if (!visited.get(currentNode)) {
                console.log(currentNode);
                visited.set(currentNode, true);
                highlightNode(currentNode);
                await new Promise((resolve) => setTimeout(resolve, delay * 0.8));

                const adjacentNodes = graph.getAdjacentNodes(currentNode);
                for (const adjNode of adjacentNodes) {
                    if (!visited.get(adjNode.name)) {
                        stack.push(adjNode.name);
                        highlightEdge(currentNode, adjNode.name);
                        highlightNode(adjNode.name);
                        await new Promise((resolve) => setTimeout(resolve, delay));
                    }
                }
            }
        }
        document.body.appendChild(popup("End of Depth First Search Animation !"));
        document.querySelector(".svg-container").classList.remove("animating");
    }

    /**
     *
     * @param {Graph} graph - the graph to perform BFS on
     * @param {Node} s - the node to start BFS from
     */
    static BFS(graph, s) {
        const visited = new Map();
        for (const node of graph.nodes) visited.set(node.name, false);
        const queue = [];

        queue.push(s);
        visited.set(s.name, true);
        while (queue.length) {
            const current = queue.shift();
            console.log(current.name);
            const adjacentNodes = graph.getAdjacentNodes(current.name);
            adjacentNodes.forEach((adjNode) => {
                if (!visited.get(adjNode.name)) {
                    visited.set(adjNode.name, true);
                    queue.push(adjNode);
                }
            });
        }
    }

    static async BFSAnimation(graph, s, queue, delay = 1000) {
        resetGraphStyles();
        const visited = new Map();
        for (const node of graph.nodes) visited.set(node.name, false);

        queue.enqueue(s);
        visited.set(s.name, true);

        await new Promise((resolve) => setTimeout(resolve, delay));

        while (queue.length()) {
            const current = queue.dequeue();
            console.log(current);
            highlightNode(current);
            const adjacentNodes = graph.getAdjacentNodes(current);
            for (const adjNode of adjacentNodes) {
                if (!visited.get(adjNode.name)) {
                    queue.enqueue(adjNode.name);
                    visited.set(adjNode.name, true);
                    highlightEdge(current, adjNode.name);
                    highlightNode(adjNode.name);
                    await new Promise((resolve) => setTimeout(resolve, delay * 0.8));
                }
            }
        }
        document.body.appendChild(popup("End of Breadth First Search Animation !"));
        document.querySelector(".svg-container").classList.remove("animating");
    }
    static detectCycle(graph) {}
    static topologicalSort(graph) {}
    static findStrongComponent(graph) {}
}
