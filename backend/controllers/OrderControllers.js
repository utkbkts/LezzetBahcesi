import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../models/Order.js";
import errorHandler from "../utils/errorHandler.js";
const newOrder = catchAsyncError(async (req, res, next) => {
  const {
    basketItems,
    shippingAddress,
    totalAmount,
    taxAmount,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    paymentCard,
    phoneNumber,
    productId,
  } = req.body;

  const order = await Order.create({
    basketItems,
    shippingAddress,
    totalAmount,
    taxAmount,
    paymentMethod,
    paymentInfo,
    itemsPrice,
    paymentCard,
    phoneNumber,
    user: req.user._id,
    productId,
  });

  res.status(200).json({
    order,
  });
});

const orderGetProduct = catchAsyncError(async (req, res, next) => {
  const product = await Order.find();
  const groupCheck = await Order.aggregate([
    { $unwind: "$basketItems" },
    {
      $group: {
        _id: "$basketItems._id",
        totalQuantity: { $sum: "$basketItems.quantity" },
        name: { $first: "$basketItems.name" },
      },
    },
    {
      $limit: 3,
    },
  ]);

  res.status(200).json({
    product,
    groupCheck,
  });
});

const orderTodayGet = catchAsyncError(async (req, res, next) => {
  const now = new Date();
  const past24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const count = await Order.countDocuments({
    createdAt: { $gte: past24Hours, $lte: now },
  });

  res.status(200).json({
    count,
  });
});

const orderDelete = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new errorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

const getOrderDetail = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    return next(new errorHandler("No Order found with this ID", 404));
  }

  res.status(200).json({
    order,
  });
});

const getUserOrder = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId }).populate("user");

  if (!orders || orders.length === 0) {
    return next(new errorHandler("No Orders found for this user", 404));
  }

  res.status(200).json({
    orders,
  });
});

export default {
  newOrder,
  orderGetProduct,
  orderTodayGet,
  orderDelete,
  getOrderDetail,
  getUserOrder,
};
