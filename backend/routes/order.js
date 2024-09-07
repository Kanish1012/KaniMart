const express = require("express");
const {
    newOrder,
    getSingleOrder,
    myOrders,
    orders,
} = require("../controllers/orderController");
const router = express.Router();
const {
    isAuthenticatedUser,
    authorizeRoles,
} = require("../middlewares/authenticate");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);
router.route("/myorders").get(isAuthenticatedUser, myOrders);

//Admin Routes
router
    .route("/orders")
    .get(isAuthenticatedUser, authorizeRoles("admin"), orders);

module.exports = router;
