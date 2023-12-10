/*
    AdventOfCode 2023 
    Day 4 - Scratchcards
    2nd star

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/4
*/

const fs = require("fs");
const data = JSON.parse(fs.readFileSync("input.json").toString());

let totalSum = 0;
let staticCardCollection = [];

class Card {
    constructor(id, winNbrs, allNbrs) {
        this.id = id;
        this.winningNumbers = winNbrs;
        this.allNumbers = allNbrs;
        this.winNbrsCount = 0;
        this.copies = 1;
        this.countWinningNumbers();
    }

    countWinningNumbers() {
        this.winningNumbers.forEach((number) => {
            if (number != "" && this.allNumbers.includes(number)) {
                this.winNbrsCount++;
            }
        });
    }
}

Array.from(data).forEach((line) => {
    line = line.slice(5);

    let splittedLine = line.split(/[:|]/);

    let card = new Card(
        splittedLine[0],
        splittedLine[1].split(" "),
        splittedLine[2].split(" "),
        false
    );

    staticCardCollection.push(card);

    if (card.winNbrsCount > 0) {
        totalSum += Math.pow(2, card.winNbrsCount - 1);
    }
});

for (let i = 0; i < staticCardCollection.length; i++) {
    const card = staticCardCollection[i];

    for (let j = i + 1; j < i + 1 + card.winNbrsCount; j++) {
        staticCardCollection[j].copies += card.copies;
    }
}

console.log(`Star 1 : ${totalSum}`);
console.log(
    `Star 2 : ${staticCardCollection
        .map((card) => card.copies)
        .reduce((a, b) => a + b)}`
);
