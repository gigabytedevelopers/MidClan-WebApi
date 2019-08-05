/**
 * @description - This module handles all the routes for logging an account in and out
 */
const express = require('express');
const app = express();
const Respond = require('../../services/responses');

const {
    validatePassword,
    generateToken
} = require('../../controllers/authcontrollers/login');

app.get('/test', (req, res, next) => {
    res.json({
        success: true,
        message: "success"
    })
});

app.post('/login', validatePassword, generateToken, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

module.exports = app;