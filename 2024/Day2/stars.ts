/*
    AdventOfCode 2024 
    Day 2 - Red-Nosed Reports
    1st & 2nd stars

    TypeScript solution by @shyxn
    https://adventofcode.com/2024/day/2
*/

import { readFileSync } from 'fs';

// [1, 3, 2, 4, 5] => [2, -1, 2, 1]
const getArrayDifferences = (arr: number[]): number[] => {
    const result = arr.map((num, i, arr) => num - arr[i + 1]);
    result.pop();
    
    return result;
}

const isArraySafe = (arr: number[]): boolean => {
    if (arr.length < 1) return false;

    const isInBounds = arr.every((n) => {
        const abs = Math.abs(n);
        return (abs <= 3 && abs > 0);
    })

    const isConsistent = arr.every((n) => n > 0) || arr.every((n) => n < 0);

    return isInBounds && isConsistent;
};

const composePossibilities = (arr: number[]): number[][] => {
    const result: number[][] = [];

    for (let i = 0; i <= arr.length; i++) {
        result.push([...arr]);

        if (i === arr.length) continue;

        result[i].splice(i, 1);
    }

    return result;
}

const inputPath = {
    intro: __dirname + '/input-intro.txt',
    real: __dirname + '/input.txt'
}

const file: string = readFileSync(inputPath.real).toString();

const inputLines = file.split("\r\n")
    .map((line) => line.split(' ')
        .map(number => parseInt(number))
);

const star1 = inputLines.filter((line) => {
    const diffs = getArrayDifferences(line)
    return isArraySafe(diffs);
}).length;

const star2 = inputLines.filter((line) => {
    const possibilities: number[][] = composePossibilities(line);

    return possibilities.some((truncatedLine) => {
        const diffs = getArrayDifferences(truncatedLine)
        return isArraySafe(diffs);
    })
}).length;

console.log(`Star1: ${star1}`);
console.log(`Star2: ${star2}`);