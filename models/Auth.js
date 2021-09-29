const pool = require('../config/db.js');

exports.login = (data) => {
    return new Promise(function (resolve, reject) {
        var sql = `SELECT * FROM admin WHERE password = '${data.password}' AND username ='${data.username}' `;

        pool.query(sql, (err, result) => {
            if (err) reject(err);

            resolve(result);
            
        });
    });
};