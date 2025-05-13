const fs = require('fs');
const path = require('path');

const directoryPath = 'testDir'; // Directory to read

// Function to read directory recursively
function readDirectory(dir) {
    fs.readdir(dir, (err, files) => {
        if (err) {
            console.error(`Error reading directory: ${err.message}`);
            return;
        }

        files.forEach(file => {
            const fullPath = path.join(dir, file);
            fs.stat(fullPath, (err, stats) => {
                if (err) {
                    console.error(`Error retrieving stats for ${fullPath}: ${err.message}`);
                    return;
                }
                
                if (stats.isDirectory()) {
                    console.log(`Directory: ${fullPath}`);
                    readDirectory(fullPath); // Recursive call
                } else {
                    console.log(`File: ${fullPath}`);
                }
            });
        });
    });
}

// Ensure the directory exists before reading
if (fs.existsSync(directoryPath)) {
    console.log(`Reading directory: ${directoryPath}`);
    readDirectory(directoryPath);
} else {
    console.error(`Directory not found: ${directoryPath}`);
}
