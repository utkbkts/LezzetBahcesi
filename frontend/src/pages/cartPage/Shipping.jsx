import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { countries } from "countries-list";
import { Select } from "antd";
import { saveShippingInfo } from "../../redux/features/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CheckoutSteps from "../../components/checkOutSteps/CheckOutSteps";
const phoneRegex =
  /^\(?([0-9]{4})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{2})?([0-9]{4})$/;
const formData = [
  {
    id: 1,
    label: "İsminiz",
    name: "contactName",
    type: "text",
    rules: [
      { required: true, message: "Lütfen isminizi girin!" },
      {
        pattern: /^[0-9a-zA-ZşğüöçıİĞŞ\s]+$/,
        message:
          "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
      },
    ],
    placeHolder: "İsim ve Soyisim Giriniz.",
  },
  {
    id: 2,
    label: "Şehir",
    name: "city",
    type: "text",
    rules: [
      { required: true, message: "Lütfen şehir ismini girin!" },
      {
        pattern: /^[0-9a-zA-ZşğüöçıİĞŞ\s]+$/,
        message:
          "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
      },
    ],
    placeHolder: "Yaşadığınız Şehri Giriniz.",
  },
  {
    id: 3,
    label: "Telefon Numarası",
    name: "phoneNumber",
    type: "number",
    rules: [
      { required: true, message: "Lütfen telefon numaranızı giriniz!" },
      {
        pattern: phoneRegex,
        message: "Lütfen geçerli bir telefon numarası girin!",
      },
    ],
    placeHolder: "0535 465 48 782",
  },
  {
    id: 4,
    label: "Ülke",
    name: "country",
    type: "text",
    rules: [{ required: true, message: "Lütfen ülke ismini girin!" }],
    placeHolder: "Yaşadığınız Ülke'yi Giriniz.",
  },
  {
    id: 5,
    label: "Adres",
    name: "address",
    type: "text",
    rules: [
      { required: true, message: "Lütfen adresinizi girin!" },
      {
        pattern: /^[0-9a-zA-ZşğüöçıİĞŞ/:.\s]+$/,
        message:
          "Sadece rakamlar ve harfler (büyük ve küçük) kullanabilirsiniz.",
      },
    ],
    placeHolder: "Bulunduğunuz Adresi Giriniz.",
  },
  {
    id: 6,
    label: "Posta Kodu",
    name: "zipCode",
    type: "text",
    rules: [
      { required: true, message: "Lütfen posta kodunu girin!" },
      {
        pattern: /^[0-9]+$/,
        message: "Posta kodunuz sayıdan oluşmalıdır örn:34758",
      },
    ],
    placeHolder: "Posta Kodunuzu  Giriniz.",
  },
  {
    id: 7,
    label: "Kimlik Numarası",
    name: "identityNumber",
    type: "number",
    rules: [
      { required: true, message: "Lütfen T.C kimlik numaranızı girin!" },
      {
        pattern: /^[0-9]{11}$/,
        message: "Kimlik numarası 11 haneli bir sayı olmalıdır örn:34664875948",
      },
    ],
    placeHolder: "Lütfen T.C kimlik numaranızı girin!",
  },
];

const Shipping = () => {
  const dispatch = useDispatch();
  const { shippingInfo } = useSelector((state) => state.cart);
  const countriesList = Object.values(countries);
  const navigate = useNavigate();
  const onFinish = (values) => {
    dispatch(saveShippingInfo(values));
    toast.success("Adres Bilgileri Başarıyla Kaydedildi.");
    navigate("/confirmOrder");
  };
  const initialValues = {
    contactName: shippingInfo?.contactName,
    city: shippingInfo?.city,
    country: shippingInfo?.country,
    address: shippingInfo?.address,
    phoneNumber: shippingInfo?.phoneNumber,
    zipCode: shippingInfo?.zipCode,
    identityNumber: shippingInfo?.identityNumber,
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center h-full mt-[200px] mb-8 w-full ">
        <CheckoutSteps currentStep={1} />
        <Form
          initialValues={initialValues}
          onFinish={onFinish}
          layout="vertical"
          className="md:w-[500px] w-full shadow-xl p-2 rounded-md mt-8 mb-8"
        >
          <h2 className="mb-4 text-black text-center uppercase text-[25px]">
            Adres Bilgileri
          </h2>
          {formData.map((field) => (
            <Form.Item
              key={field.id}
              label={field.label}
              name={field.name}
              rules={field.rules}
            >
              {field.name === "country" ? (
                <Select placeholder={field.placeHolder}>
                  {countriesList.map((item, index) => (
                    <Select.Option key={index} value={item.name}>
                      {item.name}
                    </Select.Option>
                  ))}
                </Select>
              ) : (
                <Input placeholder={field.placeHolder} type={field.type} />
              )}
            </Form.Item>
          ))}
          <Form.Item>
            <Button className="w-full mt-4" type="primary" htmlType="submit">
              Gönder
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default Shipping;
