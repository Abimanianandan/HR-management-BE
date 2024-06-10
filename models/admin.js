// import mongoose 
const mongoose = require('mongoose');

// create schema
const adminSchema = new mongoose.Schema({
    adminname:String,
    passwordHash:String,
    name:String,
    location:{
        type:String,
        default:'Unkown'
    },
    role:{
        type:String,
        enum:['admin'],
        default:"admin"
    }
})

// create a  model from the schema and export it
module.exports = mongoose.model('admin',adminSchema,'admins');
