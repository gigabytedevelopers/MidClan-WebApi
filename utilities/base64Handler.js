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
}

module.exports = Base64Handler;
