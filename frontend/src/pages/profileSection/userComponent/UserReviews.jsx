import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  useDeleteReviewsMutation,
  useGetUserReviewsQuery,
  useSubmitReviewMutation,
} from "../../../redux/api/ProductApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Table } from "antd";
import StarRatings from "react-star-ratings";
import Loading from "../../../components/loading/Loader";
import TextArea from "antd/es/input/TextArea";

const UserReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const userId = user?._id;
  const [deleteReview] = useDeleteReviewsMutation();

  const { data, isLoading } = useGetUserReviewsQuery(userId);
  const [updateReview] = useSubmitReviewMutation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [currentReview, setCurrentReview] = useState(null);

  const deleteHandler = async (review) => {
    try {
      await deleteReview({
        productId: review.productId,
        id: review.reviews[0]._id,
      });
    } catch (error) {
      console.error("Silme işlemi başarısız:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!currentReview) return;

    try {
      await updateReview({
        rating,
        comment,
        productId: currentReview.productId,
      });
      setRating(0);
      setComment("");
      setCurrentReview(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleShow = (record) => {
    setCurrentReview(record);
    setRating(record.reviews[0].rating);
    setComment(record.reviews[0].comment);
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "reviews",
      key: "reviews",
      render: (reviews) => <li>{reviews[0]._id}</li>,
    },
    {
      title: "Oy",
      dataIndex: "rating",
      key: "rating",
      render: (text, record) => record.reviews[0].rating,
    },
    {
      title: "Yorum",
      dataIndex: "comment",
      key: "comment",
      render: (text, record) => record.reviews[0].comment,
    },
    {
      title: "Yorum Tarihi",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text, record) =>
        new Date(record.reviews[0].createdAt).toLocaleDateString(),
    },
    {
      title: "Aksiyonlar",
      key: "actions",
      render: (text, record) => {
        return (
          <div className="flex gap-2">
            <Button type="primary" onClick={() => handleShow(record)}>
              <EditOutlined />
            </Button>
            <Button
              type="primary"
              danger
              onClick={() => deleteHandler(record)}
              className="ms-2"
            >
              <DeleteOutlined />
            </Button>
          </div>
        );
      },
    },
  ];

  if (isLoading) return <Loading />;

  const dataSource = data?.reviews?.map((item) => ({
    ...item,
    key: item.productId,
  }));

  return (
    <div className="w-full mt-10 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl !font-light open-sans mb-6">Yorumlarım</h1>
      <hr className="mb-6" />
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={{ pageSize: 5 }}
        scroll={{ x: "max-content" }}
      />
      {currentReview && (
        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <StarRatings
            rating={rating}
            starRatedColor="#ffb829"
            numberOfStars={5}
            name="rating"
            changeRating={(newRating) => setRating(newRating)}
          />
          <TextArea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            name="comment"
            placeholder="Yorumunuz"
            className="border gray-400 rounded-md w-full resize-none py-4 px-4 outline-none"
            rows={4}
          />
          <Button type="primary" htmlType="submit">
            Güncelle
          </Button>
        </form>
      )}
    </div>
  );
};

export default UserReviews;
