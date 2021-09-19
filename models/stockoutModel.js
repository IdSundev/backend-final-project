const pool = require("../config/db");

exports.countStockout = (id_warehouse) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM stock_going_out WHERE id_original_warehouse=${id_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectStockout = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT id_stock_out, id_original_warehouse, id_user, id_destination_warehouse, DATE_FORMAT(item_out_date, "%W, %e %M %Y, %H:%i:%s") as item_out_date, description FROM stock_going_out WHERE id_original_warehouse = ${data.id_warehouse} ORDER BY id_stock_out DESC LIMIT ${data.position},${data.limit}`;
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

exports.selectAllUsers = () => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT * FROM users`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.detailStockout = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT so.id_stock_out, so.id_original_warehouse, so.id_destination_warehouse, u.id_user, DATE_FORMAT(so.item_out_date, "%W, %e %M %Y, %H:%i:%s") as date, so.description, w1.detail_address as original_warehouse, w2.detail_address as destination_warehouse, u.full_name as destination_user FROM stock_going_out as so LEFT JOIN warehouse as w1 ON so.id_original_warehouse = w1.id_warehouse LEFT JOIN warehouse as w2 ON sO.id_destination_warehouse = w2.id_warehouse LEFT JOIN users as u ON so.id_user = u.id_user WHERE id_stock_out = ${data.id_stock_out}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};