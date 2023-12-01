/*
    AdventOfCode_2023 Day 1 - Trebuchet
    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/1
*/
const fs = require("fs");
const data = JSON.parse(fs.readFileSync("input.json").toString());

const spelledDigits = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const replaceBy = ["o1e", "t2o", "t3e", "f4r", "f5e", "s6x", "s7n", "e8t", "n9e"];

function isNumeric(str) {
    return /^\d+$/.test(str);
}
let total = 0;

data.forEach((log) => {
    let tempLog = "";

    for (let char of log) {
        tempLog += char;

        for (let i = 1; i <= 9; i++) {
            tempLog = tempLog.replace(spelledDigits[i - 1], replaceBy[i - 1]);
        }
    }
    log = Array.from(tempLog);

    // From part 1
    const firstDigit = log.find((char) => isNumeric(char));
    const secondDigit = log.reverse().find((char) => isNumeric(char));

    const toAdd = parseInt(firstDigit + secondDigit);

    total += toAdd;
});

console.log(`Final count : ${total}`);
