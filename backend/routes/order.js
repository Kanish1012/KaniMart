const express = require("express");
const { newOrder, getSingleOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/order/new").post(isAuthenticatedUser, newOrder);
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

module.exports = router;
