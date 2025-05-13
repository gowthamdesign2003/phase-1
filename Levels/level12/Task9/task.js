const fs = require('fs');
const path = require('path');

const sourceFile = path.join(__dirname, 'source.txt');
const destinationFile = path.join(__dirname, 'copy.txt');


if (!fs.existsSync(sourceFile)) {
    fs.writeFileSync(sourceFile, 'This is the source file content.', 'utf8');
    console.log('Source file created.');
}


if (fs.existsSync(destinationFile)) {
    console.error('Error: Destination file already exists.');
} else {
    fs.copyFile(sourceFile, destinationFile, (err) => {
        if (err) {
            console.error('Error copying file:', err);
        } else {
            console.log(`File copied successfully to ${destinationFile}`);
        }
    });
}
