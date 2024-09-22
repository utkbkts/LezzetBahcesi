import React from "react";
import { Button, Table } from "antd";
import {
  useDeleteProductMutation,
  useGetAdminProductsQuery,
} from "../../../../redux/api/ProductApi";

const Products = () => {
  const { data } = useGetAdminProductsQuery();
  const [deleteProduct] = useDeleteProductMutation();
  const users = Array.from(
    new Set(data?.product?.map((item) => item.user?.name))
  );
  const categories = Array.from(
    new Set(data?.product?.map((item) => item.category))
  );

  const handleRemoveProduct = (id) => {
    deleteProduct(id);
  };
  const columns = [
    {
      title: "Ürün İsmi",
      dataIndex: "productDetail",
      showSorterTooltip: {
        target: "full-header",
      },
      filters: data?.product?.map((option) => ({
        text: option.productDetail.title,
        value: option.productDetail.title,
      })),
      onFilter: (value, record) =>
        record.productDetail.title.indexOf(value) === 0,
      sorter: (a, b) =>
        a.productDetail.title.length - b.productDetail.title.length,
      sortDirections: ["descend"],
      render: (productDetail) => productDetail.title,
    },
    {
      title: "Ürün Açıklaması",
      dataIndex: "productDetail",
      onFilter: (value, record) =>
        record.productDetail.description.indexOf(value) === 0,
      render: (record) => (
        <ul>
          <li>{record?.description?.slice(0, 50)}</li>
        </ul>
      ),
    },
    {
      title: "Ürün Kategorisi",
      dataIndex: "category",
      filters: categories.map((category) => ({
        text: category,
        value: category,
      })),
      onFilter: (value, record) => record.category.indexOf(value) === 0,
    },
    {
      title: "Yan ürünler",
      dataIndex: "tags",
      render: (record) => {
        return (
          <ul>
            {record.sideProductValue.map((item) => (
              <li key={item._id}>{item.sideProduct}</li>
            ))}
          </ul>
        );
      },
    },
    {
      title: "Ürünü oluşturan kişi",
      dataIndex: "user",
      filters: users.map((userName) => ({
        text: userName,
        value: userName,
      })),
      render: (user) => (
        <ul>
          <li>{user?.name}</li>
        </ul>
      ),
      onFilter: (value, record) => record.user?.name.indexOf(value) === 0,
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <ul>
          <Button
            onClick={() => handleRemoveProduct(record._id)}
            type="primary"
          >
            Sil
          </Button>
        </ul>
      ),
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const dataSource = data?.product?.map((item) => ({
    ...item,
    key: item._id,
  }));

  return (
    <div className="h-screen">
      <Table
        columns={columns}
        dataSource={dataSource}
        onChange={onChange}
        pagination={{ pageSize: 5 }}
        showSorterTooltip={{
          target: "sorter-icon",
        }}
      />
    </div>
  );
};

export default Products;
