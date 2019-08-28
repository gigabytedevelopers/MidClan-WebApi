var express = require('express');
var app = express.Router();

var DoctorController = require('../../controllers/doctors/doctorController');
var Auth = require('../../middlewares/Authentication');

app.get('/all', Auth.checkToken, DoctorController.getAllDoctors);
app.get('/profile/:id', Auth.checkToken, DoctorController.getSingleDoctor);

module.exports = app;
