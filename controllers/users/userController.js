const Respond = require('../../services/responses');
const userModel = require('../../models/users');
const mongooseHandler = require('../../utilities/mongooseHandler');

class UserController {
    /**
     * get all users
     * @param  {object} req
     * @param  {object} res
     * @return {json}
     */
    static async getAllUsers(req, res) {
        const users = await userModel.find().then(data => data);
        return Respond(res).success({ data: users })
    }
    /**
     * get single users
     * @param  {object} req
     * @param  {object} res
     * @return {json}
     */
    static async getSingleUser(req, res) {
        const { id } = req.params;
        if (mongooseHandler.checkIsValidID(id)) {
            // find user by ID
            const user = await userModel.findOne({ _id: id }).then(data => data);
            if (!user) {
                Respond(res).error(404, 'userRetrievalError', `User not found`)
            }
            return Respond(res).success({ data: user })
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format')
    }
}

module.exports = UserController;
