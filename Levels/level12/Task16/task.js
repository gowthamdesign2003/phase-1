const fs = require('fs');
const path = require('path');

const inputFilePath = 'data.csv';
const outputFilePath = 'results.csv';


const sampleData = `Name,Age,Score\nAlice,25,85\nBob,30,90\nCharlie,28,78`;

if (!fs.existsSync(inputFilePath)) {
    fs.writeFileSync(inputFilePath, sampleData);
    console.log(`CSV file created: ${inputFilePath}`);
}

fs.readFile(inputFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
    }

    const lines = data.trim().split('\n');
    const headers = lines[0].split(',');
    const rows = lines.slice(1).map(line => line.split(','));

    const scores = rows.map(row => parseFloat(row[2]));
    const averageScore = (scores.reduce((sum, score) => sum + score, 0) / scores.length).toFixed(2);
    const maxScore = Math.max(...scores);
    const minScore = Math.min(...scores);

    const resultData = `Metric,Value\nAverage Score,${averageScore}\nMax Score,${maxScore}\nMin Score,${minScore}`;

    fs.writeFile(outputFilePath, resultData, (err) => {
        if (err) {
            console.error(`Error writing file: ${err.message}`);
            return;
        }
        console.log(`Processed results written to: ${outputFilePath}`);
    });
});
