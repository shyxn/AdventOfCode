/*
    AdventOfCode 2023 
    Day 4 - Scratchcards
    1st star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/4
*/

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("input.json").toString());

let totalSum = 0;

Array.from(data).forEach((line) => {
    let winNbrsCount = 0;
    line = line.slice(5);

    let splittedLine = line.split(/[:|]/);

    const infos = {
        id: splittedLine[0],
        firstSet: splittedLine[1].split(" "),
        scndSet: splittedLine[2].split(" "),
    };

    infos.firstSet.forEach((number) => {
        if (number != "" && infos.scndSet.includes(number)) {
            winNbrsCount++;
        }
    });

    if (winNbrsCount > 0) {
        totalSum += Math.pow(2, winNbrsCount - 1);
    }
});

console.log(totalSum);
