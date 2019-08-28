/**
 * @description - This module is a middleware that handles account login authentications
 */
const usersModel = require('../../models/users');
const doctorsModel = require('../../models/doctors');
const pharmacistsModel = require('../../models/pharmacists');
const labTechModel = require('../../models/labTechnicians');
const Respond = require('../../services/responses');
const hasher = require('../../services/hasher');
const jwt = require('jsonwebtoken');

function emailExists(model){
    return function (req, res, next) {
        // Check if the provided mail by the user is already registered with an account
        model.find({
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
}

function usernameExists(model){
    return function (req, res, next) {
        // Check if the provided email by the user is already registered with an account
        model.find({
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
}

function requiredFields(req, res, next) {
    //Make sure the required fields has been provided, before proceeding to reguster the user
    const data = req.body;
    let firstName = data.firstname;
    let lastName = data.lastname;
    let username = data.username;
    let email = data.email;
    let password = data.password;
    if (!firstName || !lastName || !username || !email || !password) {
        Respond(res).error(500, 'accountCreationError', `firstname, lastname, username, email and passwords must be provided`, '')
    } else if (firstName !== '' && lastName !== '' && username !== '' && email !== '' && password !== '') {
        next();
    } else {
        Respond(res).error(500, 'accountCreationError', `firstname, lastname, username, email and passwords must be provided`, '')
    }
}

let userObj = { // This is done so, other information that are not needed won't b saved in the database
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            mobileno: '',
            address: '',
            state: '',
            country: '',
            dob: '',
            gender: '',
            password: '',
        }

function signUp(model, obj){
    return function (req, res, next) {
        const data = req.body;
        obj.firstname = data.firstname;
        obj.lastname = data.lastname;
        obj.username = data.username;
        obj.email = data.email;
        obj.mobileno = data.mobileno;
        obj.address = data.address;
        obj.state = data.state;
        obj.country = data.country;
        obj.dob = data.dob;
        obj.gender = data.gender;
        obj.password = hasher(data.password, data.email).hash //The password is always hashed using the email as the salt
        model.create(obj)
            .then(data => {
                let savedData = data;
                savedData = Object.assign(savedData)._doc;
                delete savedData.password;
                //Sign an authentication token for the user
                const token = jwt.sign({
                    firstname: savedData.firstname,
                    username: savedData.username,
                    email: savedData.email
                }, process.env.JWT_SECRET, {
                    expiresIn: '30d'
                });
                /*const token = jwt.sign({
                    firstname: savedData.firstname,
                    username: savedData.username,
                    email: savedData.email
                }, savedData.email.split('').reverse().join(''), {
                    expiresIn: '30d'
                }); */ //The email of the user spelt the reverse way is used as the JWT key
                req.data = savedData;
                req.token = token;
                next();
            })
            .catch(err => {
                Respond(res).error(500, 'accountCreationError', `Could not create an account for ${req.body.email}`, err);
            })
    }
}

module.exports = {
    //For users signing up
    userEmailExists: emailExists(usersModel),
    userUsernameExists: usernameExists(usersModel),
    userSignup: signUp(usersModel, userObj),
    //doctors signing up
    doctorEmailExists: emailExists(doctorsModel),
    doctorUsernameExists: usernameExists(doctorsModel),
    doctorSignup: signUp(doctorsModel, userObj),
    //pharmacists signing up pharmacistsModel
    pharmacistEmailExists: emailExists(pharmacistsModel),
    pharmacistUsernameExists: usernameExists(pharmacistsModel),
    pharmacistSignup: signUp(pharmacistsModel, userObj),
    // Lab technicians
    labTechEmailExists: emailExists(labTechModel),
    labTechUsernameExists: usernameExists(labTechModel),
    labTechSignup: signUp(labTechModel, userObj),
    //Essential fields
    requiredFields
};
