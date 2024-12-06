/*
    AdventOfCode 2024 
    --- Day 4: Ceres Search ---
    1st & 2nd stars

    TypeScript solution by @shyxn
    https://adventofcode.com/2024/day/4
*/

import { readFileSync } from 'fs';

const findXmas = (table: string[][], xAtRow: number, xAtCol: number, width: number, height: number) => {
    
    const researches = {
        // Horizontal forwards
        inHorizontalForwards: xAtCol <= width - 3 && 
            [
                table[xAtRow][xAtCol + 1], 
                table[xAtRow][xAtCol + 2], 
                table[xAtRow][xAtCol + 3]
            ].join("") === 'MAS',

        // Horizontal backwards
        inHorizontalBackwards: xAtCol >= 3 && 
            [
                table[xAtRow][xAtCol - 1], 
                table[xAtRow][xAtCol - 2], 
                table[xAtRow][xAtCol - 3]
            ].join("") === 'MAS',
        
        // Vertical forwards
        inVerticalForwards: xAtRow <= height - 3 && 
            [
                table[xAtRow + 1][xAtCol], 
                table[xAtRow + 2][xAtCol], 
                table[xAtRow + 3][xAtCol]
            ].join("") === 'MAS',
        
        // Vertical backwards
        inVerticalBackwards: xAtRow >= 3 && 
            [
                table[xAtRow - 1][xAtCol], 
                table[xAtRow - 2][xAtCol], 
                table[xAtRow - 3][xAtCol]
            ].join("") === 'MAS',

        // Diagonal T-L
        inDiagonalTopLeft: xAtRow >= 3 && xAtCol >= 3 &&
            [
                table[xAtRow - 1][xAtCol - 1], 
                table[xAtRow - 2][xAtCol - 2], 
                table[xAtRow - 3][xAtCol - 3]
            ].join("") === 'MAS',

        // Diagonal T-R
        inDiagonalTopRight: xAtRow >= 3 && xAtCol <= width - 3 &&
            [
                table[xAtRow - 1][xAtCol + 1], 
                table[xAtRow - 2][xAtCol + 2], 
                table[xAtRow - 3][xAtCol + 3]
            ].join("") === 'MAS',

        // Diagonal B-L
        inDiagonalBottomLeft: xAtRow <= height - 3 && xAtCol >= 3 &&
            [
                table[xAtRow + 1][xAtCol - 1], 
                table[xAtRow + 2][xAtCol - 2], 
                table[xAtRow + 3][xAtCol - 3]
            ].join("") === 'MAS',
        
        // Diagonal B-R
        inDiagonalBottomRight: xAtRow <= height - 3 && xAtCol <= width - 3 &&
            [
                table[xAtRow + 1][xAtCol + 1], 
                table[xAtRow + 2][xAtCol + 2], 
                table[xAtRow + 3][xAtCol + 3]
            ].join("") === 'MAS',
    }

    // Count the true cases
    return Object.values(researches).filter((research) => research).length;
}

const findXmasCross = (table: string[][], aAtRow: number, aAtCol: number, width: number, height: number) => {

    if (aAtRow === 0 || aAtRow === height || aAtCol === 0 || aAtCol === width) return 0;

    return ['MSSM', 'SMMS', 'SSMM', 'MMSS'].includes([
        table[aAtRow - 1][aAtCol - 1], 
        table[aAtRow - 1][aAtCol + 1], 
        table[aAtRow + 1][aAtCol + 1],
        table[aAtRow + 1][aAtCol - 1],
    ].join(""));
}

(() => {
    const inputPath = {
        intro: __dirname + '/input-intro.txt',
        real: __dirname + '/input.txt'
    }

    const file: string = readFileSync(inputPath.real).toString();

    const lines: string[][] = file.split("\r\n").map(line => Array.from(line));

    let star1 = 0, star2 = 0;

    for (let r = 0; r < lines.length; r++) {
        const row: string[] = lines[r];

        for (let c = 0; c < row.length; c++) {

            if (row[c] === 'X') {
                star1 += findXmas(lines, r, c, row.length - 1, lines.length - 1);
            }

            if (row[c] === 'A' && findXmasCross(lines, r, c, row.length - 1, lines.length - 1)) {
                star2++;
            }
        }
    }

    console.log({
        star1: star1,
        star2: star2,
    })
})();
