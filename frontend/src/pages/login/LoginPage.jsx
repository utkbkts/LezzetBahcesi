import { Form, Input } from "antd";
import { useLoginMutation } from "../../redux/api/AuthApi";
import toast from "react-hot-toast";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../../ui/LoadingButton";
const inputFields = [
  {
    id: 1,
    name: "email",
    label: "Email",
    type: "email",
    rules: [
      { required: true, message: "Lütfen Email adresinizi giriniz." },
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Geçerli bi email adresi giriniz.",
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
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@./$!%*?&])[A-Za-z\d@@./$!%*?&]{8,}$/,
        message:
          "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
      },
    ],
  },
];

const LoginPage = () => {
  const navigate = useNavigate();
  const [login, { error, isSuccess, isLoading }] = useLoginMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Giriş Başarılı!");
      navigate("/");
    }
  }, [error, isSuccess]);

  const onFinish = async (values) => {
    await login(values);
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <Form
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md border border-gray-700"
        onFinish={onFinish}
        layout="vertical"
      >
        <h2 className="text-2xl font-semibold text-center text-white mb-6">
          Giriş Yap
        </h2>
        {inputFields.map((field) => (
          <Form.Item
            key={field.id}
            label={<span className="text-gray-300">{field.label}</span>}
            name={field.name}
            rules={field.rules}
          >
            {field.type === "password" ? (
              <Input.Password
                type="password"
                className="bg-gray-700 focus:text-black text-gray-400 border-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <Input className="bg-gray-700 focus:text-black text-gray-400 border-none focus:ring-indigo-500 focus:border-indigo-500" />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <LoadingButton
            type="primary"
            loading={isLoading}
            htmlType="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
          >
            Giriş yap
          </LoadingButton>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
