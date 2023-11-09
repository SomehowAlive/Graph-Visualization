import Graph from "./classes/Graph";
import Algorithms from "./classes/Algorithms";

const g = new Graph();
g.addNode("A");
g.addNode("B");
g.addNode("C");
g.addNode("D");
g.addNode("E");
g.addNode("F");
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("A", "D");
g.addEdge("C", "E");
g.addEdge("D", "F");
g.addEdge("F", "C");

console.log("DFS Result :");
Algorithms.DFS(g, g.getNode("A"));
console.log("BFS Result :");
Algorithms.BFS(g, g.getNode("A"));
