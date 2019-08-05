/**
 * @description - This module is a middleware that handles account login authentications
 */
function login(req, res, next) {
    let data = req.body;
    let email = data.email;
    let password = data.password;
}

module.exports = login;