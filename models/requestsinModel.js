const pool = require("../config/db");

exports.countRequestsin = (id_warehouse) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM request WHERE id_destination_warehouse=${id_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectRequestsin = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT id_request, id_original_warehouse, id_destination_warehouse, DATE_FORMAT(request_date, "%W, %e %M %Y, %H:%i:%s") as request_date , accepted, reject, reason_for_reject FROM request WHERE id_destination_warehouse = ${data.id_warehouse} ORDER BY id_request DESC LIMIT ${data.position},${data.limit}`;
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

exports.detailRequestin = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT r.id_request, r.id_original_warehouse, r.id_destination_warehouse, DATE_FORMAT(request_date, "%W, %e %M %Y, %H:%i:%s") as request_date, r.accepted, r.reject, r.reason_for_reject, w1.detail_address as original_warehouse, w2.detail_address as destination_warehouse FROM request as r INNER JOIN warehouse as w1 ON r.id_original_warehouse = w1.id_warehouse INNER JOIN warehouse as w2 ON r.id_destination_warehouse = w2.id_warehouse WHERE id_request = ${data.id_request}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.accepted = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE request SET accepted='TRUE' WHERE id_request = ${data.id_request}`;

    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.reject = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `UPDATE request SET reject='TRUE', reason_for_reject = '${data.reason_for_reject}' WHERE id_request = ${data.id_request}`;

    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};