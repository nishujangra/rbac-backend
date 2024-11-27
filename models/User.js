const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum: ['admin', 'employee', 'manager'] // Add other roles as needed
    },
    department: {
        type: String,
        required: function() {
            return this.role !== 'admin';
        }
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;