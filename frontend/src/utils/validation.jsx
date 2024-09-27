import { z } from "zod";

export const updateProfileCreate = z.object({
  email: z.string().email().optional(),
  name: z
    .string()
    .optional()
    .refine((value) => !value || /^[a-zA-Z0-9çÇğĞüÜşŞöÖıİ_-]+$/.test(value), {
      message:
        "Özel karakterler kullanamazsınız (sadece harf, rakam ve alt çizgi).",
    }),
  lastName: z
    .string()
    .optional()
    .refine((value) => !value || /^[a-zA-Z0-9çÇğĞüÜşŞöÖıİ_-]+$/.test(value), {
      message:
        "Özel karakterler kullanamazsınız (sadece harf, rakam ve alt çizgi).",
    }),
  adress: z
    .string()
    .optional()
    .refine((value) => !value || /^[a-zA-Z0-9çÇğĞüÜşŞöÖıİ_-]+$/.test(value), {
      message:
        "Özel karakterler kullanamazsınız (sadece harf, rakam ve alt çizgi).",
    }),
  city: z
    .string()
    .optional()
    .refine((value) => !value || /^[a-zA-Z0-9çÇğĞüÜşŞöÖıİ_-]+$/.test(value), {
      message:
        "Özel karakterler kullanamazsınız (sadece harf, rakam ve alt çizgi).",
    }),
  country: z
    .string()
    .optional()
    .refine((value) => !value || /^[a-zA-Z0-9çÇğĞüÜşŞöÖıİ_-]+$/.test(value), {
      message:
        "Özel karakterler kullanamazsınız (sadece harf, rakam ve alt çizgi).",
    }),

  phoneNumber: z
    .string()
    .optional()
    .refine((value) => !value || /^[0-9_-]+$/.test(value), {
      message: "özel karakterler kullanamazsınız.(sadece rakam)",
    }),
});

export const updatePassword = z.object({
  OldPassword: z
    .string()
    .min(1, "zorunlu alan")
    .regex(/^[a-zA-Z0-9ğüişçöpşlğıokmjun,.\s]*$/, {
      message: "Özel karakteler girilemez",
    }),
  password: z
    .string()
    .min(1, "zorunlu alan")
    .regex(/^[a-zA-Z0-9ğüişçöpşlğıokmjun,.\s]*$/, {
      message: "Özel karakteler girilemez",
    }),
});

export const contactPage = z.object({
  email: z.string().email("Mail adresinizi doğru girdiğinizden emin olunuz."),
  message: z
    .string()
    .min(1, "zorunlu alan")
    .refine(
      (value) => !value || /^[a-zA-Z0-9çÇğĞüÜşŞöÖıİ,?\s_-]+$/.test(value),
      {
        message:
          "Özel karakterler kullanamazsınız (sadece harf, rakam ve alt çizgi).",
      }
    ),
});
