const fs = require('fs');

const filePath = "test.txt";

// Check if file exists
if (fs.existsSync(filePath)) {
    console.log(`The file "${filePath}" exists.`);
} else {
    console.log(`The file "${filePath}" does not exist.`);
}
