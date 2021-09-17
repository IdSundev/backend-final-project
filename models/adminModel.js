const pool = require("../config/db");

exports.countAdmin = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM admin`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectAdmin = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT a.id_admin AS 'id_admin', a.full_name AS 'full_name', a.email as 'email', a.contact as 'contact', w.detail_address as 'detail_address' FROM admin as a INNER JOIN warehouse as w ON a.id_warehouse = w.id_warehouse ORDER BY id_admin DESC LIMIT ${data.position},${data.limit}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};