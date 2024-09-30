import { useEffect } from "react";
import {
  useDeleteReviewsMutation,
  useGetAdminProductsQuery,
} from "../../../../redux/api/ProductApi";
import toast from "react-hot-toast";

import TableData from "./Table";

const Reviews = () => {
  const [deleteReview, { error, isSuccess }] = useDeleteReviewsMutation();
  const { data } = useGetAdminProductsQuery();
  const handleRemoveReview = (productId, reviewId) => {
    deleteReview({ productId, id: reviewId });
  };

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Yorum silindi");
    }
  }, [error, isSuccess]);

  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Yorumlar</h1>
      <TableData handleRemoveReview={handleRemoveReview} data={data} />
    </div>
  );
};

export default Reviews;
