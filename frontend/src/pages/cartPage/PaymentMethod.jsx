import { useEffect, useState } from "react";
import CheckOutSteps from "../../components/checkOutSteps/CheckOutSteps";
import { Button, Form, Radio } from "antd";
import { calculateOrderCost } from "../../helpers/helpers";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateOrderMutation,
  useIyzipayCheckOutMutation,
} from "../../redux/api/OrderApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import CartModalInput from "../../components/cartModalInput/CartModalInput";
import { clearCartItem } from "../../redux/features/cartSlice";
const PaymentMethod = () => {
  const [method, setMethod] = useState("");
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const [createNewOrder, { error, isSuccess }] = useCreateOrderMutation();
  const [iyzipayOrder, { data: checkoutData, isSuccess: IyzipaySuccess }] =
    useIyzipayCheckOutMutation();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      dispatch(clearCartItem());
    } else if (IyzipaySuccess) {
      dispatch(clearCartItem());
    }
  }, [error, isSuccess, navigate, IyzipaySuccess]);
  useEffect(() => {
    if (checkoutData?.result?.status === "success") {
      toast.success("Ödeme işlemi başarılı.yönlendirileceksiniz.");
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    if (checkoutData?.result?.status === "failure") {
      toast.error(
        checkoutData.result.errorMessage ||
          "ödeme esnasında bir hata oldu yeniden deneyiniz."
      );
    }
  }, [checkoutData]);

  const submitHandler = (values) => {
    const { itemsPrice, taxPrice, totalPrice } = calculateOrderCost(cartItems);

    if (method === "Nakit") {
      const orderData = {
        shippingAddress: shippingInfo,
        basketItems: cartItems,
        itemsPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        paymentInfo: {
          status: "Ödenmedi",
        },
        paymentMethod: "Nakit",
      };
      createNewOrder(orderData);
    }
    if (method === "Kart") {
      const orderData = {
        shippingAddress: shippingInfo,
        basketItems: cartItems,
        itemsPrice,
        taxAmount: taxPrice,
        totalAmount: totalPrice,
        cardHolderName: values.cardHolderName,
        cardNumber: values.cardNumber,
        expireMonth: values.expireMonth,
        expireYear: values.expireYear,
        cvc: values.cvc,
        paymentInfo: {
          status: "Ödendi",
        },
      };
      iyzipayOrder(orderData);
    }
  };
  return (
    <div className="w-full h-screen bg-gray-100 flex items-center justify-center md:p-6 flex-col ">
      <CheckOutSteps currentStep={3} />
      <div className="bg-white shadow-xl mt-4 rounded-md md:w-[500px] w-full p-2">
        <h1 className="text-center">Ödeme Yöntemi Seç</h1>
        <Form
          onFinish={submitHandler}
          className="flex flex-col gap-2 p-2"
          layout="vertical"
        >
          <div className="flex items-center gap-2">
            <Radio.Group>
              <div className="flex items-center gap-2">
                <Radio
                  type="radio"
                  value="Nakit"
                  onChange={(e) => setMethod(e.target.value)}
                >
                  Nakit ve kapıda ödeme
                </Radio>
              </div>
              <div className="flex items-center gap-2">
                <Radio
                  type="radio"
                  value="Kart"
                  onChange={(e) => setMethod(e.target.value)}
                >
                  Kart ödeme
                </Radio>
              </div>
            </Radio.Group>
          </div>
          <div className="flex  gap-2 flex-col">
            <div>{method === "Kart" && <CartModalInput />}</div>
          </div>
          <Button htmlType="submit" type="primary">
            Devam et
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default PaymentMethod;
