import { Input } from "antd";

export const inputFields = {
  register: [
    {
      id: 1,
      name: "name",
      label: "İsim",
      rules: [
        { required: true, message: "Lütfen isim giriniz." },
        {
          pattern: /^[a-zA-ZÇĞİÖŞÜçğİöşü0-9\s,.'-]+$/,
          message: "Özel karakter kullanamazsınız.",
        },
      ],
      component: <Input placeholder="İsim" />,
    },
    {
      id: 2,
      name: "lastName",
      label: "Soyisim",
      rules: [
        { required: true, message: "Lütfen soyismnizi giriniz." },
        {
          pattern: /^[a-z ,.şğıiüç'-]+$/i,
          message: "Özel karakter kullanamazsınız.",
        },
      ],
      component: <Input placeholder="Soyisim" />,
    },
    {
      id: 3,
      name: "email",
      label: "Email",
      type: "email",
      rules: [
        { required: true, message: "Lütfen email adresinizi giriniz." },
        {
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
          message: "Geçerli bir email adresi giriniz.",
        },
      ],
      component: <Input placeholder="Email" />,
    },
    {
      id: 4,
      name: "password",
      label: "Şifre",
      type: "password",
      rules: [
        { required: true, message: "Lütfen şifrenizi giriniz." },
        {
          pattern: /^[a-zA-Z0-9]+$/,
          message: "özel karakter içeremez",
        },
        {
          min: 6, 
          message: "Şifre en az 6 karakter olmalıdır.",
        },
      ],
      component: <Input.Password placeholder="Password" />,
    },
    {
      id: 5,
      name: "confirmPassword",
      label: "Şifreyi Doğrulayın",
      type: "password",
      rules: [
        { required: true, message: "Lütfen şifrenizi doğrulayın." },
        {
          min: 6, 
          message: "Şifre en az 6 karakter olmalıdır.",
        },
        ({ getFieldValue }) => ({
          validator(_, value) {
            const password = getFieldValue("password");
            if (!value || password === value) {
              return Promise.resolve();
            }
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Şifreler eşleşmiyor!"));
          },
        }),
      ],
      component: <Input.Password placeholder="Password" />,
    },
  ],
  login: [
    {
      id: 1,
      name: "email",
      label: "Email",
      type: "email",
      rules: [
        { required: true, message: "Lütfen email adresinizi giriniz." },
        {
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
          message: "Geçerli bir email adresi giriniz.",
        },
      ],
      component: <Input placeholder="Email" />,
    },
    {
      id: 2,
      name: "password",
      label: "Şifre",
      type: "password",
      rules: [
        { required: true, message: "Lütfen şifrenizi giriniz." },
        {
          min: 6, 
          message: "Şifre en az 6 karakter olmalıdır.",
        },
        {
          pattern: /^[a-zA-Z0-9]+$/,
          message: "Şifreniz özel karakter içeremez",
        },
      ],
      component: <Input.Password placeholder="Password" />,
    },
  ],
  forgot: [
    {
      id: 1,
      name: "email",
      label: "Email",
      type: "email",
      rules: [
        { required: true, message: "Lütfen email adresinizi giriniz." },
        {
          pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/,
          message: "Geçerli bir email adresi giriniz.",
        },
      ],
      component: <Input placeholder="Email" />,
    },
  ],
};
