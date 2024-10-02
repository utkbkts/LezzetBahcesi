import { Button, Table } from "antd";
import PropTypes from "prop-types";
const TableData = ({ data, deleteProduct }) => {
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
      onFilter: (value, record) => record.productDetail.title === value,
      render: (productDetail) => productDetail.title,
    },
    {
      title: "Ürün Açıklaması",
      dataIndex: "productDetail",
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
      onFilter: (value, record) => record.category === value,
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
      filters: users.map((user) => ({
        text: user,
        value: user,
      })),
      onFilter: (value, record) => record.user?.name === value,
      render: (_, record) => <span>{record?.user?.name}</span>,
    },
    {
      title: "Eylemler",
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

  const dataSource = data?.product?.map((item) => ({
    ...item,
    key: item._id,
  }));
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize: 5 }}
      showSorterTooltip={{
        target: "sorter-icon",
      }}
    />
  );
};
TableData.propTypes = {
  data: PropTypes.shape({
    product: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        productDetail: PropTypes.shape({
          title: PropTypes.string.isRequired,
          description: PropTypes.string,
        }),
        category: PropTypes.string.isRequired,
        user: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
        sideProductValue: PropTypes.arrayOf(
          PropTypes.shape({
            _id: PropTypes.string.isRequired,
            sideProduct: PropTypes.string.isRequired,
          })
        ),
        tags: PropTypes.object,
      })
    ),
  }),
  deleteProduct: PropTypes.func.isRequired,
};
export default TableData;
