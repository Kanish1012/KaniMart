const Product = require("../models/productModel");

//Create Product - /api/v1/products/new
exports.newProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
};

//Get Products - /api/v1/products
exports.getProducts = async (req, res, next) => {
    const products = await Product.find();
    res.status(200).json({
        success: true,
        count: products.length,
        products,
    });
};

//Get Single Product - /api/v1/product/:id
exports.getSingleProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    res.status(201).json({
        success: true,
        product,
    });
};

//Update Product - /api/v1/product/:id
exports.updataProduct = async (req, res, next) => {
    let product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        product,
    });
};

//Delete Product - /api/v1/product/:id
exports.deleteProduct = async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
        });
    }

    await product.deleteOne();

    res.status(200).json({
        success: true,
        message: "Product deleted successfully",
    });
};
