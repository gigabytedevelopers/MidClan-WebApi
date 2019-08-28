const jwt = require("jsonwebtoken");
const { ObjectID } = require("mongodb");
const usersModel = require('../models/users');


class Authentication {
    static checkToken(req, res, next) {
        if (!req.header("authorization")) return res.status(400).json({ message: "No Authentication Header", });

        const token = req.header("authorization");

        try {
            // remove extra string and grab token, get secret key from env
            const decoded = jwt.verify(token.substring(7, token.length), process.env.JWT_SECRET);
            if (!ObjectID.isValid(decoded._id)) return res.status(404).send({ message: "User not found!", });

            // eslint-disable-next-line consistent-return
            return usersModel.findOne({ _id: decoded._id, }).then((user) => {
                if (!user) return res.status(401).send({ message: "User not found!", });
                req.user = user;
                req.token = token.substring(7, token.length);

                const { tokens } = user;

                next();
            });
        } catch (e) {
            return res.status(401).send(e);
        }
    }
}

module.exports = Authentication;
