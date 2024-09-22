import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StarRatings from "react-star-ratings";
import { Input, Form, Button } from "antd";
import { useSubmitReviewMutation } from "../../redux/api/ProductApi";
import toast from "react-hot-toast";
import Title from "antd/es/typography/Title";

const { TextArea } = Input;

const NewReviews = ({ data }) => {
  const [form] = Form.useForm();
  const [submitReview, { isSuccess, isError, error }] =
    useSubmitReviewMutation();
  const productId = data?.product?._id;
  const [rating, setRating] = useState(0);

  const HandleRatingChange = (newRating) => {
    setRating(newRating);
    form.setFieldsValue({ rating: newRating });
  };

  useEffect(() => {
    if (isError) {
      toast.error(error?.data?.message);
    }
    if (isSuccess) {
      toast.success("Yorumun başarıyla kaydedildi.");
      setRating(0);
      form.resetFields();
    }
  }, [isSuccess, isError, error]);

  const onFinish = (values) => {
    submitReview({ ...values, rating, productId });
  };

  return (
    <React.Fragment>
      <Title level={3}>Yorum Yapın</Title>
      <Form
        form={form}
        name="comment_form"
        onFinish={onFinish}
        layout="vertical"
        className="comment-form"
      >
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
              pattern:
                /^[a-zA-Z0-9qwertyuıopğüişlkjhgfdsazxcvbnmöç.,'():\s_-]+$/,
              message:
                "Yorumda yalnızca harfler, sayılar ve boşluklar kullanılabilir!",
            },
          ]}
        >
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Yorum Yap
          </Button>
        </Form.Item>
      </Form>
    </React.Fragment>
  );
};

NewReviews.propTypes = {
  data: PropTypes.shape({
    product: PropTypes.shape({
      _id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default NewReviews;
