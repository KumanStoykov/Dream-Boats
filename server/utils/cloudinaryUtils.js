const cloudinary = require('cloudinary');

exports.uploadFile = (file) => {
    return new Promise((resolve, reject) => {

        cloudinary.v2.uploader.upload(file, (err, response) => {
            if(err) {
                return reject(err);
            }
            return resolve(response);
        });
    });
};
exports.deleteFile = (file) => {
    return new Promise((resolve, reject) => {

        cloudinary.v2.uploader.destroy(file, (err, response) => {
            if(err) {
                return reject(err);
            }
            return resolve(response);
        });
    });
};