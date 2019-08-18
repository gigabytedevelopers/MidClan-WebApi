/**
 * @description - This module handles all the routes for logging an account in and out
 */
const express = require('express');
const app = express();
const Respond = require('../../services/responses');

const {
    validateUserPassword,
    validateDoctorPassword,
    validatePharmacistPassword,
    validateLabTechPassword,
    generateToken
} = require('../../controllers/authcontrollers/login');

app.get('/test', (req, res, next) => {
    res.json({
        success: true,
        message: "success"
    })
});

app.post('/login/user', validateUserPassword, generateToken, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

app.post('/login/doctor', validateDoctorPassword, generateToken, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

app.post('/login/pharmacist', validatePharmacistPassword, generateToken, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

app.post('/login/labtech', validateLabTechPassword, generateToken, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

module.exports = app;