  const express = require("express");
  const mongoose = require("mongoose");
  const cors = require("cors");

 const  app = express();
 app.use(cors());
 app.use(express.json());

 mongoose.connect("mongodb://127.0.0.1:27017/level");
 const db = mongoose.connection;
 db.on("error",console.error.bind(console,"connection error"));
 db.once("open",function(){
     console.log("connected");
 });


 app.get("/",function(req,res){
     res.send("hello");
 });
 const port = 3000;
 app.listen(port,function(){
     console.log("server started");
     console.log("mongodb is connected successfully")
 });