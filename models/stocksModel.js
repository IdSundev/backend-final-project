const pool = require("../config/db");

exports.countStocks = (id_warehouse) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM stock_operasional WHERE id_warehouse=${id_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectStocks = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT s.id_stock as 'id_stock', s.id_warehouse as 'id_warehouse', p.name as 'name', s.available as 'available', s.non_available as 'non_available' FROM stock_operasional as s INNER JOIN products as p WHERE s.id_product = p.id_product HAVING s.id_warehouse = ${data.id_warehouse} LIMIT ${data.position},${data.limit}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};