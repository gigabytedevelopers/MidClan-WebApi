var express = require('express');
var app = express.Router();

var PharmacistController = require('../../controllers/pharmacists/pharmacistController');
var Auth = require('../../middlewares/Authentication');

/* GET all users. */
app.get('/all', Auth.checkToken, PharmacistController.getAllPharmacists);
app.get('/profile/:id', Auth.checkToken, PharmacistController.getSinglePharmacist);

module.exports = app;
