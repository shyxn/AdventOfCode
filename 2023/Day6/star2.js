/*
    AdventOfCode 2023 
    Day 6 - Wait For It
    2nd star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/6
*/

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("input.json").toString().replaceAll(" ", ""));

const raceTime = data[0].split(":")[1];
const raceDistance = data[1].split(":")[1];

let possibleRecords = 0;

for (let i = 0; i <= raceTime; i++) {
    const holdDuration = i;
    const speed = holdDuration;
    const raceDuration = raceTime - holdDuration;

    const finalDistance = speed * raceDuration;

    if (finalDistance > raceDistance) {
        possibleRecords++;
    }
}

console.log(`Star 2 : ${possibleRecords}`);
