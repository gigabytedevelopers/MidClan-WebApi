const express = require('express');
const app = express.Router();

const PharmacistController = require('../../controllers/pharmacists/pharmacistController');
const Auth = require('../../middlewares/authentication');

app.get('/all', Auth.checkToken, PharmacistController.getAllPharmacists);
app.get('/profile/:id', Auth.checkToken, PharmacistController.getSinglePharmacist);
app.get('/profile', Auth.checkToken, PharmacistController.getAuthPharmacistProfile);

module.exports = app;
