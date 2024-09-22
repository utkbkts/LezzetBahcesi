import React, { useEffect } from "react";
import { avatar } from "../../utils/DataIndex";
import toast from "react-hot-toast";
import { Button } from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/dist/locale/tr";
import "moment/min/locales";
import { useDeleteReviewsMutation } from "../../redux/api/ProductApi";
import { useSelector } from "react-redux";
const AllReviews = ({ review, data }) => {
  const role = review?.user?.role === "admin" ? "(admin)" : "";
  const productId = data.product._id;
  const { user } = useSelector((state) => state.auth);
  const eq = user?._id === review?.user?._id;

  const [deleteReviews, { error: deleteError, isSuccess }] =
    useDeleteReviewsMutation();

  useEffect(() => {
    if (deleteError) {
      toast.error(deleteError?.data?.message);
    }
    if (isSuccess) {
      toast.success("Yorum başarıyla silindi.");
    }
  }, [deleteError, isSuccess]);

  const deleteReviewHandler = (reviewId) => {
    deleteReviews({ productId, id: reviewId });
  };

  return (
    <>
      <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center mb-2">
            <img
              src={review?.user?.avatar || avatar}
              alt={review?.name}
              className="w-12 h-12 rounded-full border border-gray-300 mr-4"
            />
            <h3 className="text-lg font-semibold">
              {review?.user?.name}
              {role}
            </h3>
          </div>
          {eq && (
            <div>
              <Button
                onClick={() => deleteReviewHandler(review?._id)}
                type="primary"
              >
                Sil
              </Button>
            </div>
          )}
        </div>
        <hr />
        <p className="text-gray-700 mb-2">{review?.comment}</p>
        <div className="flex items-center text-yellow-500 mb-2">
          {"★".repeat(review?.rating) + "☆".repeat(5 - review?.rating)}
        </div>
        <p className="text-sm text-gray-500">
          {moment(review?.createdAt).format("DD MMMM YYYY HH:mm:ss")}
        </p>
      </div>
    </>
  );
};
AllReviews.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      avatar: PropTypes.string,
      role: PropTypes.string,
    }).isRequired,
    comment: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  data: PropTypes.shape({
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
export default AllReviews;
