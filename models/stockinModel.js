const pool = require("../config/db");

exports.countStockin = (id_warehouse) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM stock_going_in WHERE id_original_warehouse=${id_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectStockin = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT id_stock_in, id_original_warehouse, id_destination_warehouse, DATE_FORMAT(date_of_entry, "%W, %e %M %Y, %H:%i:%s") as date_of_entry, description FROM stock_going_in WHERE id_original_warehouse = ${data.id_warehouse} ORDER BY id_stock_in DESC LIMIT ${data.position},${data.limit}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.selectAllWarehouse = () => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT * FROM warehouse`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};