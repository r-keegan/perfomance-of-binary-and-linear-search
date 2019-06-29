//Make lists of different sizes and randomnesss and store them for every algo to run against

//run each algo against each data set and record results

function binarySearch(max) {
    let guessCount = 1;
    let min = 0;
    let computerGuess = average(min, max);
    let secretNum = selectRandomNumberFromRange(min, max);
    let data;

    function selectRandomNumberFromRange(min, max) {
        return Math.floor((Math.random() * (max - min)) + min); //selects a random number b/w ranges
    }
    function average(min, max) {
        return Math.floor((max + min) / 2 );
    }

    while(computerGuess !== secretNum) {
        if(secretNum < computerGuess) {
            max = computerGuess - 1;
        }
        else {
            min = computerGuess + 1;
        }
        computerGuess = average(min, max);
        guessCount++;
    }

    data = [guessCount];
    return data
}

function linearSearch(max) {
    let guessCount = 1;
    let min = 0;
    let arrayOfNumbersWithinRange = Array.from({length: max}, (v, k) => k+1);
    let secretNum = selectRandomNumberFromRange(min, max);
    let data;

    function selectRandomNumberFromRange(min, max) {
        return Math.floor((Math.random() * (max - min)) + min); //selects a random number b/w ranges
    }

    for(let i =0; i < arrayOfNumbersWithinRange.length; i++) {
        if(arrayOfNumbersWithinRange[i] === secretNum) {
            return i;
        } else {
            guessCount++;
        }
    }
    data = [guessCount];
    return data
}

function searchTimeNano(functionToRun, maxNum) {
    let start = process.hrtime();
    functionToRun(maxNum);
    let end = process.hrtime(start);
    return end[0] * 1000000000 + end[1];
}

function allTimesOfSearchNano(functionToRun) {
    let dict = {};

    for (let i =2000; i < 10000000; i+=1000){
        let maxNum = [i];

        var item = 0;
        let timesToRunForEachIndex = 100000;
        for(let x = 0; x<timesToRunForEachIndex; x++){
            item += searchTimeNano(functionToRun, maxNum);
        }

        dict[i] = item/timesToRunForEachIndex;
    }
    return dict;
}

let binaryDataToParse = allTimesOfSearchNano(binarySearch);
let linearDataToParse = allTimesOfSearchNano(linearSearch);

let binaryListLength = Object.keys(binaryDataToParse);
let binaryTimedNanosec = Object.values(binaryDataToParse);

let linearListLength = Object.keys(linearDataToParse);
let linearTimedNanosec = Object.values(linearDataToParse)

let csvContent = toCSVLine(binaryListLength) + toCSVLine(binaryTimedNanosec) + toCSVLine(linearListLength) + toCSVLine(linearTimedNanosec);

function toCSVLine(array){
    return array.join(',') + '\n'
}
let fs = require("fs");

fs.writeFile("guess.csv", csvContent, (err) => {
    if (err) console.log(err);
    console.log("Successfully Written to File.");
});

