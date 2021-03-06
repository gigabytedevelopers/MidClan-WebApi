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
const Base64Handler = require('../../utilities/base64Handler');

app.get('/signup/test', (req, res, next) => {
    res.json({
        success: true,
        message: "success"
    })
});

app.post('/signup/user', requiredFields, userEmailExists, userUsernameExists, Base64Handler.toImageFromReq, userSignup,
    (req, res, next) => {
        Respond(res).success({
            data: req.data,
            token: req.token
        })
})

app.post('/signup/doctor', requiredFields, doctorEmailExists, doctorUsernameExists, Base64Handler.toImageFromReq, doctorSignup,
    (req, res, next) => {
        Respond(res).success({
            data: req.data,
            token: req.token
        })
})

app.post('/signup/pharmacist', requiredFields, pharmacistEmailExists, pharmacistUsernameExists, Base64Handler.toImageFromReq, pharmacistSignup,
    (req, res, next) => {
        Respond(res).success({
            data: req.data,
            token: req.token
        })
})

app.post('/signup/labtech', requiredFields, labTechEmailExists, labTechUsernameExists, Base64Handler.toImageFromReq, labTechSignup,
    (req, res, next) => {
        Respond(res).success({
            data: req.data,
            token: req.token
        })
})

module.exports = app;
