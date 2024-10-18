import catchAsyncError from "../middleware/catch.middleware.js";
import Order from "../models/order.models.js";
import Product from "../models/product.models.js";
import { io, notifyOrderStatusUpdated } from "../socket/socket.js";
import ErrorHandler from "../utils/errorHandler.js";
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
  io.emit("new-order", order);
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

const orderDelete = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }

  await order.deleteOne();
  res.status(200).json({
    success: true,
  });
});

const getOrderDetail = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user");

  if (!order) {
    return next(new ErrorHandler("No Order found with this ID", 404));
  }
  res.status(200).json({
    order,
  });
});

const getUserOrder = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  const orders = await Order.find({ user: userId }).populate("user");

  if (!orders || orders.length === 0) {
    return next(new ErrorHandler("No Orders found for this user", 404));
  }

  res.status(200).json({
    orders,
  });
});

const updateOrderStatus = catchAsyncError(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Sipariş bulunamadı", 404));
  }

  if (order.orderStatus === "Teslim Edilmiştir.") {
    return next(new ErrorHandler("Bu siparişi zaten teslim ettiniz.", 400));
  }

  if (req.body.status === "Teslim Edilmiştir.") {
    let productNotFound = false;

    for (const item of order.basketItems) {
      const product = await Product.findById(item.product.toString());

      if (!product) {
        productNotFound = true;
        break;
      }

      // Stok düşüşünü sadece teslimat durumunda yap
      product.productDetail.stock -= item.quantity;
      await product.save();
    }

    if (productNotFound) {
      return next(new ErrorHandler("Ürün ID bulunamadı", 400));
    }

    order.orderStatus = "Teslim Edilmiştir.";
    order.deliveredAt = Date.now();
    order.paymentInfo.status = "Ödendi";
  } else {
    order.orderStatus = req.body.status;
  }
  // Durum güncellenince bildirim gönder

  const orderSocketID = notifyOrderStatusUpdated(order.user.toString(), order);
  console.log(order.user.toString(), order);
  if (orderSocketID) {
    console.log("Socket ID bulundu, orderStatusUpdated gönderiliyor.");
    io.to(orderSocketID).emit("orderStatusUpdated", {
      order,
      message: "Sipariş durumu güncellendi.",
    });
  } else {
    console.log("Socket ID bulunamadı, bildirim gönderilemedi.");
  }

  await order.save();

  res.status(200).json({
    success: true,
    message: "Sipariş durumu başarıyla güncellendi.",
  });
});

export default {
  newOrder,
  orderGetProduct,
  orderDelete,
  getOrderDetail,
  getUserOrder,
  updateOrderStatus,
};
