import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useGetUserProductQuery,
  useGetUserReviewsQuery,
  useSubmitReviewMutation,
} from "../../../redux/api/ProductApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table, Modal, Form } from "antd";
import StarRatings from "react-star-ratings";
import TextArea from "antd/es/input/TextArea";
import Loading from "../../../components/loading/Loader";

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;

  const { data, isLoading } = useGetUserReviewsQuery(userId);

  const { data: getUserProduct } = useGetUserProductQuery();

  const [updateReview] = useSubmitReviewMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [form] = Form.useForm();

  const productId = getUserProduct?.products?.map((item) => item._id);

  const HandleRatingChange = (newRating) => {
    setRating(newRating);
    form.setFieldsValue({ rating: newRating });
  };

  const showModal = (review) => {
    form.setFieldsValue({
      rating: review.rating,
      comment: review.comment,
    });
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      onFinish(values);
    });
  };
  const onFinish = (values) => {
    updateReview({ ...values, productId });
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const deleteHandler = (reviewId) => {
    // Yorum silme işlemi için API çağrısı yapın
    console.log(`Silme işlemi için yorum ID'si: ${reviewId}`);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      key: "_id",
    },
    {
      title: "Oy",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Yorum",
      dataIndex: "comment",
      key: "comment",
    },
    {
      title: "Yorum Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => new Date(text).toLocaleDateString(),
    },
    {
      title: "Aksiyonlar",
      key: "actions",
      render: (text, record) => (
        <div className="flex gap-2">
          <Button type="primary" onClick={() => showModal(record)}>
            <EditOutlined />
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => deleteHandler(record._id)}
            className="ms-2"
          >
            <DeleteOutlined />
          </Button>
        </div>
      ),
    },
  ];

  if (isLoading) return <Loading />;

  const dataSource = data?.reviews?.map((item) => ({
    ...item,
    key: item._id,
  }));

  return (
    <div className="w-full  mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl !font-light open-sans mb-6 ">Yorumlarım</h1>
      <hr className="mb-6" />
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title="Yorumu Güncelle"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Güncelle"
        cancelText="İptal"
      >
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="rating"
            label="Yıldız Değerlendirmesi"
            rules={[{ required: true, message: "Lütfen bir puan verin!" }]}
          >
            <StarRatings
              rating={rating}
              starRatedColor="#ffb829"
              numberOfStars={5}
              name="rating"
              changeRating={HandleRatingChange}
            />
          </Form.Item>
          <Form.Item
            name="comment"
            label="Yorumunuz"
            rules={[
              { required: true, message: "Lütfen bir yorum girin!" },
              {
                pattern: /^[a-zA-Z0-9şŞıİğĞüÜöÖ\sçÇ_-]+$/,
                message:
                  "Yorumda yalnızca harfler, sayılar ve boşluklar kullanılabilir!",
              },
            ]}
          >
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default UserReviews;
