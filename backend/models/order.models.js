import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    shippingAddress: {
      contactName: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      phoneNumber: {
        type: String,
        required: true,
      },
    },
    basketItems: [
      {
        title: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
        },
        price: {
          type: Number,
          required: false,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        drinks: {
          names: String,
          price: Number,
        },
        chips: {
          name: String,
          price: Number,
        },
        sideProducts: {
          names: String,
          price: Number,
        },
      },
    ],
    orderStatus: {
      type: String,
      enum: {
        values: ["Hazırlanıyor", "Kuryemiz Yolda", "Teslim Edilmiştir."],
        message: "Lütfen Statü'yü belirleyiniz.",
      },
      default: "Hazırlanıyor",
    },
    deliveredAt: Date,
    totalAmount: {
      type: Number,
      required: true,
    },
    taxAmount: {
      type: Number,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: [true, "Lütfen Ödeme yöntemi belirleyiniz."],
      enum: {
        values: ["Nakit", "Kart"],
        message: "Kart veya Nakit birisini seçiniz.",
      },
    },

    paymentInfo: {
      id: String,
      status: String,
      transactionId: String,
    },
    itemsPrice: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);
const Order = mongoose.model("Order", orderSchema);

export default Order;
