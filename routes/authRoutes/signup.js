/**
 * @description - This module handles all the routes for account creation for new users
 */
const express = require('express');
const app = express();

const {
    //users
    userEmailExists,
    userUsernameExists,
    userSignup,
    //doctors
    doctorEmailExists,
    doctorUsernameExists,
    doctorSignup,
    //pharmacists
    pharmacistEmailExists,
    pharmacistUsernameExists,
    pharmacistSignup,
    //lab technician
    labTechEmailExists,
    labTechUsernameExists,
    labTechSignup,
    requiredFields
} = require('../../controllers/authcontrollers/signup');
const Respond = require('../../services/responses');

app.get('/signup/test', (req, res, next) => {
    res.json({
        success: true,
        message: "success"
    })
});

app.post('/signup/user', userEmailExists, userUsernameExists, requiredFields, userSignup, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

app.post('/signup/doctor', doctorEmailExists, doctorUsernameExists, requiredFields, doctorSignup, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

app.post('/signup/pharmacist', pharmacistEmailExists, pharmacistUsernameExists, requiredFields, pharmacistSignup, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

app.post('/signup/labtech', labTechEmailExists, labTechUsernameExists, requiredFields, labTechSignup, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

module.exports = app;