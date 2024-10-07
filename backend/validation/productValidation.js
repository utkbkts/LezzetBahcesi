import Joi from "joi";

const nutritionSchema = Joi.object({
  nutriation: Joi.string()
    .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
    .required()
    .messages({
      "string.base": "Besin değeri boş bırakılamaz.",
      "any.required": "Besin değeri boş bırakılamaz.",
      "string.pattern.base": "Besin değeri özek karakter kullanamazsın",
    }),
  nutriationGram: Joi.string()
    .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:]+$/)
    .required()
    .messages({
      "string.base": "Besin grami boş bırakılamaz.",
      "any.required": "Besin grami boş bırakılamaz.",
      "string.pattern.base": "Besin grami yalnızca sayılar içerebilir.",
    }),
  nutriationPortion: Joi.string()
    .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
    .required()
    .messages({
      "string.base": "Besin porsiyonu boş bırakılamaz.",
      "any.required": "Besin porsiyonu boş bırakılamaz.",
      "string.pattern.base": "Besin porsiyonu özek karakter kullanamazsın",
    }),
});

// Ana Joi şemasını oluşturuyoruz
const productSchema = Joi.object({
  productDetail: Joi.object({
    kitchen: Joi.string()
      .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
      .required()
      .messages({
        "string.base": "Lütfen ürün mutfağını giriniz.",
        "any.required": "Lütfen ürün mutfağını giriniz.",
        "string.pattern.base": "Ürün mutfağı özek karakter kullanamazsın",
      }),
    title: Joi.string()
      .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
      .required()
      .messages({
        "string.base": "Lütfen ürün ismini giriniz.",
        "any.required": "Lütfen ürün ismini giriniz.",
        "string.pattern.base": "Ürün ismi özek karakter kullanamazsın",
      }),
    description: Joi.string()
      .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
      .required()
      .messages({
        "string.base": "Lütfen ürün açıklamasını giriniz.",
        "any.required": "Lütfen ürün açıklamasını giriniz.",
        "string.pattern.base": "Ürün açıklaması özek karakter kullanamazsın",
      }),
    price: Joi.number().required().messages({
      "number.base": "Lütfen ürün fiyatını giriniz.",
      "any.required": "Lütfen ürün fiyatını giriniz.",
    }),
    stock: Joi.number().required().messages({
      "number.base": "Lütfen stok miktarını giriniz.",
      "any.required": "Lütfen stok miktarını giriniz.",
    }),
    details: Joi.string()
      .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
      .required()
      .messages({
        "string.base": "Lütfen ürün detaylarını giriniz.",
        "any.required": "Lütfen ürün detaylarını giriniz.",
        "string.pattern.base": "Ürün detayları özek karakter kullanamazsın",
      }),
  }),

  tags: Joi.object({
    drinksValue: Joi.array().items(
      Joi.object({
        drinkProduct: Joi.string()
          .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
          .required()
          .messages({
            "string.base": "İçecek ürünü boş bırakılamaz.",
            "any.required": "İçecek ürünü boş bırakılamaz.",
            "string.pattern.base": "İçecek ürünü özek karakter kullanamazsın",
          }),
        drinkProductPrice: Joi.string().required().messages({
          "string.base": "İçecek fiyatı boş bırakılamaz.",
          "any.required": "İçecek fiyatı boş bırakılamaz.",
        }),
        id: Joi.string().required().messages({
          "string.base": "İçecek ID boş bırakılamaz.",
          "any.required": "İçecek ID boş bırakılamaz.",
        }),
      })
    ),
    potatoValue: Joi.array().items(
      Joi.object({
        potato: Joi.string()
          .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
          .required()
          .messages({
            "string.base": "Patates ürünü boş bırakılamaz.",
            "any.required": "Patates ürünü boş bırakılamaz.",
            "string.pattern.base": "Patates ürünü özek karakter kullanamazsın",
          }),
        potatoPrice: Joi.string().required().messages({
          "string.base": "Patates fiyatı boş bırakılamaz.",
          "any.required": "Patates fiyatı boş bırakılamaz.",
        }),
        id: Joi.string().required().messages({
          "string.base": "Patates ID boş bırakılamaz.",
          "any.required": "Patates ID boş bırakılamaz.",
        }),
      })
    ),
    sauceValue: Joi.array().items(
      Joi.object({
        sauce: Joi.string()
          .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
          .required()
          .messages({
            "string.base": "Sos boş bırakılamaz.",
            "any.required": "Sos boş bırakılamaz.",
            "string.pattern.base": "Sos özek karakter kullanamazsın",
          }),
        saucePrice: Joi.string().required().messages({
          "string.base": "Sos fiyatı boş bırakılamaz.",
          "any.required": "Sos fiyatı boş bırakılamaz.",
        }),
        id: Joi.string().required().messages({
          "string.base": "Sos ID boş bırakılamaz.",
          "any.required": "Sos ID boş bırakılamaz.",
        }),
      })
    ),
    sideProductValue: Joi.array().items(
      Joi.object({
        sideProduct: Joi.string()
          .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
          .required()
          .messages({
            "string.base": "Yan ürün boş bırakılamaz.",
            "any.required": "Yan ürün boş bırakılamaz.",
            "string.pattern.base": "Yan ürün özek karakter kullanamazsın",
          }),
        sideProductPrice: Joi.string().required().messages({
          "string.base": "Yan ürün fiyatı boş bırakılamaz.",
          "any.required": "Yan ürün fiyatı boş bırakılamaz.",
        }),
        id: Joi.string().required().messages({
          "string.base": "Yan ürün ID boş bırakılamaz.",
          "any.required": "Yan ürün ID boş bırakılamaz.",
        }),
      })
    ),
  }),

  nutriation: Joi.object({
    nutriationValue: Joi.array().items(nutritionSchema).required().messages({
      "array.base": "Besin değerleri boş bırakılamaz.",
      "any.required": "Besin değerleri boş bırakılamaz.",
    }),
  }),

  ratings: Joi.number().default(0),
  category: Joi.string()
    .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ/.:\s]+$/)
    .required()
    .messages({
      "string.base": "Lütfen ürün kategorisini giriniz.",
      "any.required": "Lütfen ürün kategorisini giriniz.",
      "string.pattern.base": "Ürün kategorisi özek karakter kullanamazsın",
    }),

  numOfReviews: Joi.number().default(0),
  reviews: Joi.array()
    .items(
      Joi.object({
        rating: Joi.number().required().messages({
          "number.base": "Lütfen puanınızı giriniz.",
          "any.required": "Lütfen puanınızı giriniz.",
        }),
        comment: Joi.string().required().messages({
          "string.base": "Lütfen yorumu giriniz.",
          "any.required": "Lütfen yorumu giriniz.",
        }),
        createdAt: Joi.date().default(Date.now),
      })
    )
    .optional(),

  images: Joi.array()
    .items(
      Joi.object({
        public_id: Joi.string().optional(),
        url: Joi.string().optional(),
      })
    )
    .optional(),
});

export default productSchema;
