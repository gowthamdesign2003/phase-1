const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'new_folder');

fs.access(directoryPath, fs.constants.F_OK, (err) => {
  if (err) {
    // Directory does not exist, create it
    fs.mkdir(directoryPath, (err) => {
      if (err) {
        console.error('Error creating directory:', err);
        return;
      }
      console.log('Directory "new_folder" created successfully!');
    });
  } else {
    // Directory already exists
    console.log('The directory "new_folder" alrady.');
  }
});