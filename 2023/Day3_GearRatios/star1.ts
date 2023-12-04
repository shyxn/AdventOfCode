/*
    AdventOfCode 2023 
    Day 3 - Gear Ratios
    1st star

    Typescript solution by @shyxn
    https://adventofcode.com/2023/day/3
*/

import fs from "fs";
const data: string[] = JSON.parse(fs.readFileSync("input.json").toString());

type Position = {
    x: number;
    y: number;
};
class Occurence {
    public digits: string = "";
    public linkedGear: Position | undefined;
}

const cursor: Position = {
    x: 0,
    y: 0,
};

let totalSum = 0;

data.forEach((line: string) => {
    let occurence = new Occurence();

    for (cursor.x = 0; cursor.x < line.length; cursor.x++) {
        const char = line[cursor.x];

        if (!isNaN(parseInt(char))) {
            occurence.digits += char;

            if (!occurence.linkedGear) {
                occurence.linkedGear = checkIfAdjacentToSymbol(cursor);
            }

            if (!(cursor.x == line.length - 1)) {
                continue;
            }
        }
        if (occurence.digits.length > 0 && occurence.linkedGear) {
            totalSum += parseInt(occurence.digits);
        }
        occurence = new Occurence();
    }
    cursor.y++;
});

console.log(`Result: ${totalSum}`);

function checkIfAdjacentToSymbol(charPos: Position): Position | undefined {
    for (let x = charPos.x - 1; x <= charPos.x + 1; x++) {
        for (let y = charPos.y - 1; y <= charPos.y + 1; y++) {
            if (
                (y == charPos.y && x == charPos.x) ||
                x < 0 ||
                y < 0 ||
                x >= data[0].length ||
                y >= data.length
            ) {
                continue;
            }
            if (/[^\d\.]/g.test(data[y][x])) {
                return {
                    x: x,
                    y: y,
                };
            }
        }
    }
    return undefined;
}
