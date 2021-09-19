const pool = require("../config/db");

exports.selectAll = (data) => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT w.id_warehouse, w.detail_address, w.other_detail, w.profile, v.village, v.postal_code, v.lat, v.lon, sd.sub_district, c.city, p.province FROM warehouse as w INNER JOIN village as v ON w.id_village = v.id_village INNER JOIN sub_district as sd ON v.id_sub_district = sd.id_sub_district INNER JOIN city as c ON sd.id_city = c.id_city INNER JOIN province as p ON c.id_province = p.id_province ORDER BY w.id_warehouse DESC`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.insert = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO warehouse(id_village,detail_address,other_detail,profile) values(${data.id_village},'${data.detail_address}','${data.other_detail}','${data.profile}')`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};