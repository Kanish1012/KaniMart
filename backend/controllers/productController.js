const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");

//Create Product - /api/v1/admin/product/new
exports.newProduct = catchAsyncErrors(async (req, res, next) => {
    let images = [];
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get("host")}`;
    }
    if (req.files.length > 0) {
        req.files.forEach((file) => {
            let url = `${BASE_URL}/uploads//product/${file.originalname}`;
            images.push({ image: url });
        });
    }
    req.body.images = images;
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

    let buildQuery = () => {
        return new APIFeatures(Product.find(), req.query).search().filter();
    };

    const filteredProductsCount = await buildQuery().query.countDocuments({});
    const totalProductsCount = await Product.countDocuments();
    let productsCount = totalProductsCount;

    if (filteredProductsCount !== totalProductsCount) {
        productsCount = filteredProductsCount;
    }

    const products = await buildQuery().paginate(resPerPage).query;
    res.status(200).json({
        success: true,
        count: productsCount,
        resPerPage,
        products,
    });
});

//Get Single Product - /api/v1/product/:id
exports.getSingleProduct = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.params.id).populate(
        "reviews.user",
        "name email"
    );

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
    let BASE_URL = process.env.BACKEND_URL;
    if (process.env.NODE_ENV === "production") {
        BASE_URL = `${req.protocol}://${req.get("host")}`;
    }
    //Uploading Images
    let images = [];

    //if images not cleared we keep existing images
    if (req.body.imagesCleared === "false") {
        images = product.images;
    }

    if (req.files.length > 0) {
        req.files.forEach((file) => {
            let url = `${BASE_URL}/uploads//product/${file.originalname}`;
            images.push({ image: url });
        });
    }
    req.body.images = images;

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

//Delete Product - /api/v1/admin/product/:id
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
    const product = await Product.findById(req.query.id).populate(
        "reviews.user",
        "name email"
    );

    res.status(200).json({
        success: true,
        reviews: product.reviews,
    });
});

//Delete Review - /api/v1/review?:id={productId}
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    //Filtering the reviews which does not match the deleting review id
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

//get admin product - api/v1/admin/products
exports.getAdminProducts = catchAsyncErrors(async (req, res, next) => {
    const products = await Product.find();
    res.status(200).send({
        success: true,
        products,
    });
});
