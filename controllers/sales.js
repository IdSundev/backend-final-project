const Sales = require("../models/salesModel");

exports.all = async (req, res) => {
  // Select All
  // let selectAll = Products.selectAll();
  // selectAll.then((result) => {
  //   res.json(result);
  //   return;
  // });

  let amountOfData, amountOfPage, previous, next, position, page;
  let id_warehouse = req.query.id_warehouse;
  let pages = [];
  let limit = 8;
  let data = {
    id_warehouse,
  };

  Sales.countSales(data).then((result) => {
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
      let selectSales = Sales.selectSales(data);
      selectSales.then((result) => {
        if (result.length > 0) {
          res.json({
            page: page,
            sales: result,
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

exports.detail = async (req, res) => {
  let data = {
    id_transaction: req.params.id,
  };
  let result = Sales.detailSales(data);
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

exports.graph = async (req, res) => {
  let data = {
    id_warehouse: req.query.warehouse,
  };
  let result = Sales.graph(data);
  result
    .then(function (result) {
      if (result.length > 0) {
        res.json({
          status: 200,
          graph: result,
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
