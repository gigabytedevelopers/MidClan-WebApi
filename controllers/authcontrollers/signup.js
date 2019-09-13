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

const emailExists = (model) => {
    return function (req, res, next) {
        // Check if the provided mail by the user is already registered with an account
        const { email } = req.body;
        model.findOne({ email })
            .then(user => {
                user ? Respond(res).error(500, 'accountCreationError', `A user has already been registered with the email ${email}`, '')
                    : next();
            })
            .catch(err => {
                Respond(res).error(500, 'accountCreationError', `${err}`, err);
            });
    }
}

const usernameExists = (model) => {
    return function (req, res, next) {
        /**
         * the next line is important for checking unique usernames
         * so variations like Martins, maRtins, MArtins = martins.
         * @type {string}
         */
        req.body.username = req.body.username.toLowerCase();
        // Check if the provided email by the user is already registered with an account
        const { username } = req.body;
        model.findOne({ username })
            .then(user => {
                user ? Respond(res).error(500, 'accountCreationError', `username ${username} has been taken`, '')
                    : next();
            })
            .catch(err => {
                Respond(res).error(500, 'accountCreationError', `account creation failed: ${err}`, err);
            });
    }
}

const requiredFields = (req, res, next) => {
    //Make sure the required fields has been provided, before proceeding to reguster the user
    const { firstname, lastname, username, email, password } = req.body;

    if (!firstname || !lastname || !username || !email || !password) {
        Respond(res).error(400, 'accountCreationError', `firstname, lastname, username, email and passwords must be provided`, '')
    } else if (firstname !== '' && lastname !== '' && username !== '' && email !== '' && password !== '') {
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
    profilepicture: '',
    mobileno: '',
    address: '',
    state: '',
    country: '',
    dob: '',
    gender: '',
    password: '',
}

const signUp = (model, obj) => {
    return function (req, res, next) {
        const data = req.body;
        obj.firstname = data.firstname;
        obj.lastname = data.lastname;
        obj.username = data.username;
        obj.email = data.email;
        obj.mobileno = data.mobileno;
        obj.address = data.address;
        obj.state = data.state;
        obj.profilepicture = data.profilepicture;
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
                // Instead of the email of the user spelt the reverse way is used as the JWT key
                // We're using a hardcoded JWT_SECRET in our ENV.
                const token = jwt.sign({
                    firstname: savedData.firstname,
                    username: savedData.username,
                    email: savedData.email
                }, process.env.JWT_SECRET, {
                    expiresIn: '30d'
                });
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
