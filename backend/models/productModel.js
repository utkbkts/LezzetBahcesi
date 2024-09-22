import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    productDetail: {
      kitchen: {
        type: String,
        required: [true, "Lütfen ürün mutfağını giriniz."],
      },
      title: {
        type: String,
        required: [true, "Lütfen ürün ismini giriniz."],
      },
      description: {
        type: String,
        required: [true, "Lütfen ürün ismini giriniz."],
      },
      price: {
        type: Number,
        required: [true, "Lütfen ürün fiyatını giriniz."],
      },
      stock: {
        type: Number,
        required: [true, "Lütfen stok miktarını giriniz."],
      },
      details: {
        type: String,
        required: [true, "Lütfen detay giriniz."],
      },
    },

    tags: {
      drinksValue: [
        {
          drinkProduct: {
            type: String,
            required: true,
          },
          drinkProductPrice: {
            type: String,
            required: true,
          },
          id: {
            type: String,
            required: true,
          },
        },
      ],
      potatoValue: [
        {
          potato: {
            type: String,
            required: true,
          },
          potatoPrice: {
            type: String,
            required: true,
          },
          id: {
            type: String,
            required: true,
          },
        },
      ],
      sauceValue: [
        {
          sauce: {
            type: String,
            required: true,
          },
          saucePrice: {
            type: String,
            required: true,
          },
          id: {
            type: String,
            required: true,
          },
        },
      ],
      sideProductValue: [
        {
          sideProduct: {
            type: String,
            required: true,
          },
          sideProductPrice: {
            type: String,
            required: true,
          },
          id: {
            type: String,
            required: true,
          },
        },
      ],
    },

    nutriation: {
      nutriationValue: [
        {
          nutriation: {
            type: String,
            required: true,
          },
          nutriationGram: {
            type: String,
            required: true,
          },
          nutriationPortion: {
            type: String,
            required: true,
          },
        },
      ],
    },

    ratings: {
      type: Number,
      default: 0,
    },
    category: {
      type: String,
      required: [true, "Lütfen ürün kategorisini giriniz."],
    },

    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],

    images: [
      {
        public_id: {
          type: String,
        },
        url: {
          type: String,
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
