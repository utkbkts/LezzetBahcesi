import moment from "moment";
import PropTypes from "prop-types";
import { Button, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const TableData = ({ data, handleRemoveReview }) => {
  const columns = [
    {
      title: "Ürün Resmi",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        return <img className="w-20 h-20" src={image[0].url} />;
      },
    },
    {
      title: "Kullanıcı",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Yorum",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Puan",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Tarih",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).format("DD MMMM YYYY HH:mm:ss"),
    },
    {
      title: "İşlemler",
      dataIndex: "actions",
      key: "actions",
      render: (_, record) => (
        <Button
          danger
          type="primary"
          onClick={() => handleRemoveReview(record.productId, record.reviewId)}
        >
          <DeleteOutlined />
        </Button>
      ),
    },
  ];

  const setReviews = () => {
    const reviewsList = [];

    data?.product?.forEach((product) => {
      product.reviews?.forEach((review) => {
        reviewsList.push({
          key: review._id,
          image: product.images,
          userName: review.user.name,
          comment: review.comment,
          rating: review.rating,
          date: review.createdAt,
          productId: product._id,
          reviewId: review._id,
        });
      });
    });

    return reviewsList;
  };

  return (
    <>
      {data?.product?.length > 0 ? (
        <Table
          columns={columns}
          dataSource={setReviews()}
          pagination={{ pageSize: 5 }}
          scroll={{ x: 800 }}
        />
      ) : (
        <p className="mt-5 text-center">Yorum bulunamadı</p>
      )}
    </>
  );
};
TableData.propTypes = {
  roleAdmin: PropTypes.func,
  data: PropTypes.shape({
    product: PropTypes.array,
  }),
  handleRemoveReview: PropTypes.func,
};

export default TableData;
