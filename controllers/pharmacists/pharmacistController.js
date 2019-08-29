const Respond = require('../../services/responses');
const PharmacistModel = require('../../models/pharmacists');
const mongooseHandler = require('../../utilities/mongooseHandler');

class PharmacistController {
    /**
     * get all pharmacists
     * @param  {object} req
     * @param  {object} res
     * @return {json}
     */
    static async getAllPharmacists(req, res) {
        const pharmacists = await PharmacistModel.find().then(data => data);
        return Respond(res).success({ data: pharmacists });
    }
    /**
     * get single pharmacist details
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async getSinglePharmacist (req, res) {
        const { id } = req.params;
        if (mongooseHandler.checkIsValidID(id)) {
            // find user by ID
            const pharmacist = await PharmacistModel.findOne({ _id: id }).then(data => data);
            if (!pharmacist) {
                Respond(res).error(404, 'userRetrievalError', `User not found`)
            }
            return Respond(res).success({ data: pharmacist })
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format')
    }

    /**
     * get authenticated pharmacist's profile
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async getAuthPharmacistProfile (req, res) {
        const { user } = req;
        user
            ? Respond(res).success({ data: user })
            : Respond(res).error(401, 'authenticationError', 'Unauthenticated')
    }
}

module.exports = PharmacistController;
