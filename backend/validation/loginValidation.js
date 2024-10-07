import Joi from "joi";

const loginSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .messages({
      "string.email": "Lütfen geçerli bir e-posta adresi giriniz.",
      "string.empty": "E-posta alanı boş olamaz.",
    }),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{6,30}$")).messages({
    "string.password": "Lütfen şifrenizi giriniz.",
    "string.empty": "Şifre alanı boş bırakılamaz",
  }),
});

export default loginSchema;
