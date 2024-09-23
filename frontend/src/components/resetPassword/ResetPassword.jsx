import React, { useEffect } from "react";
import { useResetPasswordMutation } from "../../redux/api/UserApi";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../loading/Loader";
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";

const inputField = [
  {
    id: 1,
    type: "password",
    label: "Şifrenizi giriniz",
    name: "password",
    rules: [
      { required: true, message: "Lütfen şifrenizi giriniz." },
      {
        pattern: /^[a-zA-Z0-9]+$/,
        message: "Özel karakter kullanamazsınız.",
      },
    ],
  },
  {
    id: 2,
    type: "password",
    label: "Şifrenizi doğrulayın",
    name: "confirmPassword",
    rules: [
      { required: true, message: "Lütfen şifrenizi doğrulayınız." },
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
];

const ResetPassword = () => {
  const params = useParams();
  const [resetPassword, { error, isSuccess, isLoading }] =
    useResetPasswordMutation();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Resetleme işlemi başarılı.Yönlendirileceksiniz.");
      navigate("/");
    }
  }, [error, isSuccess, isAuthenticated]);

  if (isLoading) {
    return <Loading />;
  }

  const handleSubmit = async (values) => {
    await resetPassword({ token: params?.token, body: values });
  };

  return (
    <div className="h-screen overflow-hidden flex items-center justify-center bg-gray-700">
      <div className="w-full max-w-xl bg-gray-800 py-16 px-4 rounded-lg shadow-lg">
        <Form onFinish={handleSubmit} className="space-y-6" layout="vertical">
          <h1 className="text-white text-center text-2xl font-semibold">
            Parola Sıfırlama
          </h1>
          <div className="flex flex-col gap-2">
            {inputField.map((item) => (
              <Form.Item
                rules={item.rules}
                key={item.id}
                name={item.name}
                type={item.type}
                hasFeedback
                label={<span className="text-white">{item.label}</span>}
              >
                <Input className="p-3 rounded-lg !bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-gray-500" />
              </Form.Item>
            ))}

            <div className="mt-6">
              <Button htmlType="submit" type="primary" className="w-full">
                Sıfırla
              </Button>
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default ResetPassword;
