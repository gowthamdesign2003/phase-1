const fs = require('fs');

const dataToAppend = "\nMore content here.";
const filePath = "output.txt";

// Append data to output.txt
fs.appendFile(filePath, dataToAppend, 'utf8', (err) => {
    if (err) {
        console.error("Error appending to file:", err);
        return;
    }
    console.log(`Data successfully appended to "${filePath}"!`);
});
