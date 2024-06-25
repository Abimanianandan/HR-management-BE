const mongoose = require('mongoose');

const leaveSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserId',
        required: true
    },
    leaveType: {
        type: String,
        enum: ['Sick', 'Casual', 'Paid', 'Unpaid'],
        required: true
    },
    startDate: {
        type: String,
        required: true
    },
    endDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        default: 'Pending'
    },
    reason: {
        type: String,
        required: true
    },
    appliedDate: {
        type: String,
        default: () => new Date().toLocaleDateString('en-US')
    }
});

module.exports = mongoose.model('Leave', leaveSchema,'Leaves');
