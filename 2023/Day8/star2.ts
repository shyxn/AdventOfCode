/*
    AdventOfCode 2023 
    Day 8 - Haunted Wasteland
    2nd star

    Typescript solution by @shyxn
    https://adventofcode.com/2023/day/8
*/

import fs from "fs";
const data = JSON.parse(fs.readFileSync("input.json").toString());

type PathNode = {
    id: string;
    left: string;
    right: string;
};

type NodeInfo = {
    node: PathNode;
    pathCount: number;
};

const allNodes: PathNode[] = [];

const sequence = data.shift();

data.forEach((line: string) => {
    const parts = line.split(/[ ,=()]/).filter((part) => part !== "");
    const node: PathNode = {
        id: parts[0],
        left: parts[1],
        right: parts[2],
    };
    allNodes.push(node);
});

let finalCount = 0;

let currentNodes: NodeInfo[] = allNodes
    .filter((node) => node.id.endsWith("A"))
    .map((node) => {
        return {
            node: node,
            pathCount: getPathCount(node),
        };
    });

if (currentNodes.length == 0) {
    throw Error("No node found with id ending with A");
}

const allPathCounts = currentNodes.map((el) => el.pathCount);

const primeNumbers: number[] = [];

for (let nb = 2; nb < 25000; nb++) {
    if (isPrime(nb)) {
        primeNumbers.push(nb);
    }
}

console.log(`Star 2: ${findLCM(allPathCounts)}`);

function isPrime(nb: number) {
    const divisors: number[] = [];
    for (let i = 0; i <= nb; i++) {
        if (nb % i === 0) {
            divisors.push(i);
        }
    }

    return (
        divisors.length === 2 && divisors.includes(1) && divisors.includes(nb)
    );
}

function findNode(id: string): PathNode {
    const foundNode = allNodes.find((node) => node.id === id);
    if (foundNode === undefined) {
        throw Error("");
    }
    return foundNode;
}

function getPathCount(startNode: PathNode) {
    let currentNode = startNode;
    let sequenceIndex = 0;
    let finalCount = 0;

    while (!currentNode.id.endsWith("Z")) {
        const direction = sequence[sequenceIndex];

        const nextId: string =
            direction === "R" ? currentNode.right : currentNode.left;
        currentNode = findNode(nextId);

        if (currentNode === undefined) {
            throw Error(`[Custom] PathNode is undefined with id : ${nextId}`);
        }

        finalCount++;
        sequenceIndex++;
        if (sequenceIndex >= sequence.length) {
            sequenceIndex = 0;
        }
    }

    return finalCount;
}

function findLCM(numbers: number[]) {
    const factors: number[] = [];

    primeNumbers.forEach((primeNb) => {
        for (let i = 0; i < numbers.length; i++) {
            if (numbers[i] % primeNb == 0) {
                numbers[i] /= primeNb;

                if (!factors.includes(primeNb)) {
                    factors.push(primeNb);
                }
            }
        }
    });
    return factors.reduce((a, b) => a * b);
}
