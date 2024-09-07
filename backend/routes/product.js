const express = require("express");
const {
    getProducts,
    newProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");
const router = express.Router();
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/products").get(isAuthenticatedUser, getProducts);
router
    .route("/product/:id")
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);

//Admin
router
    .route("/admin/products/new")
    .post(isAuthenticatedUser, authorizeRoles("admin"), newProduct);

module.exports = router;
