/**
 * @description - This module is a middleware that handles account login authentications
 */
const usersModel = require('../../models/users');
const Respond = require('../../services/responses');
const hasher = require('../../services/hasher');
const jwt = require('jsonwebtoken');

function validatePassword(req, res, next) {
    let data = req.body;
    let email = data.email;
    let password = data.password;
    // Check if the provided email is associated to any of the accounts
    usersModel.find({
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
                console.log("The passwords do not match ",
                    password, "\n and provided password is ", providedPassword);
            }
        })
        .catch(err => {
            console.log("An error occured ", err);
        })
}

function generateToken(req, res, next) {
    // This function generates an authentication token for an already veriified user who is about to log into his/her account
    let data = req.userData;
    const token = jwt.sign({
        firstname: data.firstname,
        username: data.username,
        email: data.email
    }, data.email.split('').reverse().join(''), {
        expiresIn: '30d'
    }); //The email of the user spelt the reverse way is used as the JWT key

    // Delete password from the data to be returned to the user
    let savedData = Object.assign(data)._doc
    delete savedData.password
    req.data = savedData;
    req.token = token;
    next();

}

module.exports = {
    validatePassword,
    generateToken
};