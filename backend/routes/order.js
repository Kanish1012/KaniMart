const express = require("express");
const { newOrder } = require("../controllers/orderController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");

router.route("/order/new").post(isAuthenticatedUser, newOrder);

module.exports = router;
