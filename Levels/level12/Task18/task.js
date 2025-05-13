const fs = require('fs');
const path = require('path');

const sourceDir = 'sourceDir';
const targetDir = 'targetDir';


if (!fs.existsSync(sourceDir)) fs.mkdirSync(sourceDir);
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir);

function syncDirectories(src, tgt) {
    const srcFiles = new Set(fs.readdirSync(src));
    const tgtFiles = new Set(fs.readdirSync(tgt));

    srcFiles.forEach(file => {
        const srcFilePath = path.join(src, file);
        const tgtFilePath = path.join(tgt, file);
        const srcStat = fs.statSync(srcFilePath);
        
        if (srcStat.isDirectory()) {
            if (!fs.existsSync(tgtFilePath)) fs.mkdirSync(tgtFilePath);
            syncDirectories(srcFilePath, tgtFilePath); 
        } else {
            if (!fs.existsSync(tgtFilePath) || fs.statSync(tgtFilePath).mtime < srcStat.mtime) {
                fs.copyFileSync(srcFilePath, tgtFilePath);
                console.log(`Copied/Updated: ${tgtFilePath}`);
            }
        }
    });

    tgtFiles.forEach(file => {
        if (!srcFiles.has(file)) {
            const tgtFilePath = path.join(tgt, file);
            fs.rmSync(tgtFilePath, { recursive: true, force: true });
            console.log(`Deleted: ${tgtFilePath}`);
        }
    });
}


console.log(`Synchronizing ${targetDir} with ${sourceDir}...`);
syncDirectories(sourceDir, targetDir);
console.log('Synchronization complete.');
