const pool = require("../config/db");

exports.selectAll = () => {
  return new Promise((resolve, reject) => {
    // let sql = `SELECT * FROM users WHERE token='${data.token}'`;
    let sql = `SELECT p.id_product, p.name, c.category, p.price, p.picture FROM products as p INNER JOIN category as c WHERE p.id_category = c.id_category ORDER BY id_product DESC`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.insert = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `INSERT INTO products(id_category,name,price,picture,description) values(${data.id_category},'${data.name}',${data.price},'${data.picture}','${data.description}')`;

    pool.query(sql, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
};

exports.selectById = (data) => {
  return new Promise(function(resolve, reject) {
    let sql = `SELECT * FROM products WHERE id_product='${data.id_product}'`;
    pool.query(sql, (err, result) => {
      if(err) reject(err);
      resolve(result[0]);
    })
  });
};

exports.delete = (data) => {
  return new Promise((resolve, reject) => {
    let id_product = data.id_product;
    let sql = `DELETE FROM products WHERE id_product = ${id_product}`;
    pool.query(sql, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.selectOne = (data) => {
  return new Promise((resolve, reject) => {
    let sql = `SELECT * FROM products WHERE id_product='${data.id_product}'`;
    pool.query(sql, (err,result) => {
      if(err) reject(err);
      resolve(result);
    })
  });
};
