const { Buffer } = require('buffer');
var path = require('path');
var fs = require('fs');

/**
 * @param  {string} filename
 */
const encodeBase64 = (filename) => {
    fs.readFile(path.join(__dirname, '/public/images/encoded', filename), function(error, data) {
        if (error) {
          throw error;
        }
        let buf = Buffer.from(data);
        let base64 = buf.toString('base64');
        console.log('Base64 ' + filename + ': ' + base64);
        return base64;
  });
}

/**
 * @param  {string} base64str
 * @param  {string} filename
 */
const decodeBase64 = (base64str, filename) => {
    let buf = Buffer.from(base64str, 'base64');
    const imageUrl = path.join(__basedir, `/public/images/decoded/${filename}`);
    fs.writeFile(path.join(__basedir, '/public/images/decoded', filename), buf, (error) => {
        if (error) {
            throw error;
        }
        console.log('File created from base64 string!');
        return imageUrl;
    });
}


module.exports = {
    decodeBase64,
    encodeBase64
}
