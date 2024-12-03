/*
    AdventOfCode 2024 
    Day 3 - Red-Nosed Reports
    1st & 2nd stars

    TypeScript solution by @shyxn
    https://adventofcode.com/2024/day/3
*/

import { readFileSync } from 'fs';

/**
 * Removes the 'mul(' and ')', split with ',', multiply with map and add it all
 */
const multiply = (mulPairs: string[]) => {
    const keepNumbers = mulPairs.map((mul) => mul.match(/((\d)+,(\d)+)/g)).flat();

    if (!keepNumbers) return;

    const multiplications = keepNumbers.map((pair) => {
            if (!pair) return 0;
            return pair
                .split(",")
                .map(n => parseInt(n))
                .reduce((a, b) => a * b)
            }
        );

    return multiplications.reduce((a, b) => a + b);
}

const star1 = (file: string) => {
    const filtered = file.match(/(mul\((\d)+,(\d)+\))/g);

    if (!filtered) return;

    return multiply(filtered);
}

const star2 = (file: string) => {
    const filtered = file.match(/(mul\((\d)+,(\d)+\))|(don't\(\)|do\(\))/g);

    if (!filtered) return;

    const result: string[] = [];

    let isEnabled = true;

    filtered.forEach((instruction) => {
        if (instruction === "do()") {
            isEnabled = true;
            return;
        }

        if (instruction === "don't()") {
            isEnabled = false;
            return;
        }
        
        if (isEnabled) result.push(instruction)
    })

    return multiply(result);
}

(() => {
    const inputPath = {
        intro: __dirname + '/input-intro.txt',
        real: __dirname + '/input.txt'
    }

    const file: string = readFileSync(inputPath.real).toString();

    const results = {
        star1: star1(file),
        star2: star2(file)
    }

    console.log(results);
})();
