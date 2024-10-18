import { Form, Modal } from "antd";
import { useEffect, useState } from "react";
import LoadingButton from "../../ui/LoadingButton";
import { useLoginMutation, useRegisterMutation } from "../../redux/api/AuthApi";
import toast from "react-hot-toast";
import Loading from "../../components/loading/Loader";
import {
  useForgotPasswordMutation,
  useGetUserQuery,
} from "../../redux/api/UserApi";
import { useDispatch, useSelector } from "react-redux";
import heroAuth from "/hero-bg.jpg";
import logo from "/logo.png";
import { setToggleMenu } from "../../redux/features/userSlice";
import { inputFields } from "./partials/constant";

const AuthModal = () => {
  const [state, setState] = useState("login");
  const { toggleMenu } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.auth);
  const { data } = useGetUserQuery();
  if (user) return data;
  const dispatch = useDispatch();
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
      dispatch(setToggleMenu());
    } else if (registerSuccess) {
      toast.success("Kayıt Başarılı!");
      dispatch(setToggleMenu());
    } else if (forgotSuccess) {
      toast.success("Lütfen mail hesabınızı kontrol ediniz.");
      dispatch(setToggleMenu());
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
    <div className="relative overflow-hidden w-full ">
      <div className="h-screen bg-black/60 w-full fixed top-0 left-0 z-10"></div>
      <Modal
        open={toggleMenu}
        onCancel={() => dispatch(setToggleMenu())}
        footer={null}
        className="relative top-44 right-56 header"
      >
        <div className="flex w-full h-[650px]">
          <div className="md:w-1/2 md:flex hidden h-full">
            <img src={heroAuth} alt="" className="h-full object-cover w-full" />
            <img
              src={logo}
              alt=""
              className="absolute -top-10 opacity-30 w-80 left-24"
            />
          </div>
          <div className="md:w-1/2 w-full flex items-center justify-center flex-col">
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
                  label={field.label}
                  name={field.name}
                  rules={field.rules}
                  hasFeedback
                >
                  {field.component}
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
        </div>
      </Modal>
    </div>
  );
};

export default AuthModal;
