const Respond = require('../../services/responses');
const doctorModel = require('../../models/doctors.js');
const mongooseHandler = require('../../utilities/mongooseHandler');

class DoctorController {
    /**
     * get all doctors
     * @param  {object} req
     * @param  {object} res
     * @return {json}
     */
    static async getAllDoctors(req, res) {
        const doctors = await doctorModel.find().then(data => data);
        return Respond(res).success({ data: doctors });
    }
    /**
     * get single doctor
     * @param  {object} req
     * @param  {object} res
     * @return {json}
     */
    static async getSingleDoctor(req, res) {
        const { id } = req.params;
        if (mongooseHandler.checkIsValidID(id)) {
            // find user by ID
            const doctor = await doctorModel.findOne({ _id: id }).then(data => data);
            if (!doctor) {
                Respond(res).error(404, 'userRetrievalError', `User not found`)
            }
            return Respond(res).success({ data: doctor })
        }
        return Respond(res).error(400, 'mongooseModelError', 'Invalid ID format')
    }
}

module.exports = DoctorController;
