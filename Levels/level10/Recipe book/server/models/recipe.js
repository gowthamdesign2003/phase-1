const mongoose = require('mongoose')

const StudSchema = new mongoose.Schema({
    name: String,
    age: String,
    stud: String
})

const StudModel = mongoose.model("recipe", StudSchema)
module.exports = StudModel

