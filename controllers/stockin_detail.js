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