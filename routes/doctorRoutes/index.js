var express = require('express');
var app = express.Router();

var DoctorController = require('../../controllers/doctors/DoctorController');
var Auth = require('../../middlewares/Authentication');

app.get('/all', Auth.checkToken, DoctorController.getAllDoctors);
app.get('/profile/:id', Auth.checkToken, DoctorController.getSingleDoctor);
app.get('/profile/', Auth.checkToken, DoctorController.getAuthDoctorProfile);

module.exports = app;
