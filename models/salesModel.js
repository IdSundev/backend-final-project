const pool = require("../config/db");

exports.countSales = () => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM transactions`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectSales = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT t.id_transaction, t.id_warehouse, u.full_name, t.status, a.detail_address AS user_address, w.detail_address AS warehouse, DATE_FORMAT(t.order_time_complete, "%W, %e %M %Y, %H:%i:%s") as date, t.total FROM transactions as t INNER JOIN users as u ON t.id_user = u.id_user INNER JOIN address as a ON t.id_address = a.id_address INNER JOIN warehouse as w ON t.id_warehouse = w.id_warehouse WHERE t.id_warehouse = ${data.id_warehouse} ORDER BY id_transaction DESC LIMIT ${data.position},${data.limit}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.detailSales = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT td.id_transaction_detail, td.id_transaction, p.name, p.price, td.quantity, p.price * td.quantity as total FROM transaction_detail AS td INNER JOIN products AS p ON td.id_product = p.id_product WHERE id_transaction = ${data.id_transaction}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.graph = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT id_warehouse, DATE_FORMAT(order_time_complete, "%Y") AS year, DATE_FORMAT(order_time_complete, "%M") AS month, DATE_FORMAT(order_time_complete, "%Y-%m") AS ym, COUNT(id_transaction) AS count FROM transactions WHERE DATE_FORMAT(order_time_complete, "%Y") = DATE_FORMAT(NOW(), "%Y") AND id_warehouse=${data.id_warehouse} GROUP BY YM  ORDER BY order_time_complete`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};