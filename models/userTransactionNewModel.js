const pool = require("../config/db");

exports.countUserTransactionNew = () => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM transactions WHERE status = "ON PROCESS"`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve('jumlah_data',result[0].amountOfData);
    });
  });
};

exports.selectUserTransactionNew = (data) => {
    return new Promise((resolve, reject) => {
      // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
      let sql = `SELECT t.id_transaction, u.full_name, w.detail_address as warehouse, a.detail_address as user_address, t.status, t.accepted, t.reject, t.reason_for_reject  FROM transactions t JOIN users u ON t.id_user = u.id_user JOIN warehouse w ON t.id_warehouse = w.id_warehouse JOIN address a ON t.id_address = a.id_address WHERE t.status = "ON PROCESS" ORDER BY id_transaction DESC LIMIT ${data.position},${data.limit}`;
      pool.query(sql, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
  };