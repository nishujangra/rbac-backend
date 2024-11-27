const mongoose = require('mongoose');

const timesheetSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    hoursWorked: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['pending', 'approved', 'rejected']
    }
}, { timestamps: true });

const Timesheet = mongoose.model('Timesheet', timesheetSchema);

module.exports = Timesheet;