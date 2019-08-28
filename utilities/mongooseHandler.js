const mongoose = require('mongoose');

class MongooseHandler {
    static checkIsValidID(id) {
        return mongoose.Types.ObjectId.isValid(id);
    }
}

module.exports = MongooseHandler;
