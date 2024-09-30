/* eslint-disable no-unused-vars */
import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import LoadingButton from "../../ui/LoadingButton";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/AuthApi";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loader";
import PropTypes from "prop-types";
import {
  useForgotPasswordMutation,
  useGetUserQuery,
} from "../../redux/api/UserApi";
const inputFields = {
  register: [
    {
      id: 1,
      name: "name",
      label: "İsim",
      rules: [
        { required: true, message: "Lütfen isminizi giriniz." },
        {
          pattern: /^[a-z ,.şğıiüç'-]+$/i,
          message: "Özel karakter kullanamazsınız.",
        },
      ],
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
      ],
    },
    {
      id: 5,
      name: "confirmPassword",
      label: "Şifreyi Doğrulayın",
      type: "password",
      rules: [
        { required: true, message: "Lütfen şifrenizi doğrulayın." },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue("password") === value) {
              return Promise.resolve();
            }
            return Promise.reject(new Error("Şifreler eşleşmiyor!"));
          },
        }),
      ],
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
    },
    {
      id: 2,
      name: "password",
      label: "Şifre",
      type: "password",
      rules: [
        { required: true, message: "Lütfen şifrenizi giriniz." },
        {
          pattern: /^[a-zA-Z0-9]+$/,
          message: "Şifreniz özel karakter içeremez",
        },
      ],
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
    },
  ],
};

const AuthModal = ({ setShowLogin, showLogin }) => {
  const [state, setState] = useState("login");
  const { data } = useGetUserQuery();

  const [forgotPassword, { error: forgotError, isSuccess: forgotSuccess }] =
    useForgotPasswordMutation();
  const [
    register,
    {
      error: registerError,
      isSuccess: registerSuccess,
      isLoading: registerLoading,
    },
  ] = useRegisterMutation();

  const [
    login,
    { error: loginError, isSuccess: loginSuccess, isLoading: loginLoading },
  ] = useLoginMutation();

  useEffect(() => {
    if (loginError) {
      toast.error(loginError?.data?.message || "Giriş işlemi başarısız!");
    } else if (registerError) {
      toast.error(registerError?.data?.message || "Kayıt işlemi başarısız!");
    } else if (forgotError) {
      toast.error(
        forgotError?.data?.message || "Parola sıfırlama işlemi başarısız!"
      );
    }

    if (loginSuccess) {
      toast.success("Giriş Başarılı!");
      setShowLogin(false);
    } else if (registerSuccess) {
      toast.success("Kayıt Başarılı!");
      setShowLogin(false);
    } else if (forgotSuccess) {
      toast.success("Parola sıfırlama işlemi Başarılı!");
      setShowLogin(false);
    }
  }, [
    loginError,
    registerError,
    loginSuccess,
    registerSuccess,
    forgotSuccess,
    forgotError,
  ]);

  const onFinish = async (values) => {
    if (state === "login") {
      await login(values);
    } else if (state === "forgot") {
      await forgotPassword(values);
    } else {
      await register(values);
    }
  };

  if (loginLoading || registerLoading) {
    return <Loading />;
  }

  return (
    <div className="relative overflow-hidden">
      <div className="h-screen bg-black/60 w-full fixed top-0 left-0 z-10"></div>
      <Modal
        open={showLogin}
        onCancel={() => setShowLogin(false)}
        footer={null}
        className="relative top-44"
      >
        <div className="">
          <h1 className="text-2xl font-semibold mb-6 text-black text-center">
            {state === "login"
              ? "Giriş yap"
              : state === "register"
              ? "Kayıt ol"
              : "Parola Sıfırlama"}
          </h1>
          <Form className="p-8 w-full" onFinish={onFinish} layout="vertical">
            {inputFields[state].map((field, index) => (
              <Form.Item
                key={index}
                rules={field.rules}
                label={<span className="text-gray-800">{field.label}</span>}
                name={field.name}
                hasFeedback
              >
                {field.type === "password" ? (
                  <Input.Password className="focus:text-black text-gray-400 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500" />
                ) : (
                  <Input
                    type={field.type}
                    className="focus:text-black text-gray-400 border-indigo-200 focus:ring-indigo-500 focus:border-indigo-500"
                  />
                )}
              </Form.Item>
            ))}
            <Form.Item>
              <LoadingButton
                type="primary"
                loading={state ? loginLoading : registerLoading}
                htmlType="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
              >
                {state === "login"
                  ? "Giriş yap"
                  : state === "register"
                  ? "Kayıt ol"
                  : "Parolamı sıfırla"}
              </LoadingButton>
            </Form.Item>
          </Form>
          <div className="flex items-center text-black justify-center">
            {state === "login" ? (
              <div className="flex flex-col items-center space-y-3 mt-4">
                <span className="text-gray-600">
                  Hesabın yok mu?{" "}
                  <span
                    className="underline text-blue-500 hover:text-blue-600 transition-colors duration-200 ml-1 cursor-pointer"
                    onClick={() => setState("register")}
                  >
                    Kayıt ol
                  </span>
                </span>
                <span className="text-gray-600">
                  Parolanı mı unuttun?{" "}
                  <span
                    className="underline text-blue-500 hover:text-blue-600 transition-colors duration-200 ml-1 cursor-pointer"
                    onClick={() => setState("forgot")}
                  >
                    şimdi sıfırla
                  </span>
                </span>
              </div>
            ) : (
              <>
                <span>
                  Hesabın var mı?{" "}
                  <span
                    className="underline text-blue-400 cursor-pointer"
                    onClick={() => setState("login")}
                  >
                    Giriş yap
                  </span>
                </span>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};
AuthModal.propTypes = {
  setShowLogin: PropTypes.func,
  showLogin: PropTypes.bool,
};
export default AuthModal;
