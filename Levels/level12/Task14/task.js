const fs = require('fs');
const path = require('path');

const sourceFile = 'copy.txt';
const destinationFile = 'copyCopy.txt';

if (!fs.existsSync(sourceFile)) {
    const content = 'A'.repeat(1024 * 1024); // 1MB of data
    fs.writeFileSync(sourceFile, content);
    console.log(`Test file created: ${sourceFile}`);
}

const readStream = fs.createReadStream(sourceFile);
const writeStream = fs.createWriteStream(destinationFile);

let copiedBytes = 0;
fs.stat(sourceFile, (err, stats) => {
    if (err) {
        console.error(`Error getting file stats: ${err.message}`);
        return;
    }
    const totalBytes = stats.size;

    readStream.on('data', (chunk) => {
        copiedBytes += chunk.length;
        console.log(`Progress: ${((copiedBytes / totalBytes) * 100).toFixed(2)}%`);
    });

    readStream.on('error', (err) => {
        console.error(`Read error: ${err.message}`);
    });

    writeStream.on('error', (err) => {
        console.error(`Write error: ${err.message}`);
    });

    writeStream.on('finish', () => {
        console.log(`File copied successfully to ${destinationFile}`);
    });

    // Pipe read stream to write stream
    readStream.pipe(writeStream);
});
