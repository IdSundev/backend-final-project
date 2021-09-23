const RequestDetail = require("../models/requestDetailModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  // Select All
  let data = {
    id_request: req.query.request,
  };
  let selectAll = RequestDetail.selectAll(data);
  selectAll.then((result) => {
    res.json(result);
    return;
  });
};

exports.add = async (req, res) => {
  let data = await {
    id_request: req.body.id_request,
    id_product: req.body.id_product,
    quantity: req.body.quantity
  };
  let result = RequestDetail.insert(data);
  result
    .then((result) => {
      res.json({
        status: 200,
        success: true,
        id_request_detail: result.id_request_detail
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