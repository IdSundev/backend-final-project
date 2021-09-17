const Warehouse = require("../models/warehouseModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let selectAll = Warehouse.selectAll();
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};