/**
 * @description - This module handles all the routes for account creation for new users
 */
const express = require('express');
const app = express();

const signupController = require('../../controllers/authcontrollers/signup');
const Respond = require('../../services/responses');

app.get('/signup/test', (req, res, next) => {
    res.json({
        success: true,
        message: "success"
    })
});

app.post('/signup', signupController.emailExists, signupController.usernameExists, signupController.requiredFields, signupController.signup, (req, res, next) => {
    Respond(res).success({
        data: req.data,
        token: req.token
    })
})

module.exports = app;