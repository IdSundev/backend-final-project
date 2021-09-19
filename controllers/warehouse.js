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

exports.add = async (req, res) => {
  let data = await {
    id_village: req.body.id_village,
    detail_address: req.body.detail_address,
    other_detail: req.body.other_detail,
    profile: req.file.filename
  };
  let result = Warehouse.insert(data);
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