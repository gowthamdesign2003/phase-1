const express = require("express");

const app = express();

app.use(express.json());

app.get('/',(req,res)=>{
    res.send("Hello")
})

app.get('/about',(req,res)=>{
    res.send("about page")
})

app.get('/contact',(req,res)=>{
    res.send("contact page")
})

app.get('/service',(req,res)=>{
    res.send("service page")
})
app.listen(3000,()=>{
    console.log('Server is running on port 3000')
})