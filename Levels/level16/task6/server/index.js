const express = require('express');
const app = express();
// const public = __dirname + '/public';
const path = require('path');

app.use(express.static(path.join(__dirname,'public')));

// app.get('/',(req,res)=>{
//     res.send('public')
// })

app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
}); 
