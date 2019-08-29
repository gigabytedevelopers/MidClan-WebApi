const mongoose = require('mongoose');

const LabTechnicianSchema = new mongoose.Schema({
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
        required: true,
        trim: true,
        default: 0,
    },
    profilepicture: {
        type: String,
        default: 'https://image.freepik.com/free-photo/blue-orange-cactus-vase-isolated_6607-236.jpg'
    },
    dob: {
        type: String,
        trim: true,
        default: ''
    },
    state: {
        type: String,
        trim: true,
        default: ''
    },
    lga: {
        type: String,
        trim: true,
        default: ''
    },
    college: {
        type: String,
        trim: true,
        default: ''
    },
    university: {
        type: String,
        trim: true,
        default: ''
    },
    almamata: {
        type: String,
        trim: true,
        default: ''
    },
    referee: {
        type: String,
        trim: true,
        default: ''
    },
    biodata: {
        type: String,
        trim: true,
        default: ''
    },
    testlog: {
        type: Array,
        trim: true,
        default: ''
    },
    testcases: {
        type: Array,
        trim: true,
        default: ''
    },
    yearsofexperience: {
        type: String,
        trim: true,
        default: ''
    },
    professionalqualifications: {
        type: Array,
        trim: true,
        default: ''
    },
    gender: {
        type: String,
        trim: true,
        default: ''
    },
    bloodgroup: {
        type: String,
        trim: true,
        default: ''
    },
    genotype: {
        type: String,
        trim: true,
        default: ''
    },
    height: {
        type: String,
        trim: true,
        default: ''
    },
    weight: {
        type: String,
        trim: true,
        default: ''
    },
    bp: {
        type: String,
        trim: true,
        default: ''
    },
    password: {
        type: String,
        required: true,
        default: ''
    },
    created: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('LabTechnicians', LabTechnicianSchema);
