import { Button, Table } from "antd";
import React from "react";
import { useGetUserOrderQuery } from "../../../redux/api/OrderApi";
import { Link } from "react-router-dom";
import { PrinterFilled } from "@ant-design/icons";
import Loading from "../../../components/loading/Loader";

const UserOrder = () => {
  const { data, isLoading } = useGetUserOrderQuery();

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
      render: (orderStatus) => (
        <span
          className={`animate-pulse ${
            orderStatus === "Hazırlanıyor"
              ? "text-red-600"
              : orderStatus === "Kuryemiz Yolda"
              ? "text-blue-600"
              : "text-green-600"
          }`}
        >
          {orderStatus}
        </span>
      ),
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
            <Button type="primary" className="bg-green-700 hover:!bg-green-800">
              <PrinterFilled />
            </Button>
          </Link>
        </ul>
      ),
    },
  ];

  const dataSource = data?.orders?.map((item) => ({
    ...item,
    key: item._id,
  }));
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  if (isLoading) return <Loading />;
  return (
    <div className="w-full  mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl !font-light open-sans mb-6">Siparişlerim</h1>
      <hr className="mb-6" />
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        pagination={{ pageSize: 5 }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default UserOrder;
