/*
    AdventOfCode 2024 
    Day 1 - Historian Hysteria
    1st & 2nd stars

    TypeScript solution by @shyxn
    https://adventofcode.com/2024/day/1
*/

import { readFileSync } from 'fs';
import { exit } from 'process';

type LocationLists = {
    first: number[],
    second: number[]
}

const getOrderedLists = (inputFilePath: string) : LocationLists => {
    const file: string = readFileSync(inputFilePath).toString();
    const lists: LocationLists = {
        first: [],
        second: []
    };

    // Lists distribution
    file.split("\r\n").forEach((line) => {
        const splitted = line.split('   ');

        lists.first.push(parseInt(splitted[0]));
        lists.second.push(parseInt(splitted[1]));
    })

    // Ascending sort
    lists.first = lists.first.sort((a, b) => a - b);
    lists.second = lists.second.sort((a, b) => a - b);

    if (lists.first.length !== lists.second.length) exit;

    return lists;
}

const star1 = (lists: LocationLists) => {
    return lists.first
        .map((el, i) => Math.abs(el - lists.second[i])) // Difference
        .reduce((a, b) => a + b, 0); // Sum of all
};

const star2 = (lists: LocationLists) => {
    return lists.first
        .map((el) => lists.second.filter((x) => x === el).length * el) // Occurences
        .reduce((a, b) => a + b, 0); // Sum of all
};

const inputPath = {
    intro: __dirname + '/input-intro.txt',
    real: __dirname + '/input.txt'
}
const orderedLists = getOrderedLists(inputPath.real);

const results = {
    star1: star1(orderedLists),
    star2: star2(orderedLists)
}

console.log(results);