import Loading from "../../../components/loading/Loader";
import { useGetUserOrderDetailQuery } from "../../../redux/api/OrderApi";
import { Button } from "antd";
import { Link, useParams } from "react-router-dom";
import moment from "moment";
import { useSelector } from "react-redux";
const UserOrderDetail = () => {
  const params = useParams();
  const { id } = params;
  const { data, isLoading } = useGetUserOrderDetailQuery(id);
  const { orders } = useSelector((state) => state.socket);
  const findOrder = orders?.order?.find((item) => item._id === id);
  console.log("🚀 ~ UserOrderDetail ~ findOrder:", data);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="max-w-5xl mx-auto mt-[100px]">
      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center justify-between w-full">
          <div>
            <h1 className=" font-bold text-2xl">Fatura Bilgileri</h1>
          </div>
          <Link to={`/me/invoice/order/${data?.order?._id}`}>
            <Button type="primary" className="bg-green-500 hover:!bg-green-600">
              Fatura
            </Button>
          </Link>
        </div>
        <div>
          <h1 className="text-xl font-semibold mt-4 mb-2">Sipariş Detayları</h1>
          <div className="shadow-md">
            <table className=" border-collapse border border-gray-200 flex w-full">
              <thead className="w-[200px]">
                <tr className="flex flex-col">
                  <th className="border border-gray-300 p-2">ID</th>
                  <th className="border border-gray-300 p-2">Durumu</th>
                  <th className="border border-gray-300 p-2">Tarihi</th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="bg-gray-50 flex flex-col">
                  <td className="border border-gray-300 p-2">
                    {data?.order?._id}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {findOrder?.orderStatus || data?.order?.orderStatus}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {moment(data?.order?.updatedAt).format(
                      "DD MMMM YYYY HH:mm:ss"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold mt-4 mb-2">Sipariş Bilgileri</h1>
          <div className="shadow-md">
            <table className=" border-collapse border border-gray-200 flex w-full">
              <thead className="w-[200px]">
                <tr className="flex flex-col">
                  <th className="border border-gray-300 p-2">İsim</th>
                  <th className="border border-gray-300 p-2">
                    Telefon numarası
                  </th>
                  <th className="border border-gray-300 p-2">Adres</th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="bg-gray-50 flex flex-col">
                  <td className="border border-gray-300 p-2">
                    {data?.order?.shippingAddress?.contactName}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.order?.shippingAddress?.phoneNumber}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.order?.shippingAddress?.address}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <h1 className="text-xl font-semibold mt-4 mb-2">Ödeme Bilgileri</h1>
          <div className="shadow-md">
            <table className=" border-collapse border border-gray-200 flex w-full">
              <thead className="w-[200px]">
                <tr className="flex flex-col">
                  <th className="border border-gray-300 p-2">Durumu</th>
                  <th className="border border-gray-300 p-2">Ödeme şekli</th>
                  <th className="border border-gray-300 p-2">Iyzico ID</th>
                  <th className="border border-gray-300 p-2">Ödenen Miktar</th>
                </tr>
              </thead>
              <tbody className="w-full">
                <tr className="bg-gray-50 flex flex-col">
                  <td className="border border-gray-300 p-2">
                    {findOrder?.paymentInfo?.status ||
                      data?.order?.paymentInfo?.status}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {data?.order?.paymentMethod}
                  </td>
                  <td className="border border-gray-300 p-2">123123123123</td>
                  <td className="border border-gray-300 p-2">
                    {" "}
                    {data?.order?.totalAmount.toFixed(2)} ₺
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4 mt-6">
          <h1 className="text-xl font-semibold mb-4 text-gray-700">
            Sipariş Edilen Ürün
          </h1>
          <div className="flex items-center justify-between">
            <img
              src={data?.order?.basketItems[0]?.image}
              className="w-20 h-20 object-cover rounded-md border border-gray-200"
              alt="Ürün Görseli"
            />
            <span className="text-gray-600 font-medium">
              {data?.order?.basketItems[0]?.title}
            </span>
            <span className="text-lg font-semibold text-green-600">
              {data?.order?.basketItems[0]?.price.toFixed(2)}₺
            </span>
            <span className="text-gray-500">
              {data?.order?.basketItems[0]?.quantity} adet
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserOrderDetail;
