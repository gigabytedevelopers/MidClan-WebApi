const { writeImage } = require('./imageWriter');

class Base64Handler {
    static async toImage ({ str, ext, filename, path }) {
        return writeImage(`data:image/${ext};base64,${str}`, path, filename);
    }

    static async toImageFromReq (req, res, next) {
        const { profilepicture } = req.body;
        if (!profilepicture) return next();
        try {
            const { str, image_ext, filename } = profilepicture;
            const directory = `public/${encodeURIComponent(req.body.email)}/profile_pic/`;
            const filepath = await Base64Handler.toImage({ str, ext: image_ext, filename, path: directory });
            req.body.profilepicture = `${req.headers.host}/${filepath.substring(7)}`;
            return next();
        } catch (error) {
            error.status = 400;
            return next(error);
        }
    }
}

module.exports = Base64Handler;
