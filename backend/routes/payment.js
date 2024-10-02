const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../middlewares/authenticate");
const {
    processPayment,
    sendStripeAPI,
} = require("../controllers/paymentController");

router.route("/payment/process").post(isAuthenticatedUser, processPayment);
router.route("/stripeapi").get(sendStripeAPI);

module.exports = router;
