const pool = require("../config/db");

exports.countUserTransaction = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM transactions WHERE status = 'ON PROCESS' OR status ="ON GOING/ DELIVERY" OR status ="COMPLETE" or status = "CANCELED"`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectUserTransaction = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT t.id_transaction, u.full_name, w.detail_address as warehouse, a.detail_address as user_address, t.status, t.accepted, t.reject, t.reason_for_reject  FROM transactions t JOIN users u ON t.id_user = u.id_user JOIN warehouse w ON t.id_warehouse = w.id_warehouse JOIN address a ON t.id_address = a.id_address WHERE t.status = 'ON PROCESS' OR t.status ="ON GOING/ DELIVERY" OR t.status ="COMPLETE" or t.status = "CANCELED" ORDER BY id_transaction DESC LIMIT ${data.position},${data.limit}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.detailUserTransaction = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT t.id_transaction, u.full_name, w.detail_address as warehouse, a.detail_address as user_address, t.status, t.accepted, t.reject, t.reason_for_reject, td.id_product, td.quantity, p.name  FROM transactions t JOIN users u ON t.id_user = u.id_user JOIN warehouse w ON t.id_warehouse = w.id_warehouse JOIN address a ON t.id_address = a.id_address JOIN transaction_detail td ON t.id_transaction = td.id_transaction JOIN products p ON p.id_product = td.id_product WHERE t.id_transaction = ${data.id_transaction}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};