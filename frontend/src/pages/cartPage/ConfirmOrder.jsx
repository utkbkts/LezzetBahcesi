import { Button, Divider, Card } from "antd";
import { useSelector } from "react-redux";
import { calculateOrderCost } from "../../helpers/helpers";
import { Link } from "react-router-dom";
import CheckoutSteps from "../../components/checkOutSteps/CheckOutSteps";

const ConfirmOrder = () => {
  const { cartItems, shippingInfo } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { itemsPrice, taxPrice, totalPrice } = calculateOrderCost(cartItems);

  return (
    <div className="w-full h-full bg-gray-100 !text-black flex justify-center p-6 flex-col ">
      <div className="mt-24 w-full justify-center flex flex-col items-center">
        <CheckoutSteps currentStep={2} />
        <div className="bg-white shadow-md rounded-md w-full max-w-2xl p-6 ">
          {/* Address Information */}
          <Card
            title="Adres Bilgileri"
            bordered={false}
            style={{ borderRadius: "8px", marginBottom: "20px" }}
          >
            <p className="text-base mb-2">
              İsim: <span className="font-semibold">{user?.name}</span>
            </p>
            <p className="text-base mb-2">
              Telefon Numarası:{" "}
              <span className="font-semibold">{shippingInfo?.phoneNumber}</span>
            </p>
            <p className="text-base mb-2">
              Adres:{" "}
              <span className="font-semibold">
                {" "}
                {shippingInfo?.address},{shippingInfo?.city},
                {shippingInfo?.postalCode}
              </span>
            </p>
          </Card>

          {/* Cart Items */}
          <Card
            title="Sepetinizdeki Ürünler"
            bordered={false}
            style={{ borderRadius: "8px", marginBottom: "20px" }}
          >
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between mb-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.image[0]?.url || item?.image}
                    width={80}
                    height={80}
                    alt="Ürün"
                    className="rounded-sm shadow-sm"
                  />
                  <span className="text-base font-medium">{item.name}</span>
                </div>
              </div>
            ))}
          </Card>

          {/* Order Summary */}
          <div className="border-t border-gray-300 pt-6">
            <h1 className="text-xl font-semibold mb-4">Sipariş Özeti</h1>
            <Divider />
            <p className="text-base mb-2">
              Ara Toplam:{" "}
              <span className="font-semibold">{itemsPrice.toFixed(2)}₺</span>
            </p>
            <p className="text-base mb-2">
              Kurye Ücreti:{" "}
              <span className="font-semibold text-red-400">ücretsiz</span>
            </p>
            <p className="text-base mb-2">
              Vergi Ücreti: <span className="font-semibold">{taxPrice}₺</span>
            </p>
            <Divider />
            <p className="text-lg font-semibold mb-4">
              Toplam: <span className="text-red-600">{totalPrice}₺</span>
            </p>
            <Link to={"/payment_method"}>
              <Button
                type="primary"
                className="w-full"
                style={{ borderRadius: "4px" }}
              >
                Ödemeye Devam Et
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
