const pool = require("../config/db");

exports.selectAllRevenue = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `select sum(total) as total from transactions where id_warehouse = ${data.id_warehouse} group by id_warehouse`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.listYear = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT id_warehouse, DATE_FORMAT(order_time_complete, "%Y") AS year FROM transactions WHERE id_warehouse=${data.id_warehouse} GROUP BY year`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.year = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT sum(total) as total, DATE_FORMAT(order_time_complete, "%Y") AS year from transactions WHERE DATE_FORMAT(order_time_complete, "%Y") = ${data.year} AND id_warehouse = ${data.id_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.month = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT sum(total) AS total, DATE_FORMAT(order_time_complete, "%Y") AS year from transactions WHERE DATE_FORMAT(order_time_complete, "%Y") = ${data.year} AND id_warehouse = ${data.id_warehouse} AND DATE_FORMAT(order_time_complete, "%m") = ${data.month}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};