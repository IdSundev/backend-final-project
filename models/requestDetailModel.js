const pool = require("../config/db");

exports.selectAll = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT rd.id_request_detail, rd.id_request, rd.id_product, p.id_product, p.name, p.picture, rd.quantity, DATE_FORMAT(r.request_date, "%W, %e %M %Y, %H:%i:%s") AS request_date, r.accepted, r.reject, r.reason_for_reject FROM request_detail as rd INNER JOIN request as r ON rd.id_request = r.id_request INNER JOIN products as p ON rd.id_product = p.id_product WHERE rd.id_request =${data.id_request}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.insert = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO request_detail(id_request,id_product,quantity) values(${data.id_request},${data.id_product},${data.quantity})`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};