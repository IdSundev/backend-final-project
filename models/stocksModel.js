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

exports.detailStock = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT * FROM stock_operasional WHERE id_warehouse = ${data.id_warehouse} AND id_product = ${data.id_product}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.insert = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO stock_operasional(id_warehouse,id_product,available,non_available) values(${data.id_warehouse},${data.id_product},${data.available},${data.non_available})`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.update = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE stock_operasional SET available=${data.available}, non_available=${data.non_available} WHERE id_stock=${data.id_stock}`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};