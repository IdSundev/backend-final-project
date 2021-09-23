const Revenue = require("../models/revenueModel");

exports.all = async (req, res) => {
  let data = await {
    id_warehouse: req.query.warehouse,
  };

  let selectAllRevenue = Revenue.selectAllRevenue(data);
  selectAllRevenue.then((result) => {
    res.json(result);
    return;
  });
};

exports.listYear = async (req, res) => {
  let data = await {
    id_warehouse: req.query.warehouse,
  };

  let listYear = Revenue.listYear(data);
  listYear.then((result) => {
    res.json(result);
    return;
  });
};

exports.year = async (req, res) => {
  let data = await {
    id_warehouse: req.query.warehouse,
    year: req.query.year,
  };

  let listYear = Revenue.year(data);
  listYear.then((result) => {
    res.json(result);
    return;
  });
};

exports.month = async (req, res) => {
  let data = await {
    id_warehouse: req.query.warehouse,
    year: req.query.year,
    month: req.query.month,
  };

  let listYear = Revenue.month(data);
  listYear.then((result) => {
    if (result[0].total == null) {
      res.json([{
        total: 0,
        year: 0
      }])
      return;
    }
    res.json(result);
    return;
  });
};
