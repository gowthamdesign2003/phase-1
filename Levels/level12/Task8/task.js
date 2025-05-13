const fs = require('fs');
const path = require('path');

// Read the contents of the current directory
fs.readdir(__dirname, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.forEach(file => {
        const filePath = path.join(__dirname, file);
        
        try {
            const stats = fs.statSync(filePath);
            if (stats.isDirectory()) {
                console.log(`[DIR]  ${file}`);
            } else {
                console.log(`[FILE] ${file}`);
            }
        } catch (error) {
            console.error('Error retrieving file stats:', error);
        }
    });
});
