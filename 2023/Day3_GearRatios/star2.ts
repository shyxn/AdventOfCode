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
    public linkedGear: Gear | undefined;
}

class Gear {
    public pos: Position;
    public linkedNumbers: string[] = [];

    constructor(pos: Position) {
        this.pos = pos;
    }
}

const cursor: Position = {
    x: 0,
    y: 0,
};

let totalSum = 0;

let gears: Gear[] = [];
const findGear = (gear: Gear) =>
    gears.find(
        (gearToFind) =>
            JSON.stringify(gearToFind.pos) == JSON.stringify(gear.pos)
    );

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

data.forEach((line: string) => {
    let occurence = new Occurence();

    for (cursor.x = 0; cursor.x < line.length; cursor.x++) {
        const char = line[cursor.x];

        if (!isNaN(parseInt(char))) {
            occurence.digits += char;

            const symbolPos = checkIfAdjacentToSymbol(cursor);
            if (!occurence.linkedGear && symbolPos) {
                occurence.linkedGear = new Gear(symbolPos);
            }

            if (!(cursor.x == line.length - 1)) {
                continue;
            }
        }

        if (occurence.digits.length > 0 && occurence.linkedGear !== undefined) {
            totalSum += parseInt(occurence.digits);

            const foundGear = findGear(occurence.linkedGear);
            if (foundGear) {
                occurence.linkedGear = foundGear;
            } else {
                gears.push(occurence.linkedGear);
            }

            occurence.linkedGear.linkedNumbers.push(occurence.digits);
        }
        occurence = new Occurence();
    }
    cursor.y++;
});

gears = gears.filter((gear) => gear.linkedNumbers.length == 2);

const gearRatios: number[] = gears.map(
    (gear) => parseInt(gear.linkedNumbers[0]) * parseInt(gear.linkedNumbers[1])
);

const totalRatiosSum = gearRatios.reduce((a, b) => a + b);

console.log(`(Star 1) Result : ${totalSum}`);
console.log(`(Star 2) Result : ${totalRatiosSum}`);
