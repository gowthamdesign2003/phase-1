const express = require('express');

const app = express();

app.use(express.json());

app.get('/users/:_id', (req, res) => {
    const userId = req.params._id
    res.send(`userId: ${userId}`);
})
app.listen(3001, () => {
    console.log('Server is running on port http://localhost:3000');
});

