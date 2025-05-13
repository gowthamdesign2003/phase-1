var fs = require('fs');
var oldFilepath = 'oldfile.txt';
var newFilepath = 'newfile.txt';
fs.rename(oldFilepath, newFilepath, renameCallback);
function renameCallback(error) {
if(error) {
console.log('Error in renaming file');
console.log(error.message);
}else{
console.log("Renamed successfully");
}
}