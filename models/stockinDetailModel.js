const pool = require("../config/db");

exports.selectAll = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT sid.id_stock_in_detail, sid.id_stock_in, sid.id_product, sid.quantity, p.name FROM stock_going_in_detail as sid INNER JOIN products as p ON sid.id_product = p.id_product WHERE sid.id_stock_in = ${data.id_stock_in}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};