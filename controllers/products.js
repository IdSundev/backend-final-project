const Products = require("../models/productsModel");
const platform = require("../platform");
const fs = require("fs");

exports.all = async (req, res) => {
  // Select All
  // let selectAll = Products.selectAll();
  // selectAll.then((result) => {
  //   res.json(result);
  //   return;
  // });

  let amountOfData, amountOfPage, previous, next, position, page;
  let pages = [];
  let limit = 12;

  Products.countProducts().then((result) => {
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
    };
    let selectProducts = Products.selectProducts(data);
    selectProducts.then((result) => {
      res.json({
        page: page,
        products: result,
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

exports.add = async (req, res) => {
  let data = await {
    id_category: req.body.id_category,
    name: req.body.name,
    price: req.body.price,
    picture: req.file.filename,
    description: req.body.description,
  };
  let result = Products.insert(data);
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

exports.delete = async (req, res) => {
  let data = {
    id_product: req.body.id_product,
  };
  let product = Products.selectById(data);
  product
    .then((result) => {
      fs.unlink(
        platform.projectDir + "/public/img/products/" + result.picture,
        (err) => {
          if (err) console.log(err);
        }
      );
    })
    .then(() => {
      Products.delete(data);
    })
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
};

exports.selectOne = async (req, res) => {
  let data = {
    id_product: req.body.id_product,
  };
  let product = Products.selectOne(data);
  product.then((result) => {
    res.json(result);
    return;
  });
};

exports.edit = async (req, res) => {
  let data = {
    id: req.params.id,
  };
  let result = Products.edit(data);
  result
    .then(function (result) {
      if (result.length > 0) {
        res.json({
          status: 200,
          product: result,
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

exports.update = async (req, res) => {
  let image = ""
  if (req.file) {
    image = req.file.filename
    fs.unlink(
      platform.projectDir + "/public/img/products/" + req.body.oldPicture,
      (err) => {
        if (err) console.log(err);
      }
    );
  } else {
    image = req.body.picture
  }

  let data = await {
    id_product: req.body.id_product,
    id_category: req.body.id_category,
    name: req.body.name,
    price: req.body.price,
    picture: image,
    description: req.body.description,
  };
  // console.log(data)
  let result = Products.update(data);
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
