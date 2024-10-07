import Joi from "joi";

// Rezervasyon için Joi validasyon şeması
const reservationSchema = Joi.object({
  name: Joi.string()
    .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s]+$/)
    .required()
    .messages({
      "string.base": "İsim alanı boş bırakılamaz.",
      "any.required": "İsim alanı boş bırakılamaz.",
      "string.pattern.base": "Özel karakter kullanamazsın.",
    }),

  lastname: Joi.string()
    .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s]+$/)
    .required()
    .messages({
      "string.base": "Soyisim alanı boş bırakılamaz.",
      "any.required": "Soyisim alanı boş bırakılamaz.",
      "string.pattern.base": "Özel karakter kullanamazsın.",
    }),

  times: Joi.string().optional().messages({
    "string.base": "Zaman alanı geçerli bir değer olmalıdır.",
    "string.pattern.base": "Özel karakter kullanamazsın.",
  }),

  table: Joi.string()
    .pattern(/^[a-zA-Z0-9ğüşıöçĞÜŞİÖÇ\s]+$/)
    .required()
    .messages({
      "string.base": "Masa alanı boş bırakılamaz.",
      "any.required": "Masa alanı boş bırakılamaz.",
      "string.pattern.base": "Özel karakter kullanamazsın.",
    }),

  numberOfPeople: Joi.number().required().messages({
    "number.base": "Kişi sayısı boş bırakılamaz.",
    "number.min": "Kişi sayısı en az 1 olmalıdır.",
    "any.required": "Kişi sayısı boş bırakılamaz.",
  }),

  note: Joi.string().optional().messages({
    "string.base": "Not alanı geçerli bir değer olmalıdır.",
    "string.pattern.base": "Özel karakter kullanamazsın.",
  }),

  status: Joi.string()
    .valid("Bekliyor", "Oturuyor", "İptal", "Onaylı", "Çıkış Yaptı")
    .default("Bekliyor")
    .messages({
      "string.base": "Statü alanı geçerli bir değer olmalıdır.",
      "any.only":
        "Statü alanı geçerli değerlerden biri olmalıdır: Bekliyor, Oturuyor, İptal, Onaylı, Çıkış Yaptı.",
    }),
});

// Şemayı dışa aktarma
export default reservationSchema;
