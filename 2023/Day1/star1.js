/*
    AdventOfCode 2023 
    Day 1 - Trebuchet?!
    1st star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/1
*/

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("input.json").toString());

function isNumeric(str) {
    return /^\d+$/.test(str);
}
let total = 0;

data.forEach((log) => {
    log = Array.from(log);
    const firstDigit = log.find((char) => isNumeric(char));
    const secondDigit = log.reverse().find((char) => isNumeric(char));

    const toAdd = parseInt(firstDigit + secondDigit);

    total += toAdd;
});

console.log(`Final count : ${total}`);
