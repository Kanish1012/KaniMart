const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
        validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter password"],
        minLength: [8, "Password should be at least 8 characters"],
        maxLength: [12, "Password cannot exceed 12 characters"],
        select: false,
    },
    avatar: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    },
    resetPasswordToken: {
        type: String,
    },
    resetPasswordTokenExpire: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//Hashing password
userSchema.pre("save", async function (next) {
    // If password field is not modified, skip hashing
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


//JWT token generation
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

//Validating password
userSchema.methods.isValidPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

//Reset token
userSchema.methods.getResetToken = function () {
    //Generate Token
    const token = crypto.randomBytes(20).toString("hex");

    //Generate Hash and set to resetPasswordToken
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    //Set token expire time
    this.resetPasswordTokenExpire = Date.now() + 30 * 60 * 1000;

    return token;
};

let model = mongoose.model("User", userSchema);
module.exports = model;
