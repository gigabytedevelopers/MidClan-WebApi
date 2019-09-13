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

const validatePassword = (model) => {
    return function(req, res, next) {
        let data = req.body;
        let email = data.email;
        let password = data.password;
        // check if email & password was provided
        if (!email || !password) return Respond(res).error(400, 'accountAuthenticationError', 'email or password not provided', {});
        // Check if the provided email is associated to any of the accounts
        model.find({
                email: email
            })
            .then(fetchedData => {
                fetchedData = fetchedData[0];
                req.userData = fetchedData;
                let password = fetchedData.password;
                let providedPassword = hasher(data.password, data.email).hash;
                if (password === providedPassword) {
                    // The user has proven that he or she is authorized to access the account associated with the provided email
                    next(); // Call the next middleware
                } else {
                    Respond(res).error(403, 'accountAuthenticationError', `A wrong email/username - password combination was provided.`, {});
                }
            })
            .catch(err => {
                Respond(res).error(403, 'accountAuthenticationError', `A wrong email/username - password combination was provided.`, {});
            })
    }
}

const generateToken = (req, res, next) => {
    // This function generates an authentication token for an already veriified user who is about to log into his/her account
    let data = req.userData;
    const token = jwt.sign({
        _id: data._id,
        firstname: data.firstname,
        username: data.username,
        email: data.email
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    // Delete password from the data to be returned to the user
    let savedData = Object.assign(data)._doc
    delete savedData.password
    req.data = savedData;
    req.token = token;
    next();

}

module.exports = {
    validateUserPassword: validatePassword(usersModel),
    validateDoctorPassword: validatePassword(doctorsModel),
    validatePharmacistPassword: validatePassword(pharmacistsModel),
    validateLabTechPassword: validatePassword(pharmacistsModel),
    generateToken
};
