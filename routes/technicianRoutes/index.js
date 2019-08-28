const express = require('express');
const app = express.Router();

const LabTechnicianController = require('../../controllers/labTechnicians/labTechnicianController');
const Auth = require('../../middlewares/Authentication');

/* GET all users. */
app.get('/all', Auth.checkToken, LabTechnicianController.getAllTechnicians);
app.get('/profile/:id', Auth.checkToken, LabTechnicianController.getSingleTechnician);

module.exports = app;
