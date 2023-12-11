/*
    AdventOfCode 2023 
    Day 10 - Pipe Maze
    1st star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/10
*/

const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");

const startLine = data.find((line) => line.includes("S"));

const startX = startLine.indexOf("S");
const startY = data.indexOf(startLine);

const conversions = {
    ".": [],
    "|": ["north", "south"],
    "-": ["east", "west"],
    L: ["north", "east"],
    J: ["north", "west"],
    7: ["south", "west"],
    F: ["south", "east"],
};

const reverseMap = {
    north: "south",
    south: "north",
    west: "east",
    east: "west",
};

// =======

let coordX = startX;
let coordY = startY;
let char;

let moveDirection;

const allPathChars = [];

startPath();

while (char !== "S") {
    allPathChars.push(char);
    moveDirection = getNewDirection(moveDirection, char);
    move(moveDirection);
}
console.log(`Star 1: ${(allPathChars.length + 1) / 2}`);

function startPath() {
    const northChar = data[coordY - 1][coordX];
    const southChar = data[coordY + 1][coordX];
    const westChar = data[coordY][coordX - 1];
    const eastChar = data[coordY][coordX + 1];

    if (northChar && conversions[northChar].includes("south")) {
        moveDirection = "north";
    } else if (southChar && conversions[southChar].includes("north")) {
        moveDirection = "south";
    } else if (westChar && conversions[westChar].includes("east")) {
        moveDirection = "west";
    } else if (eastChar && conversions[eastChar].includes("west")) {
        moveDirection = "east";
    }
    move(moveDirection);
}

function getNewDirection(initialOrientation, char) {
    if (char === "|" || char === "-") {
        return initialOrientation;
    }

    const vane = conversions[char];
    switch (reverseMap[initialOrientation]) {
        case vane[0]:
            return vane[1];
        case vane[1]:
            return vane[0];
        default:
            return undefined;
    }
}

function move(direction) {
    switch (direction) {
        case "north":
            coordY--;
            break;
        case "east":
            coordX++;
            break;
        case "south":
            coordY++;
            break;
        case "west":
            coordX--;
            break;
    }
    char = data[coordY][coordX];
}
