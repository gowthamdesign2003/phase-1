const fs = require('fs');

const data = "Hello, Node.js!";
const filePath = "output.txt";

// Write data to output.txt
fs.writeFile(filePath, data, 'utf8', (err) => {
    if (err) {
        console.error("Error writing file:", err);
        return;
    }
    console.log(`File "${filePath}" has been written successfully!`);
});
