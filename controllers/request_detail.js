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