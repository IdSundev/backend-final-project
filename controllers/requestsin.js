const Requestsin = require("../models/requestsinModel");
const platform = require("../platform");

exports.all = async (req, res) => {
  let amountOfData, amountOfPage, previous, next, position, page;
  let id_warehouse = req.query.id_warehouse;
  let pages = [];
  let limit = 10;

  Requestsin.countRequestsin(id_warehouse).then((result) => {
    if (result > 0) {
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
      let selectRequestsin = Requestsin.selectRequestsin(data);
      selectRequestsin.then((result) => {
        if (result.length > 0) {
          res.json({
            page: page,
            requestin: result,
            links: {
              first_page: 1,
              previous: previous,
              pages: pages,
              next: next,
              last_page: amountOfPage,
            },
          });
        }
      });
    }
  });
};

exports.warehouse = async (req, res) => {
  // Select All Warehouse
  let selectAllWarehouse = Requestsin.selectAllWarehouse();
  selectAllWarehouse.then((result) => {
    res.json(result);
    return;
  });
};

exports.detail = async (req, res) => {
  let data = {
    id_request: req.params.id,
  };
  let result = Requestsin.detailRequestin(data);
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

exports.accepted = async (req, res) => {
  let data = await {
    id_request: req.body.id_request,
  };
  // console.log(data)
  let result = Requestsin.accepted(data);
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

exports.reject = async (req, res) => {
  let data = await {
    id_request: req.body.id_request,
    reason_for_reject: req.body.reason_for_reject,
  };
  // console.log(data)
  let result = Requestsin.reject(data);
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
