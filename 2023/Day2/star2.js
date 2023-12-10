/*
    AdventOfCode 2023 
    Day 2 - Cube Conundrum
    2nd star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/2
*/

const fs = require('fs');
const data = JSON.parse(fs.readFileSync("input.json").toString());

const colors = ["red", "blue", "green"];
let finalSum = 0;

data.forEach(str => {
    // Format data
    const game = {
        id: parseInt(str.slice(5).split(":")[0]),
        colorsMax: {
            red: 0,
            blue: 0,
            green: 0,
        },
        sets: str.split(":").pop().slice(1).replaceAll(/[,;]/g, "").split(" "),
        isValid: true
    }
    // Gather color occurences
    for (let i = 0; i < game.sets.length; i++) {
        const data = game.sets[i];

        if (colors.includes(data)) {
            game.colorsMax[data] = Math.max(game.colorsMax[data], parseInt(game.sets[i - 1]));
        }
    }
   
    finalSum += game.colorsMax.red * game.colorsMax.blue * game.colorsMax.green;

    console.log(game.colorsMax);
});

console.log(`Result : ${finalSum}`);