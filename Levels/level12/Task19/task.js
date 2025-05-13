const fs = require('fs');
const zlib = require('zlib');
const path = require('path');

const inputFile = 'test.txt';
const compressedFile = 'test.txt.gz';
const decompressedFile = 'test_decompressed.txt';

if (!fs.existsSync(inputFile)) {
    fs.writeFileSync(inputFile, 'This is a sample text file for compression.', 'utf8');
    console.log(`Test file created: ${inputFile}`);
}

function compressFile(input, output) {
    const readStream = fs.createReadStream(input);
    const writeStream = fs.createWriteStream(output);
    const gzip = zlib.createGzip();

    readStream.pipe(gzip).pipe(writeStream).on('finish', () => {
        console.log(`File compressed: ${output}`);
    }).on('error', (err) => {
        console.error(`Compression error: ${err.message}`);
    });
}

function decompressFile(input, output) {
    const readStream = fs.createReadStream(input);
    const writeStream = fs.createWriteStream(output);
    const gunzip = zlib.createGunzip();

    readStream.pipe(gunzip).pipe(writeStream).on('finish', () => {
        console.log(`File decompressed: ${output}`);
        const original = fs.readFileSync(inputFile, 'utf8');
        const decompressed = fs.readFileSync(output, 'utf8');
        console.log(original === decompressed ? 'Decompression verified!' : 'Decompression failed!');
    }).on('error', (err) => {
        console.error(`Decompression error: ${err.message}`);
    });
}

compressFile(inputFile, compressedFile);
setTimeout(() => decompressFile(compressedFile, decompressedFile), 1000);
