module.exports = (req, form) => {
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if(err) {
                reject(err);
            } else {
                resolve([fields, files]);
            }

        });
    });
};