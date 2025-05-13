const express = require('express');
const output = require('./output.json');

const app = express();

app.use(express.json());

app.get('/api/output', (req, res) => {
        res.json(output);
    })


app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
})  