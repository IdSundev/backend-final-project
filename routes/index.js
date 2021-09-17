const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const ctrlProducts = require("../controllers/products");
const ctrlCategories = require("../controllers/categories");
const ctrlStock = require("../controllers/stock");
const ctrlRequests = require("../controllers/requests");
const ctrlStockin = require("../controllers/stockin");
const ctrlStockout = require("../controllers/stockout");
const ctrlAdmin = require("../controllers/admin");
const ctrlWarehouse = require("../controllers/warehouse");

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

// products
router.post('/products/add', upload_img_product.single("picture"), ctrlProducts.add);
router.post('/products/delete', ctrlProducts.delete);
router.get('/products/select', ctrlProducts.selectOne);
router.get('/products/edit/:id', ctrlProducts.edit);
router.post('/products/update/:id', upload_img_product.single("picture"), ctrlProducts.update);
router.get('/products', ctrlProducts.all);
// category
router.get('/categories', ctrlCategories.all);

// stock operasional
router.get('/stocks', ctrlStock.all);

// request
router.get('/requests', ctrlRequests.all);
router.get('/requests/warehouse', ctrlRequests.warehouse);

// stock in
router.get('/stockin', ctrlStockin.all);
router.get('/stockin/warehouse', ctrlStockin.warehouse);

// stock out
router.get('/stockout', ctrlStockout.all);
router.get('/stockout/warehouse', ctrlStockout.warehouse);
router.get('/stockout/users', ctrlStockout.users);

// admin
router.get('/admin', ctrlAdmin.all);

// warehouse
router.get('/warehouse', ctrlWarehouse.all);

module.exports = router;

