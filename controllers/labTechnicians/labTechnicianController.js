const Respond = require('../../services/responses');
const labTechnicianModel = require('../../models/labTechnicians.js');
const mongooseHandler = require('../../utilities/mongooseHandler');

class LabTechnicianController {
    /**
     * get all technicians
     * @param  {object} req
     * @param  {object} res
     * @return {json}
     */
    static async getAllTechnicians(req, res) {
        const technicians = await labTechnicianModel.find().then(data => data);
        return Respond(res).success({ data: technicians });
    }
    /**
     * get single technician
     * @param  {object} req
     * @param  {object} res
     * @return {json}
     */
    static async getSingleTechnician(req, res) {
        const { id } = req.params;
        if (mongooseHandler.checkIsValidID(id)) {
            // find user by ID
            const technician = await labTechnicianModel.findOne({ _id: id }).then(data => data);
            if (!technician) {
                Respond(res).error(404, 'userRetrievalError', `User not found`)
            }
            return Respond(res).success({ data: technician })
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format')
    }
    /**
     * get authenticated technician's profile
     * @param  {object} req [request object]
     * @param  {object} res [response object]
     * @return {json}
     */
    static async getAuthLabTechProfile (req, res) {
        const { user } = req;
        user
            ? Respond(res).success({ data: user })
            : Respond(res).error(401, 'authenticationError', 'Unauthenticated')
    }
}

module.exports = LabTechnicianController;
