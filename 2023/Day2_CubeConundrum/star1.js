/*
    AdventOfCode 2023 
    Day 2 - Cube Conundrum
    1st star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/2
*/

const fs = require('fs');
const data = JSON.parse(fs.readFileSync("input.json").toString());

const colors = ["red", "blue", "green"];
const maxCubes = { red: 12, green: 13, blue: 14 };

let finalSum = 0;
let validGamesSum = 0;
let invalidGamesSum = 0;

data.forEach(str => {
    // Format data
    const game = {
        id: parseInt(str.slice(5).split(":")[0]),
        sets: str.split(":").pop().slice(1).replaceAll(/[,;]/g, "").split(" "),
        isValid: true
    }
    // Check colors
    for (let i = 0; i < game.sets.length; i++) {
        const data = game.sets[i];

        if (colors.includes(data)) {
            game.isValid &= parseInt(game.sets[i - 1]) <= maxCubes[data];
        }
    }
    // Check quantities
    if (game.isValid) {
        finalSum += game.id;
        validGamesSum++;
    }
    else {
        invalidGamesSum++;
    }

    console.log(game);
});

console.log(`Result : ${finalSum} / ✅ games : ${validGamesSum} / ❌ games : ${invalidGamesSum}`);
