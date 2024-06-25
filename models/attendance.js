const mongoose = require('mongoose');

// Define attendance schema
const attendanceSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['present', 'absent'],
        required: true
    },
   
});

// Create a model from the schema and export it
module.exports = mongoose.model('Attendance', attendanceSchema,'Attendance')
