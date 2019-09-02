const base64Img = require('base64-img');

class Base64Handler {
    static async toImage ({ str, ext, filename, path }) {
        const format = `data:image/${ext};base64,`;
        const formattedString = `${format}${str}`

        return base64Img.img(formattedString, path, filename, (err, filepath) => {
            if (err) throw err;
            console.log('writing done', filepath);
            return filepath;
        });
    }

    static async toImageFromReq (req, res, next) {
        const { profilepicture } = req.body;

        if (profilepicture) {
            const { host } = req.headers;

            let { str, image_ext, filename, path } = profilepicture;
            const format = `data:image/${image_ext};base64,` // format
            path = `public/${req.body.email}/profile_pic/`
            const formattedString = `${format}${str}`

            base64Img.img(formattedString, path, filename, (err, filepath) => {
                if (err) throw err;
                // attach decoded saved image to request body
                req.body.profilepicture = `${host}${filepath.substr(6, filepath.length)}`;

                next();
            });
        } else {
            next();
        }
    }
}

module.exports = Base64Handler;
