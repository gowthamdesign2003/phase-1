const fs = require('fs');
const filePath = 'copy.txt'; 


if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, 'Initial content', 'utf8');
    console.log(`File created: ${filePath}`);
}


fs.watch(filePath, (eventType, filename) => {
    if (filename) {
        console.log(`File ${filename} was ${eventType}`);
    } else {
        console.log('Filename not provided');
    }
});

console.log(`Watching for changes in ${filePath}...`);
