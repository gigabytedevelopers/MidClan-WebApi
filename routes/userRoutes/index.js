var express = require('express');
var app = express.Router();

var UserController = require('../../controllers/users/userController');
var Auth = require('../../middlewares/Authentication');

app.get('/all', Auth.checkToken, UserController.getAllUsers);
app.get('/profile/:id', Auth.checkToken, UserController.getSingleUser);

module.exports = app;
