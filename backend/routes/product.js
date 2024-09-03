const express = require("express");
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updataProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/products/new").post(newProduct);
router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct).put(updataProduct);

module.exports = router;
