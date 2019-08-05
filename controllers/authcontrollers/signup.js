/**
 * @description - This module is a middleware that handles account login authentications
 */
const usersModel = require('../../models/users');
const Respond = require('../../services/responses');
const hasher = require('../../services/hasher');
const jwt = require('jsonwebtoken');

function emailExists(req, res, next) {
    // Check if the provided mail by the user is already registered with an account
    usersModel.find({
            email: req.body.email
        })
        .then(data => {
            if (data.length > 0) { // If a user with the provided email already exists 
                Respond(res).error(500, 'accountCreationError', `A user has already been registered with the email  <b>${req.data.email}</b>`, '')
            } else {
                next();
            }
        })
        .catch(err => {
            Respond(res).error(500, 'accountCreationError', `A user has already been registered with the email ${req.body.email}`, err);
        })
}

function usernameExists(req, res, next) {
    // Check if the provided mail by the user is already registered with an account
    usersModel.find({
            username: req.body.username
        })
        .then(data => {
            if (data.length > 0) { // If a user with the provided email already exists 
                Respond(res).error(500, 'accountCreationError', `A user has already been registered with the username <b> ${req.data.username}</b>`, '')
            } else {
                next();
            }
        })
        .catch(err => {
            Respond(res).error(500, 'accountCreationError', `Could not create an account for ${req.body.username}`, err);
        })
}

function requiredFields(req, res, next) {
    const data = req.body;
    let firstName = data.firstname;
    let lastName = data.lastname;
    let username = data.username;
    let email = data.email;
    let password = data.password;
    if (!firstName || !lastName || !username || !email || !password) {
        Respond(res).error(500, 'accountCreationError', `fullname, lastname, username, email and passwords must be provided`, '')
    } else if (firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '') {
        next();
    } else {
        Respond(res).error(500, 'accountCreationError', `fullname, lastname, username, email and passwords must be provided`, '')
    }
}

function signup(req, res, next) {
    const data = req.body;
    let firstname = data.firstname;
    let lastname = data.lastname;
    let username = data.username;
    let email = data.email;
    let mobileno = data.mobileno;
    let address = data.address;
    let state = data.state;
    let country = data.country;
    let dob = data.dob;
    let gender = data.gender;
    let password = hasher(data.password, data.email).hash //The password is always hashed using the email as the salt
    let dataObj = { // This is done so, other information that are not needed won't b saved in the database
        firstname,
        lastname,
        username,
        email,
        mobileno,
        address,
        state,
        country,
        dob,
        gender,
        password,
    }
    usersModel.create(dataObj)
        .then(data => {
            let savedData = {
                firstname: data.firstname,
                lastname: data.lastname,
                username: data.username,
                email: data.email,
                mobilno: data.mobileno,
                address: data.address,
                state: data.state,
                country: data.country,
                dob: data.dob,
                gender: data.gender
            }
            //SIgn an authentication token for the user
            const token = jwt.sign({
                firstname: data.firstname,
                username: data.username,
                email: data.email
            }, data.email.split('').reverse().join(''), {
                expiresIn: '30d'
            }); //The email of the user spelt the reverse way is used as the JWT key
            req.data = savedData;
            req.token = token;
            next();
        })
        .catch(err => {
            Respond(res).error(500, 'accountCreationError', `Could not create an account for ${data.data.email}`, err);
        })
}

module.exports = {
    emailExists,
    usernameExists,
    requiredFields,
    signup
};