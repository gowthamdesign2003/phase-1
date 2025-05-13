const fs = require('fs');
const path = require('path');

const watchDir = 'watchedDir';
const logFile = 'fsWatcher.log';

if (!fs.existsSync(watchDir)) {
    fs.mkdirSync(watchDir);
    console.log(`Watching directory created: ${watchDir}`);
}

function logChange(message) {
    const logEntry = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFile(logFile, logEntry, (err) => {
        if (err) console.error(`Error logging change: ${err.message}`);
    });
    console.log(message);
}

fs.watch(watchDir, { recursive: true }, (eventType, filename) => {
    if (filename) {
        logChange(`File ${eventType}: ${path.join(watchDir, filename)}`);
    }
});

console.log(`Now watching ${watchDir} for changes...`);