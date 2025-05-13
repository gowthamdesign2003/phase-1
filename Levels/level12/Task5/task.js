const fs = require('fs');

const filePath = "test.txt"; // Change this to the file you want to check

fs.stat(filePath, (err, stats) => {
    if (err) {
        console.error("Error fetching file stats:", err);
        return;
    }

    console.log(`File Information for: ${filePath}`);
    console.log(`Size: ${stats.size} bytes`);
    console.log(`Created: ${new Date(stats.birthtime).toLocaleString()}`);
    console.log(`Last Modified: ${new Date(stats.mtime).toLocaleString()}`);
});
