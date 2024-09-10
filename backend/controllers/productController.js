const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

//Create Product - /api/v1/admin/products/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    //Adding user id
    req.body.user = req.user.id;

    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product,
    });
});

//Get Products - /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
    const resPerPage = 3;
    const apiFeatures = new APIFeatures(Product.find(), req.query)
        .search()
        .filter()
        .paginate(resPerPage);

    const products = await apiFeatures.query;
    res.status(200).json({
        success: true,
        count: products.length,
        products,
    });
});

//Get Single Product - /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 400));
    }

    res.status(201).json({
        success: true,
        product,
    });
});

//Update Product - /api/v1/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
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
});

//Delete Product - /api/v1/product/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
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
});

//Create Review - /api/v1/review
exports.createReview = catchAsyncErrors(async (req, res, next) => {
    const { productId, rating, comment } = req.body;

    const review = {
        user: req.user.id,
        rating,
        comment,
    };

    //Finding user review exists
    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find((review) => {
        return review.user.toString() == req.user.id.toString();
    });

    if (isReviewed) {
        //Updating the review
        product.reviews.forEach((review) => {
            if (review.user.toString() == req.user.id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        });
    } else {
        //Creating the review
        product.reviews.push(review);
        product.numberOfReviews = product.reviews.length;
    }

    //Finding the average of the product reviews
    product.ratings =
        product.reviews.reduce((acc, review) => {
            return acc + review.rating;
        }, 0) / product.reviews.length;
    product.ratings = isNaN(product.ratings) ? 0 : product.ratings;

    await product.save({ validateBeforeSave: false });

    res.status(201).json({
        success: true,
    });
});

//Get Reviews - /api/v1/reviews?id={productId}
exports.getReviews = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete Review - /api/v1/review?:id={productId}
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    //Filtering the reviews which does not match the deletign review id
    const reviews = product.reviews.filter((review) => {
        return review._id.toString() !== req.query.id.toString();
    });

    //number of reviews
    const numOfReviews = reviews.length;

    //finding the average with filtered reviews
    let ratings =
        reviews.reduce((acc, review) => {
            return acc + review.rating;
        }, 0) / product.reviews.length;

    ratings = isNaN(ratings) ? 0 : ratings;

    //saving the product document
    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        numberOfReviews: numOfReviews,
        ratings,
    });

    res.status(200).json({
        success: true,
    });
});
