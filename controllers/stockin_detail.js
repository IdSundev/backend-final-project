const StockinDetail = require("../models/stockinDetailModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let data = {
    id_stock_in: req.query.stockin,
  };
  let selectAll = StockinDetail.selectAll(data);
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};

exports.add = async (req, res) => {
  let data = await {
    id_stock_in: req.body.id_stock_in,
    id_product: req.body.id_product,
    quantity: req.body.quantity,
    description: req.body.description
  };
  let result = StockinDetail.insert(data);
  result
    .then((result) => {
      res.json({
        status: 200,
        success: true,
        id_stock_in_detail: result.insertId
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