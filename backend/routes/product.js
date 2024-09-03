const express = require("express");
const {
    getProducts,
    newProduct,
    getSingleProduct,
} = require("../controllers/productController");
const router = express.Router();

router.route("/products").get(getProducts);
router.route("/product/:id").get(getSingleProduct);
router.route("/products/new").post(newProduct);

module.exports = router;
