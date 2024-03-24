const bcrypt = require("bcrypt");

module.exports = {
    passwordEncryption:(password) => {
        try {
            const promise = new Promise((resolve, reject) => {
                bcrypt.hash(password, 10, (err, hash) => {
                    if(err) reject(err)
                    resolve(hash);
                });
            });
            return promise;
        } catch (error) {
            return res.status(500).json({success: false,message: error.message, data: []})
        }
    },    
    passwordComparison:(enteredPassword, dbPassword) => {
        try {
            const promise = new Promise((resolve, reject) => {
                bcrypt.compare(enteredPassword, dbPassword, (err, same) => {
                    if(err) reject(err)
                    resolve(same);
                });
            });
            return promise;
        } catch (error) {
            return res.status(500).json({success: false,message: error.message, data: []})
        }
    }
};