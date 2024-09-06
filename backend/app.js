const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/error");

app.use(express.json());
const products = require("./routes/product");
const auth = require("./routes/auth");
const error = require("./middlewares/error");

//Middleware
app.use("/api/v1/", products);
app.use("/api/v1", auth);
app.use(errorMiddleware);

module.exports = app;
