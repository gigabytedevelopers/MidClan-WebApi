/**
 * @description - This module is used to easily generate a success/error response to an API request in the 
 * standard format
 * @param {res} [Object] - The response Object fron express routes middlewares 
 */
function Responses(res) {
    this.error = function (status, type, message, err) {
        /** 
         * @param {status} [Number] - The status/ error code of the response i.e 200, 404, 500
         * @param {type} [String] - The type of error being generated i.e emailValidationError, 
         * passwordValidationError etc
         * @param {message} [String] - A short message to be displayed on the front end, telling the user what 
         * might have causes the error
         * @param {err}[Object] - The error object its self
         */
        res.status(status).json({
            success: false,
            error: {
                code: status,
                type,
                message,
                err
            }
        })
    }
    this.success = function (payload) {
        /**
         * @param {payload} [Object] - The data being returned from the server is request succeeds
         */
        res.status(200).json({
            success: true,
            payload: payload
        })
    }
}

module.exports = (res) => new Responses(res);