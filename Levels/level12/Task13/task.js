const fs = require('fs');
const path = require('path');
const os = require('os');

const tempPrefix = path.join(os.tmpdir(), 'tempDir-');


fs.mkdtemp(tempPrefix, (err, tempDir) => {
    if (err) {
        console.error(`Error creating temporary directory: ${err.message}`);
        return;
    }
    console.log(`Temporary directory created: ${tempDir}`);

   
    for (let i = 1; i <= 3; i++) {
        const tempFilePath = path.join(tempDir, `tempFile${i}.txt`);
        const fileContent = `This is temporary file ${i}`;

        fs.writeFile(tempFilePath, fileContent, (err) => {
            if (err) {
                console.error(`Error writing to file ${tempFilePath}: ${err.message}`);
                return;
            }
            console.log(`Temporary file created: ${tempFilePath}`);
        });
    }
});
