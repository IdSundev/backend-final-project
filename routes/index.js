const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const ctrlProducts = require("../controllers/products");
const ctrlCategories = require("../controllers/categories");
const ctrlStock = require("../controllers/stock");
const ctrlRequests = require("../controllers/requests");
const ctrlRequestsin = require("../controllers/requestsin");
const ctrlStockin = require("../controllers/stockin");
const ctrlStockout = require("../controllers/stockout");
const ctrlAdmin = require("../controllers/admin");
const ctrlWarehouse = require("../controllers/warehouse");
const ctrlProvince = require("../controllers/province");
const ctrlCity = require("../controllers/city");
const ctrlDistrict = require("../controllers/district");
const ctrlVillage = require("../controllers/village");
const ctrlRequestDetail = require("../controllers/request_detail");
const ctrlStockinDetail = require("../controllers/stockin_detail");
const ctrlStockoutDetail = require("../controllers/stockout_detail");
const ctrlUsers = require("../controllers/users");
const ctrlSales = require("../controllers/sales");
const ctrlRevenue = require("../controllers/revenue");
const ctrlUserTransaction = require("../controllers/user_transaction")
const ctrlUserTransactionNew = require("../controllers/user_transaction_new")
const ctrlAuth = require('../controllers/Auth')

// multer configuration for save image product
const storage_img_products = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/products");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname)
    );
  }
})
const upload_img_product = multer({storage: storage_img_products});

// multer configuration for save image warehouse
const storage_img_warehouse = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/img/warehouse");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
      "-" +
      Date.now() +
      path.extname(file.originalname)
    );
  }
})
const upload_img_warehouse = multer({storage: storage_img_warehouse});

// users
router.get('/users/all', ctrlUsers.selectAll);

// products
router.post('/products/add', upload_img_product.single("picture"), ctrlProducts.add);
router.post('/products/delete', ctrlProducts.delete);
router.get('/products/all', ctrlProducts.selectAll);
router.get('/products/select', ctrlProducts.selectOne);
router.get('/products/edit/:id', ctrlProducts.edit);
router.post('/products/update/:id', upload_img_product.single("picture"), ctrlProducts.update);
router.get('/products', ctrlProducts.all);
// category
router.get('/categories', ctrlCategories.all);

// stock operasional
router.get('/stocks', ctrlStock.all);
router.post('/stocks', ctrlStock.add);
router.post('/stocks/update', ctrlStock.update);
router.get('/stocks/detail', ctrlStock.detail);

// request
router.get('/requests', ctrlRequests.all);
router.get('/requests/select/:id', ctrlRequests.selectOne);
router.get('/requests/other/:id', ctrlRequests.selectOther);
router.post('/requests', ctrlRequests.add);
router.get('/requests/detail/:id', ctrlRequests.detail);
router.get('/requests/warehouse', ctrlRequests.warehouse);

// request in 
router.get('/requestsin', ctrlRequestsin.all);
router.get('/requestsin/detail/:id', ctrlRequestsin.detail);
router.get('/requestsin/warehouse', ctrlRequestsin.warehouse);
router.post('/requestin/accepted', ctrlRequestsin.accepted);
router.post('/requestin/reject', ctrlRequestsin.reject);

// stock in
router.get('/stockin', ctrlStockin.all);
router.post('/stockin', ctrlStockin.add);
router.get('/stockin/warehouse', ctrlStockin.warehouse);
router.get('/stockin/detail/:id', ctrlStockin.detail);


// stock out
router.get('/stockout', ctrlStockout.all);
router.post('/stockout', ctrlStockout.add);
router.get('/stockout/warehouse', ctrlStockout.warehouse);
router.get('/stockout/users', ctrlStockout.users);
router.get('/stockout/detail/:id', ctrlStockout.detail);


// user transaction
router.get('/user-transaction', ctrlUserTransaction.all);
router.get('/admin/new-transaction', ctrlUserTransactionNew.all);
router.get('/user-transaction/detail/:id', ctrlUserTransaction.detail);
// router.get('/requestsin/warehouse', ctrlRequestsin.warehouse);
// router.post('/requestin/accepted', ctrlRequestsin.accepted);
// router.post('/requestin/reject', ctrlRequestsin.reject);

// admin
router.get('/admin', ctrlAdmin.all);
router.post('/admin', ctrlAdmin.add)
router.post('/admin/login', ctrlAuth.login)


// warehouse
router.get('/warehouse', ctrlWarehouse.all);
router.post('/warehouse', upload_img_warehouse.single("profile"), ctrlWarehouse.add);

// province
router.get('/province', ctrlProvince.all);

// city
router.get('/city', ctrlCity.all);

// district
router.get('/district', ctrlDistrict.all);

// village
router.get('/village', ctrlVillage.all);

// request detail 
router.get('/request_detail', ctrlRequestDetail.all);
router.post('/request_detail', ctrlRequestDetail.add);

// stock in detail 
router.get('/stockin_detail', ctrlStockinDetail.all);
router.post('/stockin_detail', ctrlStockinDetail.add);

// stock out detail 
router.get('/stockout_detail', ctrlStockoutDetail.all);
router.post('/stockout_detail', ctrlStockoutDetail.add);

// sales report and revenue
router.get('/sales_report', ctrlSales.all);
router.get('/sales_report/detail/:id', ctrlSales.detail);
// graph
router.get('/sales_report/graph', ctrlSales.graph);

// get all revenue
router.get('/revenue/all', ctrlRevenue.all);
router.get('/revenue/list-year', ctrlRevenue.listYear);
router.get('/revenue/year', ctrlRevenue.year);
router.get('/revenue/month', ctrlRevenue.month);

module.exports = router;

