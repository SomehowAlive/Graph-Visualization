import Node from "./Node";
import Edge from "./Edge";

export default class Graph {
    constructor() {
        this.nodes = [];
        this.edges = [];
    }

    /**
     *
     * @param {String} nodeName - the name of the node to get
     * @returns {Node|undefined} - return the wanted node if found else undefined
     */
    getNode(nodeName) {
        return this.nodes.find((node) => node.name === nodeName);
    }

    /**
     *
     * @param {String} nodeName - the node to be added
     * @returns {Node|undefined} - returns the new Node or undefined
     */
    addNode(nodeName) {
        if (!this.getNode(nodeName)) {
            const newNode = new Node(nodeName);
            this.nodes.push(newNode);
            return newNode;
        }
        return undefined;
    }

    /**
     *
     * @param {String} nodeName - the name of the node to be removed
     * @returns {Boolean} - returns true if the node has been found and got deleted, false otherwise
     */
    removeNode(nodeName) {
        if (this.getNode(nodeName)) {
            this.nodes = this.nodes.filter((node) => node.name !== nodeName);
            this.edges = this.edges.filter((edge) => edge.startNode.name !== nodeName && edge.endNode.name !== nodeName);
            return true;
        }
        return false;
    }

    /**
     *
     * @param {String} oldName - the name of the node we want to rename
     * @param {*} newName - the new name of the node
     * @returns {Boolean} - true if succeeded false otherwise
     */
    renameNode(oldName, newName) {
        const n = this.getNode(oldName);
        const t = this.getNode(newName);
        if (n && !t && oldName !== "" && newName !== "") {
            n.setName(newName);
            return true;
        }
        return false;
    }

    /**
     *
     * @param {String} startNodeName - the start node of the edge to find
     * @param {String} endNodeName - the end node of the edge to find
     * @returns {Edge|undefined} - returns the edge to look for if found otherwise undefined
     */
    findEdge(startNodeName, endNodeName) {
        return this.edges.find((e) => e.startNode.name === startNodeName && e.endNode.name === endNodeName);
    }

    /**
     *
     * @param {String} startNodeName - the name of the node from which the new edge starts
     * @param {String} endNodeName - the name of the end extremity of the new edge
     * @param {Number} weight - the weight of the edge
     * @returns {Edge|undefined} - return true if succedeed false otherwise
     */
    addEdge(startNodeName, endNodeName) {
        const startNode = this.getNode(startNodeName);
        const endNode = this.getNode(endNodeName);

        // Input validation
        if (!startNode || !endNode) {
            return undefined;
        }

        if (this.findEdge(startNodeName, endNodeName) === undefined) {
            const e = new Edge(this.getNode(startNodeName), this.getNode(endNodeName));
            this.edges.push(e);
            return e;
        }
        return undefined;
    }

    /**
     * @param {String} startNodeName - The name of the start node of the edge to remove.
     * @param {String} endNodeName - The name of the end node of the edge to remove.
     * @returns {boolean} - True if succeeded, false otherwise.
     */
    removeEdge(startNodeName, endNodeName) {
        const edgeIndex = this.edges.findIndex(
            (edge) =>
                (edge.startNode.name === startNodeName && edge.endNode.name === endNodeName) ||
                (edge.startNode.name === endNodeName && edge.endNode.name === startNodeName)
        );

        if (edgeIndex !== -1) {
            this.edges.splice(edgeIndex, 1);
            return true;
        }

        return false;
    }

    /**
     *
     * @param {String} startNodeName
     * @param {String} endNodeName
     * @param {Number} weight
     * @returns {boolean} - True if succeeded, false otherwise.
     */
    updateEdgeWeight(startNodeName, endNodeName, weight) {
        const edge = this.findEdge(startNodeName, endNodeName);
        if (edge) {
            edge.setWeight(weight);
            return true;
        }
        return false;
    }

    getSuccessors(nodeName) {
        const successors = [];
        this.edges.forEach((edge) => {
            if (edge.startNode.name === nodeName && edge.endNode.name !== nodeName) {
                successors.push(edge.endNode.name);
            }
        });

        return successors;
    }

    getPredecessors(nodeName) {
        const predecessors = [];
        this.edges.forEach((edge) => {
            if (edge.startNode.name !== nodeName && edge.endNode.name === nodeName) {
                predecessors.push(edge.endNode.name);
            }
        });

        return predecessors;
    }

    /**
     *
     * @param {Node} u - The name of the starting node
     * @param {*} v - the name of the ending node
     * @description Checks if there is a path from node u to v
     * @returns {Boolean} - True if there is a path from u to v false otherwise
     */
    path(u, v) {
        if (!this.getNode(u) || !this.getNode(v)) return null;

        let i = 0;
        const L = new Set();
        const iterator = L.values();
        L.add(u);

        do {
            const curr = iterator.next().value;
            for (const successor of this.getSuccessors(curr)) {
                if (successor === v) return true;
                L.add(successor);
            }
            i++;
        } while (i < L.size);
        return false;
    }

    /**
     *
     * @returns {Number} - the order of the graph
     */
    order() {
        return this.nodes.length;
    }

    /**
     *
     * @returns {Number} the size of the graph
     */
    size() {
        return this.edges.length;
    }
}
