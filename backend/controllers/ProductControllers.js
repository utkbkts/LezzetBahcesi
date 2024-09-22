import catchAsyncError from "../middleware/catchAsyncError.js";
import productModel from "../models/productModel.js";
import apiFilter from "../utils/apiFilters.js";
import { delete_file, upload_file } from "../utils/cloudinary.js";
import errorHandler from "../utils/errorHandler.js";

const getAllProduct = catchAsyncError(async (req, res) => {
  const resPerPage = 5;

  const apiFilters = new apiFilter(productModel, req.query)
    .searchResult()
    .filters();

  let products = await apiFilters.query;
  let FilteredProductCount = products.length;

  apiFilters.pagination(resPerPage);
  products = await apiFilters.query.clone();

  res.status(200).json({
    resPerPage,
    FilteredProductCount,
    products,
  });
});

const productById = catchAsyncError(async (req, res) => {
  const product = await productModel
    .findById(req?.params?.id)
    .populate("reviews.user");

  if (!product) {
    return next(new errorHandler("Product not found !", 404));
  }
  return res.status(200).json({
    product,
  });
});
//user
const getProductReview = catchAsyncError(async (req, res, next) => {
  const product = await productModel
    .findById(req.query.id)
    .populate("reviews.user");

  if (!product) {
    return next(new errorHandler("Product not found !", 404));
  }
  return res.status(200).json({
    reviews: product.reviews,
  });
});

//admin

const createProduct = catchAsyncError(async (req, res, next) => {
  req.body.user = req.user._id;

  const uploadPromises = req.body.images.map((image) =>
    upload_file(image, "shopit/products")
  );
  const urls = await Promise.all(uploadPromises);

  const product = await productModel.create({
    ...req.body,
    images: urls,
    user: req.user._id,
  });

  res.status(200).json({ product });
});

const getProducts = catchAsyncError(async (req, res, next) => {
  const product = await productModel.find().populate("reviews.user user");

  res.status(200).json({
    product,
  });
});

const deleteProduct = catchAsyncError(async (req, res) => {
  let product = await productModel.findById(req?.params?.id);
  if (!product) {
    return next(new errorHandler("Product not found", 404));
  }

  for (let i = 0; i < product.images.length; i++) {
    await delete_file(product.images[i].public_id);
  }

  await product.deleteOne();
  res.status(200).json({
    message: "Product Deleted",
  });
});
//user
const getUserProduct = catchAsyncError(async (req, res, next) => {
  const userId = req.user._id;

  if (!userId) {
    return next(new errorHandler("User ID is required", 400));
  }

  const products = await productModel
    .find({ user: userId })
    .populate("reviews.user");

  if (!products || products.length === 0) {
    return next(new errorHandler("No products found for the user", 404));
  }

  res.status(200).json({
    success: true,
    products,
  });
});

const createProductReviews = catchAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await productModel.findById(productId);

  if (!product) {
    return next(new errorHandler("Product not found !", 404));
  }

  const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() === req?.user?._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((review) => {
      if (review?.user?.toString() === req?.user?._id.toString()) {
        review.comment = comment;
        review.rating = rating;
      }
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  product.ratings =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  return res.status(200).json({
    success: true,
  });
});

const getReviews = catchAsyncError(async (req, res, next) => {
  const userId = req?.query?.userId;

  const productsWithUserReviews = await productModel
    .find()
    .populate("reviews.user");

  if (!productsWithUserReviews.length) {
    return next(new errorHandler("Reviews not found!", 404));
  }

  const reviews = productsWithUserReviews.flatMap((product) =>
    product.reviews.filter((review) => review.user._id.toString() === userId)
  );

  return res.status(200).json({
    reviews,
  });
});

const deleteReviews = catchAsyncError(async (req, res, next) => {
  let product = await productModel.findById(req.query.productId);

  if (!product) {
    return next(new errorHandler("Product not found !", 404));
  }

  const reviews = product?.reviews?.filter(
    (reviwe) => reviwe._id.toString() !== req?.query?.id.toString()
  );

  const numOfReviews = reviews.length;

  const ratings =
    numOfReviews === 0
      ? 0
      : product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        numOfReviews;

  product = await productModel.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      numOfReviews,
      ratings,
    },
    { new: true }
  );
  return res.status(200).json({
    product,
  });
});

export default {
  createProduct,
  getProducts,
  deleteProduct,
  getAllProduct,
  productById,
  createProductReviews,
  getReviews,
  deleteReviews,
  getProductReview,
  getUserProduct,
};
