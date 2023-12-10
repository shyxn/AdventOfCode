/*
    AdventOfCode 2023 
    Day 5 - If You Give A Seed A Fertilizer
    2nd star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/5

    ~ 1min30 of execution
*/

const fs = require("fs");

const data = fs.readFileSync("input.txt", "utf-8").split("\r\n");

const seeds = data.shift().split(" ").splice(1);

const chunks = [];
let seedPairs = [];

let finalResult = undefined;

const seedsNb = seeds.length;
for (let i = 0; i < seedsNb / 2; i++) {
    seedPairs.unshift([]);
    seedPairs[0].push(parseInt(seeds.shift()));
    seedPairs[0].push(parseInt(seeds.shift()));
}

seedPairs = seedPairs.map((pair) => [pair[0], pair[0] + pair[1]]);
seedPairs.reverse();

data.forEach((line) => {
    if (line.includes("map:")) {
        chunks.unshift([]);
        return;
    }

    if (line != "") {
        // really really wanted to keep that [0]
        chunks[0].push(line.split(" ").map((digits) => parseInt(digits)));
    }
});

chunks.reverse();

console.log("Start searching...");

for (let i = 0; ; i++) {
    if (isKnownSeed(locationToSeed(i))) {
        finalResult = i;
        break;
    }
}

console.log(`Star 2 : ${finalResult}`);

function isKnownSeed(testSeed) {
    return seedPairs.some(
        (seedPair) => seedPair[0] <= testSeed && testSeed < seedPair[1]
    );
}

function locationToSeed(locationVal) {
    for (let i = chunks.length - 1; i >= 0; i--) {
        locationVal = reverseConvert(locationVal, chunks[i]);
    }

    return locationVal;
}

function reverseConvert(value, chunk) {
    let result = undefined;

    for (let i = 0; i < chunk.length; i++) {
        const line = chunk[i];
        sourceStart = line[1];
        destinationStart = line[0];
        rangeLength = line[2];

        if (
            destinationStart <= value &&
            value < destinationStart + rangeLength
        ) {
            result = sourceStart + (value - destinationStart);
            break;
        }
    }

    return result ?? value;
}
