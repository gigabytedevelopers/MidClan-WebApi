/**
 * @description - This module handles all the routes for logging an account in and out
 */
const express = require('express');
const app = express();

app.get('/test', (req, res, next) => {
    res.json({
        success: true,
        message: "success"
    })
});

module.exports = app;