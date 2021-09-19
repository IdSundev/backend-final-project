const pool = require("../config/db");

exports.countStockin = (id_warehouse) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM stock_going_in WHERE id_destination_warehouse=${id_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectStockin = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT id_stock_in, id_original_warehouse, id_destination_warehouse, DATE_FORMAT(date_of_entry, "%W, %e %M %Y, %H:%i:%s") as date_of_entry, description FROM stock_going_in WHERE id_destination_warehouse = ${data.id_warehouse} ORDER BY id_stock_in DESC LIMIT ${data.position},${data.limit}`;
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

exports.detailStockin = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT si.id_stock_in, si.id_original_warehouse, si.id_destination_warehouse, DATE_FORMAT(si.date_of_entry, "%W, %e %M %Y, %H:%i:%s") as date_of_entry, si.description, w1.detail_address as original_warehouse, w2.detail_address as destination_warehouse FROM stock_going_in as si INNER JOIN warehouse as w1 ON si.id_original_warehouse = w1.id_warehouse INNER JOIN warehouse as w2 ON si.id_destination_warehouse = w2.id_warehouse WHERE id_stock_in = ${data.id_stockin}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};