const mongoose = require('mongoose');

const salarySchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    basicPay: {
        type: Number,
        required: true
    },
    allowances: {
        type: Number,
        required: true
    },
    bonuses: {
        type: Number,
        required: true
    },
    deductions: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    paymentDate: {
        type: String,
        default: () => new Date().toLocaleDateString('en-US')
    }
});

module.exports = mongoose.model('salary', salarySchema,'salaries');
