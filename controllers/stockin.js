const Stockin = require("../models/stockinModel");
const platform = require("../platform");

exports.all = async (req, res) => {

  let amountOfData, amountOfPage, previous, next, position, page;
  let id_warehouse = req.query.id_warehouse;
  let pages = [];
  let limit = 8;

  Stockin.countStockin(id_warehouse).then((result) => {
    amountOfData = result;
    amountOfPage = Math.ceil(amountOfData / limit);
    page = !req.query.page
      ? 1
      : parseInt(req.query.page) > amountOfPage
      ? amountOfPage
      : parseInt(req.query.page);

    previous = page > 1 ? page - 1 : false;
    next = page >= amountOfPage ? false : page + 1;
    // first page number
    page > 3 ? pages.push("...") : "";
    for (i = page - 2; i < page; i++) {
      if (i < 1) {
        continue;
      }
      pages.push(i);
    }
    // middle page number
    pages.push(page);
    for (i = page + 1; i < page + 3; i++) {
      if (i > amountOfPage) {
        break;
      }
      pages.push(i);
    }
    // last page number
    if (page + 2 < amountOfPage) {
      pages.push("...");
      pages.push(amountOfPage);
    }
    position = page === 1 ? 0 : (page - 1) * limit;
    let data = {
      limit,
      position,
      id_warehouse,
    };
    let selectStockin = Stockin.selectStockin(data);
    selectStockin.then((result) => {
      res.json({
        page: page,
        stockin: result,
        links: {
          first_page: 1,
          previous: previous,
          pages: pages,
          next: next,
          last_page: amountOfPage,
        },
      });
    });
  });
};

exports.warehouse = async (req,res) => {
  // Select All Warehouse
  let selectAllWarehouse = Stockin.selectAllWarehouse();
  selectAllWarehouse.then((result) => {
    res.json(result);
    return;
  });
}

exports.detail = async (req, res) => {
  let data = {
    id_stockin: req.params.id,
  };
  let result = Stockin.detailStockin(data);
  result
    .then(function (result) {
      if (result.length > 0) {
        res.json({
          status: 200,
          request: result,
        });
      } else {
        res.json({
          status: 500,
          message: err,
        });
      }
    })
    .catch(function (err) {
      res.json({
        status: 500,
        message: err,
      });
    });
};

exports.add = async (req, res) => {
  let data = await {
    id_original_warehouse: req.body.id_original_warehouse,
    id_destination_warehouse: req.body.id_destination_warehouse,
    date_of_entry: req.body.date_of_entry,
    description: req.body.description
  };
  let result = Stockin.insert(data);
  result
    .then((result) => {
      res.json({
        status: 200,
        success: true,
        id_stock_in: result.insertId
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