const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");
const ErrorHandler = require("../utils/errorHandler");
const sendToken = require("../utils/jwt");

//Register User
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

//Login User
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

//Logout User
exports.logoutUser = (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    })
        .status(200)
        .json({
            success: true,
            message: "Logged out successfully",
        });
};

//Forgot Password
exports.forgotPassword = catchAsyncError(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    const resetToken = user.getResetToken();
    user.save({ validateBeforeSave: false });

    //Create reset url
    const resetUrl = `${req.protocol}://${req.get(
        "host"
    )}/api/v1/password/reset/${resetToken}`;

    const message = `Your password reset url is as follows \n\n
    ${resetUrl}\n\n
    If you did not request this, please ignore this email`;

    try {
        sendEmail({
            email: user.email,
            subject: "KaniMart Password Recovery",
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`,
        });
    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500));
    }
});
