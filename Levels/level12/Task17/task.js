const fs = require('fs');
const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

const inputFile = 'sensitive.txt';
const encryptedFile = 'sensitive.enc';
const decryptedFile = 'sensitive_decrypted.txt';

// Create test file if it doesn't exist
if (!fs.existsSync(inputFile)) {
    fs.writeFileSync(inputFile, 'This is very sensitive information.', 'utf8');
    console.log(`Test file created: ${inputFile}`);
}

// Encryption function
function encryptFile(input, output) {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    const inputStream = fs.createReadStream(input);
    const outputStream = fs.createWriteStream(output);
    
    inputStream.pipe(cipher).pipe(outputStream);
    outputStream.on('finish', () => console.log(`File encrypted: ${output}`));
}

// Decryption function
function decryptFile(input, output) {
    const decipher = crypto.createDecipheriv(algorithm, key, iv);
    const inputStream = fs.createReadStream(input);
    const outputStream = fs.createWriteStream(output);
    
    inputStream.pipe(decipher).pipe(outputStream);
    outputStream.on('finish', () => {
        console.log(`File decrypted: ${output}`);
        // Verify content
        const original = fs.readFileSync(inputFile, 'utf8');
        const decrypted = fs.readFileSync(output, 'utf8');
        console.log(original === decrypted ? 'Decryption verified!' : 'Decryption failed!');
    });
}

// Execute encryption and decryption
encryptFile(inputFile, encryptedFile);
setTimeout(() => decryptFile(encryptedFile, decryptedFile), 1000);
