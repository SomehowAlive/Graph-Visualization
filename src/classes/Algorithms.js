import Graph from "./Graph";
import Node from "./Node";

export default class Algorithms {
    /**
     * @param {Graph} graph  - the graph to perform DFS on
     * @param {Node} s - the node to start DFS from
     */
    static DFS(graph, s) {
        const visited = new Map();
        const stack = [];

        for (const node of graph.nodes) {
            visited.set(node.name, false);
        }

        stack.push(s);

        while (stack.length) {
            const current = stack.pop();
            if (!visited.get(current.name)) {
                console.log(current.name);
                visited.set(current.name, true);

                const adjacentNodes = graph.getAdjacentNodes(current.name);
                adjacentNodes.forEach((adjNode) => {
                    if (!visited.get(adjNode.name)) stack.push(adjNode);
                });
            }
        }
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
    static detectCycle(graph) {}
    static topologicalSort(graph) {}
    static findStrongComponent(graph) {}
}
