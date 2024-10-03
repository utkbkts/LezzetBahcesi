export const SideProducts = [
  {
    id: 1,
    fields: [
      {
        label: "Yan Ürün Adı:",
        type: "text",
        name: "sideProduct",
        rules: [
          { required: true, message: "Lütfen yan ürün adını giriniz" },
          {
            pattern: /^[0-9a-zA-ZşğüöçıİĞŞ()%:\s]+$/,
            message:
              "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
          },
        ],
      },
      {
        label: "Yan Ürün Fiyatı:",
        type: "number",
        name: "sideProductPrice",
        rules: [
          { required: true, message: "Lütfen yan ürün fiyatını giriniz" },
          {
            pattern: /^[0-9\s]+$/,
            message: "Sadece rakam kullanabilirsiniz.",
          },
        ],
      },
    ],
  },
];
export const DrinkProducts = [
  {
    id: 1,
    fields: [
      {
        label: "İçecek Adı:",
        type: "text",
        name: "drinks",
        rules: [
          { required: true, message: "Lütfen içecek adını giriniz" },
          {
            pattern: /^[0-9a-zA-ZşğüöçıİĞŞ%\-:\s]+$/,

            message:
              "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
          },
        ],
      },
      {
        label: "İçecek Fiyatı:",
        type: "number",
        name: "drinksPrice",
        rules: [
          { required: true, message: "Lütfen içecek fiyatını giriniz" },
          {
            pattern: /^[0-9\s]+$/,
            message: "Sadece rakam kullanabilirsiniz.",
          },
        ],
      },
    ],
  },
];
export const PotatoProducts = [
  {
    id: 1,
    fields: [
      {
        label:
          "Elma dilim veya parmak patates olarak küçük,orta,büyük olarak belirtin:örn:elma dilim patates(Büyük Boy)",
        type: "text",
        name: "potato",
        rules: [
          {
            required: true,
            message: "Lütfen cips adını giriniz.",
          },
          {
            pattern: /^[0-9a-zA-ZşğüöçıİĞŞ%()\-:\s]+$/,
            message:
              "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
          },
        ],
      },
      {
        label: "Patates Cipsi Fiyatı:",
        type: "number",
        name: "potatoPrice",
        rules: [
          { required: true, message: "Lütfen cips fiyatını giriniz" },
          {
            pattern: /^[0-9\s]+$/,
            message: "Sadece rakam kullanabilirsiniz.",
          },
        ],
      },
    ],
  },
];
export const SauceProducts = [
  {
    id: 1,
    fields: [
      {
        label: "Sos Adı:",
        type: "text",
        name: "sauce",
        rules: [
          { required: true, message: "Lütfen sos adını giriniz" },
          {
            pattern: /^[0-9a-zA-ZşğüöçıİĞŞ()%:\s]+$/,
            message:
              "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
          },
        ],
      },
      {
        label: "Sos Fiyatı:",
        type: "number",
        name: "saucePrice",
        rules: [
          { required: true, message: "Lütfen sos fiyatını giriniz" },
          {
            pattern: /^[0-9\s]+$/,
            message: "Sadece rakam kullanabilirsiniz.",
          },
        ],
      },
    ],
  },
];
export const addProductTitle = [
  {
    id: 1,
    placeholder: "Ürün Mutfağını Giriniz.",
    type: "text",
    name: "kitchen",
    rules: [
      { required: true, message: "Lütfen Mutfak Adını giriniz" },
      {
        pattern: /^[0-9a-zA-ZşğüöçıİĞŞ()%:\s]+$/,
        message:
          "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
      },
    ],
  },
  {
    id: 2,
    placeholder: "Ürün İsmini Giriniz.",
    type: "text",
    name: "title",
    rules: [
      { required: true, message: "Lütfen Ürün Adını giriniz" },
      {
        pattern: /^[0-9a-zA-ZşğüöçıİĞŞ()%:\s]+$/,
        message:
          "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
      },
    ],
  },
  {
    id: 3,
    placeholder: "Ürün Açıklamasını Giriniz.",
    type: "text",
    name: "description",
    rules: [
      { required: true, message: "Lütfen Açıklamasını giriniz" },
      {
        pattern: /^[0-9a-zA-ZşğüöçıİĞŞ()%:\s]+$/,
        message:
          "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
      },
    ],
  },
  {
    id: 4,
    placeholder: "Ürün Stok Miktarını Giriniz.",
    type: "text",
    name: "stock",
    rules: [
      { required: true, message: "Lütfen stok miktarını giriniz" },
      {
        pattern: /^[0-9\s]+$/,
        message: "Sadece rakam kullanabilirsiniz.",
      },
    ],
  },
  {
    id: 5,
    placeholder: "Ürün İçeriğini giriniz.",
    type: "textarea",
    name: "details",
    rules: [
      { required: true, message: "Lütfen ürün içeriğini detaylandırınız" },
      {
        min: 100,
        message: "Ürün detayları 100 karakterden uzun olmalı.",
      },
    ],
  },
  {
    id: 6,
    placeholder: "Ürün Fiyatı giriniz.",
    type: "text",
    name: "price",
    rules: [{ required: true, message: "Lütfen fiyatını giriniz." }],
  },
];
export const NutriationData = [
  {
    id: 1,
    fields: [
      {
        label: "Besin adı",
        type: "text",
        name: "nutriation",
        rules: [
          { required: true, message: "Lütfen besin adını giriniz" },
          {
            pattern: /^[0-9a-zA-ZşğüöçıİĞŞ()%:\s]+$/,
            message:
              "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
          },
        ],
      },
      {
        label: "Besin Fiyatı:1 porsiyon",
        type: "text",
        name: "nutriationPortion",
        rules: [
          { required: true, message: "Lütfen porsiyon fiyatını giriniz" },
          {
            pattern: /^[0-9a-zA-ZşğüöçıİĞŞ()%:\s]+$/,
            message: "Sadece rakam kullanabilirsiniz.",
          },
        ],
      },
      {
        label: "Besin Fiyatı:100gr",
        type: "text",
        name: "nutriationGram",
        rules: [
          { required: true, message: "Lütfen gram fiyatını giriniz" },
          {
            pattern: /^[0-9a-zA-ZşğüöçıİĞŞ()%:\s]+$/,
            message: "Sadece rakam kullanabilirsiniz.",
          },
        ],
      },
    ],
  },
];
export const updateProfileData = [
  {
    id: 1,
    name: "name",
    type: "text",
    label: "isim",
  },
  {
    id: 2,
    name: "lastName",
    type: "text",
    label: "Soy isim",
  },
  {
    id: 3,
    name: "email",
    type: "email",
    label: "Email",
  },
  {
    id: 4,
    name: "phoneNumber",
    type: "text",
    label: "Telefon numarası",
  },
  {
    id: 5,
    name: "city",
    type: "text",
    label: "Şehir",
  },
  {
    id: 6,
    name: "country",
    type: "text",
    label: "Ülke",
  },
  {
    id: 7,
    name: "address",
    type: "text",
    label: "Adres",
  },
];
