import React from "react";
import {
  useDeleteOrdersMutation,
  useGetAdminOrdersQuery,
} from "../../../../redux/api/OrderApi";
import { Button, Select, Table } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import moment from "moment";
function Orders() {
  const { data } = useGetAdminOrdersQuery();
  const [deleteOrder] = useDeleteOrdersMutation();
  const handleRemoveProduct = (id) => {
    if (window.confirm("ürünü iptal etmek istediğine emin misin ?")) {
      deleteOrder(id);
    }
  };

  const columns = [
    {
      title: "Ürün İsmi",
      dataIndex: "basketItems",
      key: "basketItems",
      render: (basketItems) => {
        return (
          <ul>
            {basketItems.map((item) => (
              <li key={item._id}>{item.name}</li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Ürün Resmi",
      dataIndex: "basketItems",
      key: "basketItems",
      render: (basketItems) => (
        <>
          {basketItems.map((item) => (
            <img
              key={item._id}
              src={item.image}
              alt={item.name}
              className="rounded-full w-12 h-12 "
            />
          ))}
        </>
      ),
    },
    {
      title: "Sipariş Veren kişi",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (shippingAddress) => (
        <ul>
          <li>{shippingAddress.contactName}</li>
        </ul>
      ),
    },
    {
      title: "Sipariş Adresi",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (shippingAddress) => (
        <ul>
          <li>
            {shippingAddress.address},{shippingAddress.city},
            {shippingAddress.country}
          </li>
        </ul>
      ),
    },
    {
      title: "Sipariş Türü",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (paymentMethod) => (
        <ul>
          <li>{paymentMethod}</li>
        </ul>
      ),
    },

    {
      title: "Telefon Numarası",
      dataIndex: "shippingAddress",
      key: "shippingAddress",
      render: (shippingAddress) => (
        <ul>
          <li>{shippingAddress.phoneNumber}</li>
        </ul>
      ),
    },
    {
      title: "Toplam Ürün Fiyatı",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount) => (
        <ul>
          <li>{totalAmount.toFixed(2)}</li>
        </ul>
      ),
    },
    {
      title: "Sipariş Durumu",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (orderStatus) => (
        <ul>
          <li>{orderStatus}</li>
        </ul>
      ),
    },
    {
      title: "Sipariş Tarihi",
      dataIndex: "updatedAt",
      key: "updatedAt",
      render: (updatedAt) => (
        <ul>
          <li>{moment(updatedAt).format("DD MMMM YYYY HH:mm:ss")}</li>
        </ul>
      ),
    },
    {
      title: "Miktar",
      dataIndex: "basketItems",
      key: "basketItems",
      render: (basketItems) => (
        <ul>
          {basketItems.map((item) => (
            <li key={item._id}>{`${item.name}-x${item.quantity}`}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Durum Güncelle",
      dataIndex: "orderStatus",
      key: "updateOrderStatus",
      render: (orderStatus, record) => (
        <Select
          className="w-full"
          defaultValue={orderStatus}
          onChange={(value) => handleStatusChange(value, record._id)}
        >
          <Select.Option value="hazırlanıyor">Hazırlanıyor</Select.Option>
          <Select.Option value="yolda">Yolda</Select.Option>
          <Select.Option value="teslim">Teslim Edildi</Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, record) => (
        <div className="flex gap-2">
          <Button type="primary">
            <EditOutlined />
          </Button>{" "}
          <Button
            onClick={() => handleRemoveProduct(record._id)}
            type="primary"
            danger
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];
  const handleStatusChange = (status, id) => {
    console.log(`Sipariş ID: ${id}, Yeni Durum: ${status}`);
  };

  const dataSource = data?.product?.map((item) => ({
    ...item,
    key: item._id,
  }));
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        Gelen Siparişler
      </h1>
      <div className="w-[1400px]">
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
    </div>
  );
}

export default Orders;
