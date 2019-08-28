const Respond = require('../../services/responses');
const pharmacistModel = require('../../models/pharmacists');
const mongooseHandler = require('../../utilities/mongooseHandler');

class PharmacistController {
    /**
     * get all technicians
     * @param  {object} req
     * @param  {object} res
     * @return {json}
     */
    static async getAllPharmacists(req, res) {
        const pharmacists = await pharmacistModel.find().then(data => data);
        return Respond(res).success({ data: pharmacists });
    }

    static async getSinglePharmacist(req, res) {
        const { id } = req.params;
        if (mongooseHandler.checkIsValidID(id)) {
            // find user by ID
            const pharmacist = await pharmacistModel.findOne({ _id: id }).then(data => data);
            if (!pharmacist) {
                Respond(res).error(404, 'userRetrievalError', `User not found`)
            }
            return Respond(res).success({ data: pharmacist })
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format')
    }
}

module.exports = PharmacistController;
