const pool = require("../config/db");

exports.selectAll = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT sod.id_stock_out_detail, sod.id_stock_out, sod.id_product, sod.quantity, p.name FROM stock_going_out_detail as sod INNER JOIN products as p ON sod.id_product = p.id_product WHERE sod.id_stock_out = ${data.id_stock_out}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.insert = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO stock_going_out_detail(id_stock_out,id_product,quantity,description) values(${data.id_stock_out},${data.id_product},'${data.quantity}','${data.description}')`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};