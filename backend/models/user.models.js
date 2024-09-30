import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Lütfen isminizi giriniz."],
      maxLength: [50, "50 Karakterden az olmalı."],
    },
    lastName: {
      type: String,
      required: [true, "Lütfen soyisminizi giriniz."],
      maxLength: [30, "30 Karakterden az olmalı."],
    },
    email: {
      type: String,
      required: [true, "Lütfen email adresinizi giriniz."],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Lütfen şifrenizi Giriniz"],
      minLength: [6, "Şifreniz 6 karakterden fazla olmalıdır."],
      select: false,
    },
    userAddress: {
      city: {
        type: String,
      },
      country: {
        type: String,
      },
      address: {
        type: String,
      },
      phoneNumber: {
        type: String,
      },
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: "",
    },
    courier: {
      type: String,
      default: "normal",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  this.name = this.name.replace(/\s+/g, "").toLowerCase();
  this.lastName = this.lastName.replace(/\s+/g, "").toLowerCase();
  this.email = this.email.replace(/\s+/g, "").toLowerCase();

  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 24 * 60 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", userSchema);
