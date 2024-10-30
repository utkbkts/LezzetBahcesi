import Iyzipay from "iyzipay";
import catchAsyncError from "../middleware/catch.middleware.js";
import Order from "../models/order.models.js";
import { customAlphabet } from "nanoid";
import ErrorHandler from "../utils/errorHandler.js";
import moment from "moment";
import { io } from "../socket/socket.js";
const iyzico = new Iyzipay({
  apiKey: process.env.IYZIPAY_API_KEY,
  secretKey: process.env.IYZIPAY_SECRET_KEY,
  uri: "https://sandbox-api.iyzipay.com",
});

const alphabet = process.env.ALPHABET;
const nanoid = customAlphabet(alphabet, 9);

const paymentCreate = catchAsyncError(async (req, res, next) => {
  const {
    shippingAddress,
    basketItems,
    itemsPrice,
    taxAmount,
    paymentInfo,
    totalAmount,
    cardHolderName,
    cardNumber,
    expireMonth,
    expireYear,
    cvc,
  } = req.body;
  const request = {
    locale: Iyzipay.LOCALE.TR,
    conversationId: nanoid(),
    price: itemsPrice,
    paidPrice: totalAmount,
    currency: Iyzipay.CURRENCY.TRY,
    installment: "1",
    basketId: nanoid(),
    paymentChannel: Iyzipay.PAYMENT_CHANNEL.WEB,
    paymentGroup: Iyzipay.PAYMENT_GROUP.PRODUCT,
    paymentCard: {
      cardHolderName: cardHolderName,
      cardNumber: cardNumber,
      expireMonth: expireMonth,
      expireYear: expireYear,
      cvc: cvc,
      registerCard: "0",
    },
    buyer: {
      id: req?.user?._id.toString(),
      name: req?.user?.name,
      surname: req?.user?.name?.split(" ")[1] || req?.user?.name?.split(" ")[0],
      gsmNumber: shippingAddress.phoneNumber,
      email: req?.user?.email,
      identityNumber: shippingAddress.identityNumber,
      lastLoginDate: moment(req.user?.updatedAt).format("YYYY-MM-DD HH:mm:ss"),
      registrationDate: moment(req.user?.updatedAt).format(
        "YYYY-MM-DD HH:mm:ss"
      ),
      registrationAddress: shippingAddress.address,
      ip: "85.85.45.45",
      city: shippingAddress.city,
      country: shippingAddress.country,
      zipCode: shippingAddress.zipCode,
    },
    shippingAddress: {
      contactName: shippingAddress.contactName,
      city: shippingAddress.city,
      country: shippingAddress.country,
      address: shippingAddress.address,
      zipCode: shippingAddress.zipCode,
    },
    billingAddress: {
      contactName: shippingAddress.contactName,
      city: shippingAddress.city,
      country: shippingAddress.country,
      address: shippingAddress.address,
      zipCode: shippingAddress.zipCode,
    },
    basketItems: basketItems.map((item) => ({
      id: item.product,
      name: item.title,
      category1: item.title[0],
      category2: item.title[1],
      itemType: Iyzipay.BASKET_ITEM_TYPE.PHYSICAL,
      price: item.price,
    })),
  };
  const order = {
    shippingAddress,
    basketItems,
    itemsPrice,
    taxAmount,
    totalAmount,
    paymentInfo,
    paymentMethod: "Kart",
    user: req.user._id,
  };
  const createdOrder = await Order.create(order);

  iyzico.payment.create(request, (err, result) => {
    if (err) {
      return next(new ErrorHandler("Ödeme işlemi başarısız", 404));
    } else {
      io.emit("new-order", createdOrder);
      return res.status(200).json({
        result,
      });
    }
  });
});

export default {
  paymentCreate,
};
