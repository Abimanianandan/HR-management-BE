// import mongoose 
const mongoose = require('mongoose');

// create schema
const userSchema = new mongoose.Schema({
    username:String,
    passwordHash:String,
    name:String,
    location:{
        type:String,
        default:'Unkown'
    },
    role:{
        type:String,
        enum:['user'],
        default:"user"
    }
})

// create a  model from the schema and export it
module.exports = mongoose.model('user',userSchema,'users');
