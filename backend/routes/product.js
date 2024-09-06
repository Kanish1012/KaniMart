const express = require("express");
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/products").get(isAuthenticatedUser, getProducts);
router.route("/products/new").post(newProduct);
router
    .route("/product/:id")
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);

module.exports = router;
