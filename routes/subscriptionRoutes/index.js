const express = require('express');
const app = express.Router();

const subscriptionController = require('../../controllers/subscriptions/subscriptionController');
const Auth = require('../../middlewares/Authentication');
// endpoints
app.get('/all', Auth.checkToken, subscriptionController.getSubscriptions);

module.exports = app;
