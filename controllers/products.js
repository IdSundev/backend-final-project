const Products = require("../models/productsModel");
const platform = require("../platform");
const fs = require("fs");

exports.all = async (req, res) => {
  let selectAll = Products.selectAll();
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};

exports.add = async (req, res) => {
  let data = await {
    id_category: req.body.id_category,
    name: req.body.name,
    price: req.body.price,
    picture: req.file.filename,
    description: req.body.description,
  };
  let result = Products.insert(data);
  result
    .then((result) => {
      res.json({
        status: 200,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err,
      });
    });
  return;
};

exports.delete = async (req, res) => {
  let data = {
    id_product: req.body.id_product,
  };
  let product = Products.selectById(data);
  product
    .then((result) => {
      fs.unlink(
        platform.projectDir + "/public/img/products/" + result.picture,
        (err) => {
          if (err) console.log(err);
        }
      );
    })
    .then(() => {
      Products.delete(data);
    })
    .then((result) => {
      res.json({
        status: 200,
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        status: 500,
        success: false,
        message: err,
      });
    });
};

exports.selectOne = async (req, res) => {
  let data = {
    id_product: req.body.id_product,
  };
  let product = Products.selectOne(data);
  product.then((result) => {
    res.json(result);
    return;
  });
};
