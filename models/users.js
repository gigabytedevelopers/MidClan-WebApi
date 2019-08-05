const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    username: {
        type: String,
        required: true,
        trim: true,
        default: ''
    },
    email: {
        type: String,
        required: true,
        trim: true,
        default: '',
        unique: true
    },
    mobileno: {
        type: Number,
        trim: true,
        default: 0,
    },
    address: {
        type: String,
        trim: true,
        default: ''
    },
    state: {
        type: String,
        trim: true,
        default: ''
    },
    country: {
        type: String,
        trim: true,
        default: ''
    },
    dob: {
        type: String,
        trim: true,
        default: ''
    },
    gender: {
        type: String,
        trim: true,
        default: ''
    },
    password: {
        type: Object,
        required: true,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Users', userSchema);