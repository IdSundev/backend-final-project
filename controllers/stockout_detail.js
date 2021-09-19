const StockoutDetail = require("../models/stockoutDetailModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let data = {
    id_stock_out: req.query.stockout,
  };
  let selectAll = StockoutDetail.selectAll(data);
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};