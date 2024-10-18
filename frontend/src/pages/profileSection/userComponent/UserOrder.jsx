import { Button, Table } from "antd";
import { useGetUserOrderQuery } from "../../../redux/api/OrderApi";
import { Link } from "react-router-dom";
import { PrinterFilled } from "@ant-design/icons";
import Loading from "../../../components/loading/Loader";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
const UserOrder = () => {
  const { data, isLoading } = useGetUserOrderQuery();
  const { orders } = useSelector((state) => state.socket);
  const [localOrders, setLocalOrders] = useState([]);
  useEffect(() => {
    setLocalOrders([
      ...(data?.orders || []),
      ...orders.filter(
        (order) => !data?.orders.some((prod) => prod._id === order._id)
      ),
    ]);
  }, [data, orders]);

  const columns = [
    {
      title: "Ürün resmi",
      dataIndex: "basketItems",
      key: "basketItems",
      render: (basketItems) => {
        return basketItems.map((item) => (
          <img
            style={{ width: 50, height: 50 }}
            key={item._id}
            src={item.image}
          ></img>
        ));
      },
    },
    {
      title: "Ürün ismi",
      dataIndex: "basketItems",
      key: "basketItems",
      render: (basketItems) => (
        <span>{basketItems.map((item) => item.title).join(", ")}</span>
      ),
    },
    {
      title: "Ürün durumu",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (_, record) => {
        const order = orders.find((o) => o._id === record._id);
        const orderStatus = order ? order.orderStatus : record.orderStatus;
        const statusClass =
          orderStatus === "Kuryemiz Yolda"
            ? "text-blue-500 animate-pulse transition-all duration-300"
            : orderStatus === "Hazırlanıyor"
            ? "text-orange-500 animate-pulse transition-all duration-300"
            : orderStatus === "Teslim Edilmiştir."
            ? "text-green-500"
            : "text-gray-500";
        return <span className={statusClass}>{orderStatus}</span>;
      },
    },
    {
      title: "Ödeme şekli",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => <span>{paymentMethod}</span>,
    },
    {
      title: "Aksiyonlar",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <ul>
          <Link to={`/me/order/${record._id}`}>
            <Button
              type="primary"
              className="bg-green-700 hover:!bg-green-800 "
            >
              <PrinterFilled />
            </Button>
          </Link>
        </ul>
      ),
    },
  ];

  const dataSource =
    localOrders?.map((item, index) => ({
      ...item,
      key: item._id + index,
    })) || [];

  if (isLoading) return <Loading />;

  return (
    <div className="w-full mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl !font-light open-sans mb-6">Siparişlerim</h1>
      <hr className="mb-6" />
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        showSorterTooltip={{ target: "sorter-icon" }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default UserOrder;
