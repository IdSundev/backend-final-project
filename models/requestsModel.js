const pool = require("../config/db");

exports.countRequests = (id_warehouse) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT COUNT(*) AS 'amountOfData' FROM request WHERE id_original_warehouse=${id_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result[0].amountOfData);
    });
  });
};

exports.selectRequests = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT id_request, id_original_warehouse, id_destination_warehouse, DATE_FORMAT(request_date, "%W, %e %M %Y, %H:%i:%s") as request_date , accepted, reject, reason_for_reject FROM request WHERE id_original_warehouse = ${data.id_warehouse} ORDER BY id_request DESC LIMIT ${data.position},${data.limit}`;
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

exports.detailRequest = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT r.id_request, r.id_original_warehouse, r.id_destination_warehouse, DATE_FORMAT(request_date, "%W, %e %M %Y, %H:%i:%s") as request_date, r.accepted, r.reject, r.reason_for_reject, w1.detail_address as original_warehouse, w2.detail_address as destination_warehouse FROM request as r INNER JOIN warehouse as w1 ON r.id_original_warehouse = w1.id_warehouse INNER JOIN warehouse as w2 ON r.id_destination_warehouse = w2.id_warehouse WHERE id_request = ${data.id_request}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.insert = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO request(id_original_warehouse,id_destination_warehouse,request_date,accepted,reject,reason_for_reject) values(${data.id_original_warehouse},${data.id_destination_warehouse},now(),null,null,null)`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.selectOtherWarehouse = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT w.id_warehouse, w.detail_address, v.village, v.lat, v.lon FROM warehouse as w INNER JOIN village as v ON w.id_village = v.id_village WHERE id_warehouse != ${data.id_original_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.selectWarehouse = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT w.id_warehouse, w.detail_address, v.village, v.lat, v.lon FROM warehouse as w INNER JOIN village as v ON w.id_village = v.id_village WHERE id_warehouse = ${data.id_original_warehouse}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};