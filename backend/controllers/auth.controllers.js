import catchAsyncError from "../middleware/catch.middleware.js";
import User from "../models/user.models.js";
import { delete_file } from "../utils/cloudinary.js";
import { getResetPasswordTemplate } from "../utils/emailTemplates.js";
import ErrorHandler from "../utils/errorHandler.js";
import sendEmail from "../utils/sendEmail.js";
import sendToken from "../utils/sendToken.js";
import crypto from "crypto";
const RegisterUser = catchAsyncError(async (req, res, next) => {
  const { name, email, lastName, password, confirmPassword } = req.body;
  if (!name || !lastName || !email || !password || !confirmPassword) {
    return next(new ErrorHandler("Lütfen boş olan yerleri doldurunuz.", 400));
  }
  if (password !== confirmPassword) {
    return next(new ErrorHandler("Şifreler eşleşmiyor", 400));
  }
  const emailExists = await User.findOne({ email });
  if (emailExists) {
    return next(new ErrorHandler("Email kullanılıyor", 400));
  }
  const user = await User.create({
    name: name.trim().toLowerCase(),
    lastName: lastName.trim().toLowerCase(),
    email: email.trim().toLowerCase(),
    password,
  });

  sendToken(user, 201, res);
});

const LoginUser = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Lütfen Email veya şifrenizi giriniz", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Email veya şifre yanlış.", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Şifre yanlış.", 401));
  }
  if (user.isBlocked === true) {
    return next(new ErrorHandler("Hesabınız engellenmiştir..", 401));
  }
  sendToken(user, 200, res);
});

const LogoutUser = catchAsyncError(async (req, res, next) => {
  res.cookie("jwtToken", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

const GetUserProfile = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id);

  res.status(200).json({
    user,
  });
});

//admin yönlendirme
const getAllUsersAdmin = catchAsyncError(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    users,
  });
});

const updateProfile = catchAsyncError(async (req, res, next) => {
  const { name, email, userAddress, lastName } = req.body;

  if (email) {
    const existingUser = await User.findOne({ email: email });
    if (
      existingUser &&
      existingUser._id.toString() !== req.user._id.toString()
    ) {
      return res.status(400).json({
        success: false,
        message: "Bu email zaten kullanılıyor.",
      });
    }
  }
  const newUserData = {
    name,
    email,
    lastName,
    userAddress,
  };
  const user = await User.findByIdAndUpdate(req.user._id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    user,
  });
});

const UpdateProfilePassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req?.user?._id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.OldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Eski parola yanlış", 400));
  }
  user.password = req.body.password;

  await user.save();
  sendToken(user, 200, res);
});
const blockedUser = catchAsyncError(async (req, res, next) => {
  const userId = req.params.id;

  const user = await User.findById(userId);
  if (!user) {
    return next(new ErrorHandler(`User not found with id: ${userId}`, 404));
  }

  user.isBlocked = !user.isBlocked;
  await user.save();

  res.json({
    message: user.isBlocked
      ? "Kullanıcı bloklandı"
      : "Kullanıcı bloktan çıkarıldı",
    user,
  });
});

const updateUserRole = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;

  const user = await User.findByIdAndUpdate(
    id,
    { role },
    { new: true, runValidators: true }
  );

  if (!user) {
    return next(
      new ErrorHandler(`User not found with id:${req.params.id}`, 404)
    );
  }
  res.status(200).json({
    success: true,
    user,
  });
});

const ForgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("Email kullanılmıyor", 404));
  }

  const resetToken = user.getResetPasswordToken();

  await user.save();

  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: `Lezzet Bahçesi parola sıfırlama`,
      message,
    });
    res.status(200).json({
      message: `email sent to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    return next(new ErrorHandler(error.message, 500));
  }
});
const ResetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Parola sıfırlama jetonu geçersiz veya süresi dolmuş",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("parolalar eşleşmiyor", 400));
  }
  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();
  sendToken(user, 200, res);
};

export default {
  RegisterUser,
  LoginUser,
  LogoutUser,
  GetUserProfile,
  getAllUsersAdmin,
  updateProfile,
  ResetPassword,
  UpdateProfilePassword,
  blockedUser,
  updateUserRole,
  ForgotPassword,
};
