/*
    AdventOfCode 2023 
    Day 5 - If You Give A Seed A Fertilizer
    1st star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/5
*/

const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8").split("\r\n");

const dataChunks = [];

const seeds = data.shift().split(" ").splice(1);
console.log(seeds[16]);

data.forEach((line) => {
    if (line.includes("map:")) {
        dataChunks.unshift([]);
        return;
    }
    if (line != "") {
        // really really wanted to keep that [0]
        dataChunks[0].push(line.split(" ").map((digits) => parseInt(digits)));
    }
});
dataChunks.reverse();

for (let i = 0; i < seeds.length; i++) {
    console.log("checking seed " + i);
    dataChunks.forEach((chunk) => {
        seeds[i] = convert(seeds[i], chunk);
    });
    console.log(seeds[i]);
}

function convert(value, chunk) {
    let result = undefined;

    chunk.forEach((line) => {
        sourceStart = line[1];
        destinationStart = line[0];
        rangeLength = line[2];

        if (sourceStart <= value && value < sourceStart + rangeLength) {
            result = destinationStart + (value - sourceStart);
            return;
        }
    });

    return result ?? value;
}

console.log(`Star 1 : ${Math.min(...seeds)}`);
console.log(seeds.indexOf(Math.min(...seeds)));
