const express = require('express');
const app = express.Router();

const UserController = require('../../controllers/users/UserController');
const Auth = require('../../middlewares/Authentication');

app.get('/all', Auth.checkToken, UserController.getAllUsers);
app.get('/profile/:id', Auth.checkToken, UserController.getSingleUser);
app.get('/profile', Auth.checkToken, UserController.getAuthUserProfile);

module.exports = app;
