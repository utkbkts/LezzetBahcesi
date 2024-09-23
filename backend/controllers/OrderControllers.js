import catchAsyncError from "../middleware/catchAsyncError.js";
import Order from "../models/Order.js";
import Product from "../models/productModel.js";
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
  } = req.body;
  console.log(
    "Product IDs in basket:",
    req.body.basketItems.map((item) => item)
  );

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
        name: { $first: "$basketItems.title" },
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

const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  console.log("🚀 ~ updateOrderStatus ~ order:", order.orderStatus);
  console.log("🚀 ~ updateOrderStatus ~ order:", req.body);

  if (order.orderStatus === "Teslim Edilmiştir.") {
    return next(new errorHandler("bu ürünü zaten teslim ettiniz"));
  }

  let productNotFound = false;

  for (const item of order.basketItems) {
    const product = await Product.findById(item.product.toString());
    if (!product) {
      productNotFound = true;
      break;
    }
    product.stock = product.stock - item.quantity;
    await product.save();
  }
  if (productNotFound) {
    return next(new errorHandler("ürün ID bulunamadı", 400));
  }
  order.orderStatus = req.body.status;
  if (req.body.status === "Teslim Edilmiştir.") {
    order.deliveredAt = Date.now();
  }
  await order.save();
  res.status(200).json({
    success: true,
  });
});

export default {
  newOrder,
  orderGetProduct,
  orderTodayGet,
  orderDelete,
  getOrderDetail,
  getUserOrder,
  updateOrderStatus,
};
