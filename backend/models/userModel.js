const mongoose = require("mongoose");
const validator = require("validator");

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
    resetPasswordExpire: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

let model = mongoose.model("User", userSchema);
module.exports = model;
