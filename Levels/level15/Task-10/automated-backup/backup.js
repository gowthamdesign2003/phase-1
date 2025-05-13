const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { CronJob } = require('cron');

// Utility function to create timestamped backup folder
const createTimestampedBackupFolder = (backupLocation) => {
  const timestamp = new Date().toISOString().replace(/:/g, '-');
  const backupFolder = path.join(backupLocation, `backup_${timestamp}`);
  
  // Ensure that the backup folder exists (create if it doesn't)
  fs.mkdirSync(backupFolder, { recursive: true });

  return backupFolder;
};

// Utility function to log backup operations
const logBackup = (message) => {
  const logFile = path.join(__dirname, 'backup.log');
  const logMessage = `[${new Date().toISOString()}] ${message}\n`;
  fs.appendFileSync(logFile, logMessage);
};

// Function to perform the backup
const performBackup = (sourceDir, backupLocation) => {
  try {
    // Ensure the source directory exists
    if (!fs.existsSync(sourceDir)) {
      logBackup(`Source directory ${sourceDir} does not exist.`);
      console.error(`Source directory ${sourceDir} does not exist.`);
      return;
    }

    // Ensure the backup directory exists
    if (!fs.existsSync(backupLocation)) {
      logBackup(`Backup directory ${backupLocation} does not exist. Creating it now.`);
      fs.mkdirSync(backupLocation, { recursive: true });
    }

    const backupFolder = createTimestampedBackupFolder(backupLocation);
    fs.copySync(sourceDir, backupFolder);
    logBackup(`Backup successful from ${sourceDir} to ${backupFolder}`);

    // Optionally, compress the backup folder to reduce size
    compressBackup(backupFolder);

  } catch (error) {
    logBackup(`Error during backup: ${error.message}`);
    console.error(`Backup failed: ${error.message}`);
  }
};

// Function to compress backup folder
const compressBackup = (backupFolder) => {
  const output = fs.createWriteStream(`${backupFolder}.zip`);
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.pipe(output);
  archive.directory(backupFolder, false);
  archive.finalize();

  output.on('close', () => {
    logBackup(`Backup compressed into ${backupFolder}.zip`);
    fs.removeSync(backupFolder); // Remove the uncompressed folder after zipping
  });
};

// Function to schedule backups using Cron
const scheduleBackup = (sourceDir, backupLocation, cronTime) => {
  new CronJob(cronTime, () => {
    console.log('Running scheduled backup...');
    performBackup(sourceDir, backupLocation);
  }, null, true, 'America/Los_Angeles');
};

// Function to clean up old backups (keep the latest n backups)
const cleanUpBackups = (backupLocation, maxBackups) => {
  try {
    const backups = fs.readdirSync(backupLocation)
      .filter(file => file.startsWith('backup_'))
      .map(file => path.join(backupLocation, file));

    // Sort backups by modification date
    backups.sort((a, b) => fs.statSync(b).mtime - fs.statSync(a).mtime);

    // Keep only the latest `maxBackups` backups
    backups.slice(maxBackups).forEach(backup => fs.removeSync(backup));
    logBackup(`Cleaned up backups, keeping the latest ${maxBackups}`);
  } catch (error) {
    logBackup(`Error cleaning up backups: ${error.message}`);
    console.error(`Cleanup failed: ${error.message}`);
  }
};

// One-time backup
const oneTimeBackup = (sourceDir, backupLocation) => {
  performBackup(sourceDir, backupLocation);
};

// Main function to start the backup tool
const main = () => {
  const sourceDir = path.join(__dirname, 'source'); // Replace with actual source directory path
  const backupLocation = path.join(__dirname, 'backups'); // Replace with actual backup location
  const cronTime = '0 0 * * *'; // Daily at midnight (cron syntax)

  // One-time backup
  oneTimeBackup(sourceDir, backupLocation);

  // Scheduled backup (e.g., daily)
  scheduleBackup(sourceDir, backupLocation, cronTime);

  // Clean up old backups (keep 3 latest backups)
  cleanUpBackups(backupLocation, 3);
};

// Run the backup process
main();
