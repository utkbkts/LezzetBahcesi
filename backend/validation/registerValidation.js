import Joi from "joi";

const registerSchema = Joi.object({
  name: Joi.string()
    .pattern(new RegExp("^[a-zA-ZğüşİĞŞÇÖÇÜı]*$"))
    .min(3)
    .max(50)
    .messages({
      "string.pattern.base": "özel karakter kullanamazsın",
      "string.min": "İsim en az 3 karakter olmalıdır.",
      "string.max": "İsim en fazla 50 karakter olmalıdır.",
      "string.empty": "İsim alanı boş bırakılamaz.",
    }),
  lastName: Joi.string()
    .pattern(new RegExp("^[a-zA-ZğüşİĞŞÇÖÇÜı]*$"))
    .min(3)
    .max(50)
    .messages({
      "string.pattern.base": "özel karakter kullanamazsın",
      "string.min": "Soyisim en az 3 karakter olmalıdır.",
      "string.max": "Soyisim en fazla 50 karakter olmalıdır.",
      "string.empty": "Soyisim alanı boş bırakılamaz.",
    }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.email": "Lütfen geçerli bir e-posta adresi giriniz.",
      "string.empty": "E-posta alanı boş olamaz.",
      "string.base": "E-posta alanı metin olmalıdır.",
    }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).messages({
    "string.password": "Lütfen şifrenizi giriniz.",
    "string.empty": "Şifre alanı boş bırakılamaz",
    "string.pattern.base":
      "Şifreniz 6 ile 30 karakter arasında harf ve rakam içermelidir.",
  }),
  confirmPassword: Joi.string().valid(Joi.ref("password")).messages({
    "any.only": "Şifreler eşleşmiyor.",
    "string.empty": "Şifre onayı boş bırakılamaz.",
  }),
  userAddress: Joi.object({
    city: Joi.string(),
    country: Joi.string(),
    address: Joi.string(),
    phoneNumber: Joi.string().pattern(new RegExp("^[0-9]{10,15}$")),
  }),
  avatar: Joi.object({
    url: Joi.string(),
    public_id: Joi.string(),
  }),
}).with("password", "confirmPassword");

export default registerSchema;
