/*
    AdventOfCode 2023 
    Day 9 - Mirage Maintenance
    1st & 2nd stars

    Javascript solution by @shyxn
    https://adventofcode.com/2023/day/9
*/

const fs = require("fs");

const data = fs.readFileSync("input.txt").toString().split("\r\n");

const rows = data.map((seqLine) =>
    seqLine.split(" ").map((digits) => parseInt(digits))
);

const seqCollections = [];

rows.forEach((seq) => {
    const pyramid = [];

    pyramid.push(seq);

    let currentSeq = [...seq];

    while (!currentSeq.every((nb) => nb == 0)) {
        const newSeq = [];

        for (let i = 0; i < currentSeq.length - 1; i++) {
            newSeq.push(currentSeq[i + 1] - currentSeq[i]);
        }

        pyramid.push(newSeq);
        currentSeq = newSeq;
    }
    seqCollections.push(pyramid);
});

calculateStar1();
calculateStar2();

function calculateStar1() {
    let totalSum = 0;

    seqCollections.forEach((pyramid) => {
        totalSum += pyramid
            .map((seq) => [...seq].reverse()[0])
            .reduce((a, b) => a + b);
    });

    console.log(`Star 1: ${totalSum}`);
}

function calculateStar2() {
    let totalSum = 0;

    seqCollections.forEach((pyramid) => {
        pyramid = pyramid.map((seq) => seq[0]).reverse();
        let tempSum = 0;

        for (let i = 1; i < pyramid.length; i++) {
            tempSum = pyramid[i] - tempSum;
        }
        totalSum += tempSum;
    });

    console.log(`Star 2: ${totalSum}`);
}
