const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, avatar } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar,
    });

    sendToken(user, 201, res);
});

exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email) {
        return next(new ErrorHandler("Please enter email", 400));
    }
    if (!password) {
        return next(new ErrorHandler("Please enter password", 400));
    }

    //Finding the user database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    if (!(await user.isValidPassword(password))) {
        return next(new ErrorHandler("Invalid credentials", 401));
    }

    sendToken(user, 201, res);
});
