/*
    AdventOfCode 2023 
    Day 8 - Haunted Wasteland
    1st star

    Typescript solution by @shyxn
    https://adventofcode.com/2023/day/8
*/

import fs from "fs";
const data = JSON.parse(fs.readFileSync("input.json").toString());

const startId = "AAA";
const endID = "ZZZ";

type Node = {
    id: string;
    left: string;
    right: string;
};

const allNodes: Node[] = [];

const sequence = data.shift();

data.forEach((line: string) => {
    const parts = line.split(/[ ,=()]/).filter((part) => part !== "");
    const node: Node = {
        id: parts[0],
        left: parts[1],
        right: parts[2],
    };
    allNodes.push(node);
});

// Search
let finalCount = 0;
let currentNode = findNode(startId);
if (currentNode === undefined) {
    throw Error("[Custom] Node not found");
}

let sequenceIndex = 0;

while (currentNode.id !== endID) {
    const direction = sequence[sequenceIndex];

    const nextId: string =
        direction === "R" ? currentNode.right : currentNode.left;
    currentNode = allNodes.find((node) => node.id === nextId);

    if (currentNode === undefined) {
        throw Error(`[Custom] Node is undefined with id : ${nextId}`);
    }
    finalCount++;
    sequenceIndex++;
    if (sequenceIndex >= sequence.length) {
        sequenceIndex = 0;
    }
}

console.log(`Star 1: ${finalCount}`);

function findNode(id: string): Node | undefined {
    return allNodes.find((node) => node.id === id);
}
