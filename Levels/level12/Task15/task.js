const fs = require('fs');
const filePath = 'data.json';

const initialData = [
    { "id": 1, "name": "Alice", "age": 25 },
    { "id": 2, "name": "Bob", "age": 30 }
];

if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(initialData, null, 2));
    console.log(`JSON file created: ${filePath}`);
}

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
        return;
    }

    try {
        let jsonData = JSON.parse(data);
        
        jsonData.push({ "id": 3, "name": "Charlie", "age": 28 });

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
            if (err) {
                console.error(`Error writing file: ${err.message}`);
                return;
            }
            console.log(`JSON file updated successfully: ${filePath}`);
        });
    } catch (parseError) {
        console.error(`Error parsing JSON: ${parseError.message}`);
    }
});
