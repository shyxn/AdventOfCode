/*
    AdventOfCode 2023 
    Day 6 - Wait For It
    1st star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/6
*/

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("input.json").toString());

const times = data[0].split(" ").filter((el) => el !== "" && el !== "Time:");
const distances = data[1].split(" ").filter((el) => el !== "" && el != "Distance:");

const possibleRecords = [];

for (let raceNb in times) {
    const raceTime = times[raceNb];
    const raceDistance = distances[raceNb];

    let nbOfRecords = 0;

    for (let i = 0; i <= raceTime; i++) {
        const holdDuration = i;
        const speed = holdDuration;
        const raceDuration = raceTime - holdDuration;

        const finalDistance = speed * raceDuration;
        if (finalDistance > raceDistance) {
            nbOfRecords++;
        }
    }
    possibleRecords.push(nbOfRecords);
}

console.log(`Star 1 : ${possibleRecords.reduce((a, b) => a * b)}`);
