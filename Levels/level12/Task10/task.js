const fs = require('fs');
const filePath = 'copy.txt'; // The file to be deleted

// Create a test file to delete (if it doesn't exist)
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'This is a test file.', 'utf8');
    console.log('Test file created.');
}

// Check if the file exists before deleting
fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
        console.error(`File not found: ${filePath}`);
        return;
    }
    
    // Delete the file
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file: ${err.message}`);
            return;
        }
        console.log(`File deleted successfully: ${filePath}`);
    });
});
