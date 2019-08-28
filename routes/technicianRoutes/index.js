const express = require('express');
const app = express.Router();

const LabTechnicianController = require('../../controllers/labTechnicians/labTechnicianController');
const Auth = require('../../middlewares/Authentication');
// endpoints
app.get('/all', Auth.checkToken, LabTechnicianController.getAllTechnicians);
app.get('/profile/:id', Auth.checkToken, LabTechnicianController.getSingleTechnician);
app.get('/profile', Auth.checkToken, LabTechnicianController.getAuthLabTechProfile);

module.exports = app;
